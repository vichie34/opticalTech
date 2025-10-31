import { JSX, useEffect, useState, useRef } from "react";
import { Card, CardContent } from "../../ux/card";
import { Progress } from "../../ux/progress";
import PermissionModal from "../../Dashboard/Sections/Modal/PermissionModal";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-recognition";

// Extend the Window interface to include SpeechRecognition types
declare global {
    interface Window {
        SpeechRecognition?: typeof SpeechRecognition;
        webkitSpeechRecognition?: typeof SpeechRecognition;
        recognition?: SpeechRecognition;
    }
}

/**
 * Helper: converts AudioBuffer -> WAV ArrayBuffer
 * (keeps everything client-side so we can upload .wav)
 */
function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const out = new ArrayBuffer(length);
    const view = new DataView(out);
    const channels: Float32Array[] = [];
    let pos = 0;

    function setUint16(data: number) { view.setUint16(pos, data, true); pos += 2; }
    function setUint32(data: number) { view.setUint32(pos, data, true); pos += 4; }

    // RIFF chunk descriptor
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8);
    setUint32(0x45564157); // "WAVE"

    // fmt subchunk
    setUint32(0x20746d66); // "fmt "
    setUint32(16); // subchunk1Size (16 for PCM)
    setUint16(1); // audioFormat (1 = PCM)
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16); // bitsPerSample

    // data subchunk
    setUint32(0x61746164); // "data"
    setUint32(length - pos - 4);

    for (let i = 0; i < numOfChan; i++) channels.push(buffer.getChannelData(i));

    // write interleaved PCM samples
    const sampleCount = buffer.length;
    for (let i = 0; i < sampleCount; i++) {
        for (let ch = 0; ch < numOfChan; ch++) {
            const sample = Math.max(-1, Math.min(1, channels[ch][i]));
            // 16-bit PCM
            view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
            pos += 2;
        }
    }

    return out;
}

/**
 * Convert a Blob (webm/opus) to a WAV Blob using AudioContext decode
 */
async function convertToWav(audioBlob: Blob): Promise<Blob> {
    const arrayBuffer = await audioBlob.arrayBuffer();
    // create AudioContext dynamically
    const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext);
    const audioCtx = new AudioCtx();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const wavBuffer = audioBufferToWav(audioBuffer);
    // close context to free resources where supported
    try { audioCtx.close(); } catch { /* ignore */ }
    return new Blob([new DataView(wavBuffer)], { type: "audio/wav" });
}

interface SnellenTestProps {
    onComplete: (result: { score: number; distance: number; mistakes: string[] }) => void;
}

