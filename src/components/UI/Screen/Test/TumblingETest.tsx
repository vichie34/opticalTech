import { JSX, useEffect, useState, useRef } from "react";
import { Card, CardContent } from "../../ux/card";
import { Progress } from "../../ux/progress";
import PermissionModal from "../../Dashboard/Sections/Modal/PermissionModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface TumblingETestProps {
    onComplete: (result: { score: number; distance: number }) => void;
}

export const TumblingETest = ({ onComplete }: TumblingETestProps): JSX.Element => {
    const [time, setTime] = useState(0);
    const [isTracking, setIsTracking] = useState(false);
    const [currentSymbol, setCurrentSymbol] = useState("E");
    const [fontSize] = useState(20);
    const [opacity] = useState(1);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(true);
    const [animationSpeed, setAnimationSpeed] = useState(1);

    const maxTestDuration = 24;
    const distance = 40; // cm
    const [mistakes, setMistakes] = useState<string[]>([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [correctQuestions, setCorrectQuestions] = useState(0);


    const [total_questions] = useState(0);
    const [correct_answers] = useState(0);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);

    const navigate = useNavigate();

    // API: Send test result to backend
    const sendTestResult = async (_result: { score: number; distance: number }) => {
        try {
            const score = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;

            const backend_result = {
                total_questions: totalQuestions,
                correct_answers: correctQuestions,
                mistakes,
                distance,
            };


            // Refresh token
            const authResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/auth/tokenn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    refresh_token: localStorage.getItem("refresh_token"),
                }),
            });
            const auth = await authResponse.json();
            const usertoken = auth.access_token;
            const refresh_token = auth.refresh_token;

            // Store tokens
            localStorage.setItem("access_token", usertoken);
            localStorage.setItem("refresh_token", refresh_token);

            // Send result to Tumbling E endpoint
            await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/test/tumbling-e-test`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${usertoken}`,
                },
                body: JSON.stringify(backend_result),
                credentials: "include",
            });

            toast.success("Test result submitted successfully");
        } catch (err) {
            toast.error("Failed to send test results");
            console.error("Submission error:", err);
        }
    };

    useEffect(() => {
        const permissionsGranted = localStorage.getItem("permissionsGranted");
        if (!permissionsGranted) setIsPermissionModalOpen(true);
    }, []);

    useEffect(() => {
        const checkDevice = () => {
            setIsMobileOrTablet(window.innerWidth <= 1024);
        };
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
            alert("Failed to access mic and camera. Please allow permissions.");
            setIsPermissionModalOpen(false);
        }
    };

    const handleCancelPermission = () => setIsPermissionModalOpen(false);

    const generateRandomSymbol = () => {
        const directions = ["E", "3", "M", "W"];
        let newSymbol;
        do {
            newSymbol = directions[Math.floor(Math.random() * directions.length)];
        } while (newSymbol === currentSymbol);
        setCurrentSymbol(newSymbol);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isTracking) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 1;
                    if (newTime >= maxTestDuration) {
                        setIsTracking(false);
                        setShowNotification(true);
                        clearInterval(timer!);
                        const score = Math.floor((newTime / maxTestDuration) * 100);
                        sendTestResult({ score, distance });
                        onComplete({ score, distance });
                        return maxTestDuration;
                    }
                    return newTime;
                });
                generateRandomSymbol();
            }, 1000);
        }
        return () => { if (timer) clearInterval(timer); };
    }, [isTracking]);

    const toggleTracking = () => setIsTracking((prev) => !prev);

    useEffect(() => setIsListening(isTracking), [isTracking]);

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
                        //@ts-ignore
                        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
                        let sum = 0;
                        for (let i = 0; i < dataArrayRef.current.length; i++) {
                            const val = dataArrayRef.current[i] - 128;
                            sum += val * val;
                        }
                        const rms = Math.sqrt(sum / dataArrayRef.current.length);
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
                (mediaStreamRef.current as MediaStream).getTracks().forEach((track: MediaStreamTrack) => track.stop());
                mediaStreamRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
            cancelAnimationFrame(rafId);
            setAnimationSpeed(1);
        }
        return () => {
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
                mediaStreamRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
            cancelAnimationFrame(rafId);
        };
    }, [isListening]);

    useEffect(() => {
        if (!isPermissionModalOpen && time === 0 && !isTracking) setIsTracking(true);
    }, [isPermissionModalOpen]);

    // Helper to normalize user speech for comparison
    const normalizeAnswer = (answer: string) => {
        answer = answer.trim().toLowerCase();
        if (["e", "east"].includes(answer)) return "E";
        if (["3", "three"].includes(answer)) return "3";
        if (["m", "em"].includes(answer)) return "M";
        if (["w", "double u"].includes(answer)) return "W";
        return answer.toUpperCase();
    };

    // Speech recognition logic
    useEffect(() => {
        if (!isListening) return;
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            const normalized = normalizeAnswer(transcript);
            setTotalQuestions((prev) => prev + 1);
            if (normalized === currentSymbol) {
                setCorrectQuestions((prev) => prev + 1);
            } else {
                setMistakes((prev) => [...prev, transcript]);
            }
        };
        recognition.onerror = () => { };
        recognition.onend = () => { if (isListening) recognition.start(); };
        recognition.start();
        return () => { recognition.stop(); };
    }, [isListening, currentSymbol]);

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
            {showNotification && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#FFFFFF] bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            Test Complete
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Your score: {Math.floor((time / maxTestDuration) * 100)}%
                        </p>
                        <button
                            onClick={() => {
                                setShowNotification(false);
                                navigate("/TestResult", {
                                    state: {
                                        testScore: Math.floor((time / maxTestDuration) * 100),
                                        completedAt: new Date().toISOString(),
                                        testType: "Tumbling E",
                                        distance,
                                    }
                                });
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            See Result
                        </button>
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
                <div className="mx-4 mt-[16px]">
                    <Progress
                        value={Math.min((time / maxTestDuration) * 100, 100)}
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
                            style={{
                                animationDuration: `${animationSpeed}s`
                            }}
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

// Then render LeaSymbolsTest, etc.
{/* <TumblingETest onComplete={(result) => saveResultToBackend('Tumbling E', result)} /> */ }