export const SnellenTest = ({ }: SnellenTestProps): JSX.Element => {
    const [time, setTime] = useState(0);
    const [isTracking, setIsTracking] = useState(false);
    const [currentSymbol, setCurrentSymbol] = useState("A");
    const [fontSize, setFontSize] = useState(20);
    const [opacity, setOpacity] = useState(1);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(true);
    const [animationSpeed, setAnimationSpeed] = useState(1);
    const [mistakes, setMistakes] = useState<string[]>([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [correctQuestions, setCorrectQuestions] = useState(0);

    // New: collects all shown letters for backend
    const [expectedText, setExpectedText] = useState<string>(currentSymbol);

    const maxTestDuration = 24;
    const distance = 40;

    // Audio / recording refs (must be inside component)
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);

    // For recording & chunks
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const navigate = useNavigate();

    const [userResult, setUserResult] = useState<any>(null);
    // Define the test order and current index for navigation
    const testOrder = [
        "/test/colorblindness",
        "/test/tumbling-e",
        "/test/lea-symbols",
        "/test/contrast-sensitivity"
    ];
    const nextTestIndex = 0; // colorblindness is first in the order

    // Speech recognition setup
    const {
        transcript,
        resetTranscript,
        // @ts-ignore
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
        const permissionsGranted = localStorage.getItem("permissionsGranted");
        if (!permissionsGranted) setIsPermissionModalOpen(true);
    }, []);

    useEffect(() => {
        const checkDevice = () => setIsMobileOrTablet(window.innerWidth <= 1024);
        checkDevice();
        window.addEventListener("resize", checkDevice);
        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    const handleAllowAccess = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            setIsPermissionModalOpen(false);
            localStorage.setItem("permissionsGranted", "true");
        } catch {
            toast.error("Failed to access mic and camera. Please allow permissions.");
            setIsPermissionModalOpen(false);
        }
    };

    const handleCancelPermission = () => setIsPermissionModalOpen(false);

    // generateRandomSymbol now appends to expectedText (accumulates)
    const generateRandomSymbol = () => {
        const snellenLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
        let newSymbol;
        do {
            newSymbol = snellenLetters[Math.floor(Math.random() * snellenLetters.length)];
        } while (newSymbol === currentSymbol);
        setCurrentSymbol(newSymbol);
        // append the shown letter to expectedText
        setExpectedText((prev) => prev + newSymbol);
        setFontSize((prevSize) => Math.max(prevSize - 2, 5));
        resetTranscript();
    };

    // Start a continuous recording for the whole test session
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            audioChunksRef.current = [];

            // Prefer a mimeType that's supported
            const options: MediaRecorderOptions = {};
            // some browsers accept "audio/webm" or "audio/webm;codecs=opus"
            if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
                options.mimeType = "audio/webm;codecs=opus";
            } else if (MediaRecorder.isTypeSupported("audio/webm")) {
                options.mimeType = "audio/webm";
            } else if (MediaRecorder.isTypeSupported("audio/ogg")) {
                options.mimeType = "audio/ogg";
            }

            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.start();
            console.log("🎙️ Continuous recording started");
        } catch (err) {
            console.error("Failed to start recording:", err);
            toast.error("Unable to access microphone for recording.");
        }
    };

    // Stop recording, convert to WAV, upload once
    const stopRecordingAndUploadOnce = async () => {
        if (!mediaRecorderRef.current) return;

        return new Promise<void>((resolve) => {
            const recorder = mediaRecorderRef.current!;
            recorder.onstop = async () => {
                try {
                    // assemble blob (might be webm/ogg etc)
                    const recordedBlob = new Blob(audioChunksRef.current, { type: audioChunksRef.current[0]?.type || "audio/webm" });
                    // convert to wav
                    const wavBlob = await convertToWav(recordedBlob);

                    // upload
                    await uploadAudioToBackend(wavBlob, expectedText);

                    // cleanup
                    audioChunksRef.current = [];
                    if (mediaStreamRef.current) {
                        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
                        mediaStreamRef.current = null;
                    }
                    mediaRecorderRef.current = null;
                    console.log("✅ Recording stopped, converted, and uploaded.");
                } catch (err) {
                    console.error("Error processing/uploading audio:", err);
                    toast.error("Failed to process or upload audio.");
                } finally {
                    resolve();
                }
            };

            // stop the recorder
            try {
                if (recorder.state !== "inactive") recorder.stop();
            } catch (e) {
                console.warn("recorder.stop() threw:", e);
                resolve();
            }
        });
    };

    const uploadAudioToBackend = async (audioBlob: Blob, expected: string) => {
        try {
            const formData = new FormData();
            formData.append("expected_text", expected);
            formData.append("audio_file", audioBlob, "recording.wav");

            console.log("🔄 I am trying to get refresh tokens");
            // Refresh token
            const authResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/auth/tokenn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    refresh_token: localStorage.getItem("refresh_token")
                }),
            }
            );
            const auth = await authResponse.json();
            const usertoken = auth.access_token;
            const refresh_token = auth.refresh_token;

            localStorage.setItem("access_token", usertoken);
            localStorage.setItem("refresh_token", refresh_token);
            /* const usertoken = localStorage.getItem("access_token") || ""; */
            console.log("🔄 Tokens refreshed for upload", usertoken);
            console.log("i am going", auth);
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/test/analyze-snellen/`, {
                method: "POST",
                headers: {
                    /* "Content-Type": "application/json", */
                    Authorization: `Bearer ${usertoken}`,
                },
                body: formData,
                credentials: "include",
            });

            const newresults = await res.json();
            console.log("Audio Results:", newresults)

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`Upload failed: ${res.status} ${res.statusText} ${text}`);
            }

            const data = await res.json().catch(() => null);
            console.log("Server response for audio upload:", data);
            toast.success("Audio sent for analysis");
        } catch (err) {
            console.error("Upload error:", err);
            toast.error("Audio upload failed");
        }
    };

    // when isTracking toggles: start continuous recording; when stops -> stop+upload
    useEffect(() => {
        // @ts-ignore
        let mounted = true;
        (async () => {
            if (isTracking) {
                // reset expectedText to start fresh for this session
                setExpectedText(currentSymbol); // include initial displayed symbol
                await startRecording();
            } else {
                // if recording active, stop and upload once
                if (mediaRecorderRef.current) {
                    await stopRecordingAndUploadOnce();
                }
            }
        })();

        return () => { mounted = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTracking]); // run when tracking starts/stops

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isTracking) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 1;
                    if (newTime >= maxTestDuration) {
                        setIsTracking(false);
                        setShowNotification(true);
                        if (timer) clearInterval(timer);
                        const result = { score: Math.floor((newTime / maxTestDuration) * 100), distance, mistakes };
                        // send summary result (your existing endpoint)
                        sendTestResult(result);
                        return maxTestDuration;
                    }
                    const fadeOutTime = maxTestDuration * 0.8;
                    const newOpacity = Math.max(0, 1 - newTime / fadeOutTime);
                    setOpacity(newOpacity);
                    return newTime;
                });
                generateRandomSymbol();
            }, 1000);
        }
        return () => { if (timer) clearInterval(timer); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTracking]);

    const toggleTracking = () => setIsTracking((prev) => !prev);

    useEffect(() => setIsListening(isTracking), [isTracking]);

    // Audio feedback (animation speed from mic volume)
    useEffect(() => {
        let rafId: number = 0;
        const startAudio = async () => {
            try {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                }
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaStreamRef.current = stream;
                const source = audioContextRef.current.createMediaStreamSource(stream);
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 256;
                source.connect(analyserRef.current);
                dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

                const updateVolume = () => {
                    if (analyserRef.current && dataArrayRef.current) {
                        // @ts-ignore
                        analyserRef.current.getByteTimeDomainData(dataArrayRef.current!);
                        let sum = 0;
                        for (let i = 0; i < dataArrayRef.current!.length; i++) {
                            const val = dataArrayRef.current![i] - 128;
                            sum += val * val;
                        }
                        const rms = Math.sqrt(sum / dataArrayRef.current!.length);
                        const speed = Math.max(0.5, 2 - rms / 20);
                        setAnimationSpeed(speed);
                    }
                    rafId = requestAnimationFrame(updateVolume);
                };
                updateVolume();
            } catch {
                setAnimationSpeed(1);
            }
        };
        if (isListening) startAudio();
        else {
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach((track) => track.stop());
                mediaStreamRef.current = null;
            }
            if (audioContextRef.current) {
                try { audioContextRef.current.close(); } catch { /* ignore */ }
                audioContextRef.current = null;
            }
            cancelAnimationFrame(rafId);
            setAnimationSpeed(1);
        }
        return () => {
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach((track) => track.stop());
                mediaStreamRef.current = null;
            }
            if (audioContextRef.current) {
                try { audioContextRef.current.close(); } catch { /* ignore */ }
                audioContextRef.current = null;
            }
            cancelAnimationFrame(rafId);
        };
    }, [isListening]);

    useEffect(() => {
        if (!isPermissionModalOpen && time === 0 && !isTracking) setIsTracking(true);
    }, [isPermissionModalOpen]);

    // ✅ Unified Speech Recognition logic (keeps existing behavior; not used for upload)
    useEffect(() => {
        if (!isTracking || !transcript) return;

        const normalizeAnswer = (answer: string) => {
            answer = answer.trim().toUpperCase();
            const letterMap: { [key: string]: string } = {
                "AY": "A", "BEE": "B", "SEE": "C", "DEE": "D",
                "EE": "E", "EF": "F", "GEE": "G", "AITCH": "H",
                "EYE": "I", "JAY": "J", "KAY": "K", "EL": "L",
                "EM": "M", "EN": "N", "OH": "O", "PEE": "P"
            };
            return letterMap[answer] || answer;
        };

        const normalized = normalizeAnswer(transcript);

        console.log("🗣️ Raw transcript:", transcript);
        console.log("🔤 Normalized:", normalized, "| Expected:", currentSymbol);

        setTotalQuestions((prev) => prev + 1);

        if (normalized === currentSymbol) {
            setCorrectQuestions((prev) => {
                console.log("✅ Correct answer!");
                return prev + 1;
            });
        } else {
            setMistakes((prev) => {
                console.log("❌ Mistake recorded:", transcript);
                return [...prev, transcript];
            });
        }

        resetTranscript();
    }, [transcript, currentSymbol, isTracking]);

    const sendTestResult = async (_result: { score: number; distance: number }) => {
        try {
            const backend_result = {
                total_questions: totalQuestions,
                correct_answers: correctQuestions,
                mistakes,
                distance,
                fontSize
            };

            console.log("📤 Sending result to backend:", backend_result);

            // Refresh token
            const authResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/auth/tokenn`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ refresh_token: localStorage.getItem("refresh_token") }),
            });
            const auth = await authResponse.json();
            const usertoken = auth.access_token;
            const refresh_token = auth.refresh_token;

            localStorage.setItem("access_token", usertoken);
            localStorage.setItem("refresh_token", refresh_token);

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/test/snellen-test`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${usertoken}`,
                },
                body: JSON.stringify(backend_result),
                credentials: "include",
            });
            const savedResult = await response.json();
            console.log("User Results:", savedResult)
            setUserResult(savedResult.data);

            toast.success("Test result submitted successfully");
        } catch (err) {
            toast.error("Failed to send test results");
            console.error("🚨 Submission error:", err);
        }
    };

    if (!isMobileOrTablet) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-lg font-medium text-gray-700">
                    This test is only available on mobile and tablet devices.
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-[375px] h-[512px] bg-[#f9f9f9] lg:hidden">
            <PermissionModal
                isOpen={isPermissionModalOpen}
                onAllow={handleAllowAccess}
                onCancel={handleCancelPermission}
            />
            {/* Test Complete Modal */}
            {showNotification && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#FFFFFF] bg-opacity-50 z-50" role="dialog" aria-modal="true">
                    <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs w-full">
                        <h2 className="text-lg font-bold text-black-800 mb-4">
                            Test Complete
                        </h2>
                        <p className="text-md text-black-600 mb-6">
                            Would you like to see your result or continue to the next test?
                        </p>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => {
                                    setShowNotification(false);
                                    navigate("/TestResult", {
                                        state: {
                                            testScore: userResult?.user_acuity,
                                            completedAt: new Date(userResult?.tested_at).toISOString(),
                                            // add any other result data you want to show
                                        }
                                    });
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                See Result
                            </button>
                            <button
                                onClick={() => {
                                    setShowNotification(false);
                                    navigate(testOrder[nextTestIndex]);
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                            >
                                Next Test
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <main className="w-full h-full mt-[14px] bg-white">
                <div className="flex w-full items-center justify-between px-4 py-0 mt-[30px]">
                    <div className="flex items-center gap-1">
                        <img className="w-[26px] h-[26px]" alt="Beeping" src="/assets/Frame 2147224506.png" />
                        <span className="font-medium text-blue-600 text-sm text-center font-['Outfit',Helvetica]">
                            {isTracking ? "Tracking Active" : "Paused"}
                        </span>
                    </div>
                    <div className="w-[17px] h-[19px]">
                        <span className="font-semibold text-[#637587] text-sm text-center font-['Manrope',Helvetica]">
                            {`${time}s`}
                        </span>
                    </div>
                    <div className="flex items-center gap-1" onClick={toggleTracking}>
                        <img
                            className="w-[18px] h-[18px]"
                            alt={isTracking ? "Pause" : "Play"}
                            src={isTracking ? "/assets/pause.png" : "/assets/play.png"}
                        />
                        <span className="font-bold text-[#637587] text-center font-['Outfit',Helvetica]">
                            {isTracking ? "Pause Test" : "Resume Test"}
                        </span>
                    </div>
                </div>
                <div className="mx-4 mt-2">
                    <Progress
                        value={(time / maxTestDuration) * 100}
                        className="h-1 bg-[#e6e6e6] rounded-[10px]"
                    />
                </div>
                <div className="flex flex-col items-center justify-center mt-[62px]">
                    <h1
                        className="font-bold text-black text-center font-['Outfit',Helvetica] leading-normal transition-opacity duration-1000"
                        style={{ fontSize: `${fontSize}vw`, opacity: opacity }}
                    >
                        {currentSymbol}
                    </h1>
                    <p className="font-normal text-[#637587] text-xs mt-[62px] font-['Outfit',Helvetica] leading-[21px]">
                        Keep Device at arm&apos;s length (about {distance}cm)
                    </p>
                    {/* show the expectedText string on screen so user/dev can see the sequence */}
                    <p className="text-xs text-gray-500 mt-2">Letters shown: {expectedText}</p>
                </div>
                <Card className="mx-4 mt-[79px] bg-[#eef4fc] border-none">
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="w-[29px] h-[29px] bg-blue-100 rounded-[138.1px] flex items-center justify-center">
                            <img
                                onClick={handleAllowAccess}
                                className="w-[22px] h-[22px]"
                                alt="Settings voice"
                                src="/assets/Frame 2147224516.png"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <p className="font-medium text-[#0f3a98] text-sm leading-[21px] whitespace-nowrap font-['Outfit',Helvetica]">
                                Say the letter you see out loud
                            </p>
                            <p className="font-normal text-blue-600 text-xs leading-[21px] whitespace-nowrap font-['Outfit',Helvetica]">
                                {isTracking ? "Listening....." : "Paused"}
                            </p>
                        </div>
                        <img
                            className={`w-6 h-6 ${isListening ? "animate-pulse-scale" : ""}`}
                            alt="Graphic eq"
                            src="/assets/graphic_eq.png"
                            style={{ animationDuration: `${animationSpeed}s` }}
                        />
                    </CardContent>
                </Card>
            </main>
            <style>{`
                @keyframes pulse-scale {
                    0% { transform: scale(1);}
                    50% { transform: scale(1.25);}
                    100% { transform: scale(1);}
                }
                .animate-pulse-scale {
                    animation-name: pulse-scale;
                    animation-iteration-count: infinite;
                    animation-timing-function: ease-in-out;
                }
            `}</style>
        </div>
    );
};
