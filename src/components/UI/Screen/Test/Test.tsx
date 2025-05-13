import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, CardContent } from "../../ux/card";
import { Progress } from "../../ux/progress";
import { Howl } from "howler";
import PermissionModal from "../../Dashboard/Sections/Modal/PermissionModal";

export const Test = (): JSX.Element => {
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const [time, setTime] = useState(0); // Time in seconds
    const [isTracking, setIsTracking] = useState(false);
    const [currentLetter, setCurrentLetter] = useState("E"); // Random letter
    const [fontSize, setFontSize] = useState(200); // Dynamic font size
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false); // Modal state
    const [isListening, setIsListening] = useState(false); // Indicates if the system is listening

    // Maximum test duration in seconds
    const maxTestDuration = 120; // 2 minutes

    // Check if permissions were granted
    useEffect(() => {
        const permissionsGranted = localStorage.getItem("permissionsGranted");
        if (!permissionsGranted) {
            setIsPermissionModalOpen(true); // Open modal if permissions were not granted
        }
    }, []);

    const handleAllowAccess = async () => {
        try {
            // Request access to the microphone and camera
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            console.log("Access granted to mic and camera:", stream);

            // Close the modal and save the permission state
            setIsPermissionModalOpen(false);
            localStorage.setItem("permissionsGranted", "true");
        } catch (error) {
            console.error("Error accessing mic and camera:", error);
            alert("Failed to access mic and camera. Please allow permissions.");
        }
    };

    const handleCancelPermission = () => {
        // Close the modal if the user cancels
        setIsPermissionModalOpen(false);
    };

    const handleSettingsClick = () => {
        // Reopen the modal if the speaker is off
        setIsPermissionModalOpen(true);
    };

    // Simulate voice detection
    const simulateVoiceDetection = () => {
        setIsListening(true); // Start listening
        setTimeout(() => setIsListening(false), 2000); // Stop listening after 2 seconds
    };

    // Data for the tracking section
    const trackingData = {
        status: isTracking ? "Tracking Active" : "Paused",
        time: `${time}s`,
        pauseText: isTracking ? "Pause Test" : "Resume Test",
    };

    // Data for the instruction card
    const instructionData = {
        title: "Say the Letter you see out loud",
        status: isTracking ? "Listening....." : "Paused",
    };

    // Audio beep setup using Howler.js
    const beep = new Howl({
        src: ["/beep.mp3"], // Replace with the path to your beep sound
    });

    // Generate a random letter and font size
    const generateRandomLetter = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const randomFontSize = Math.floor(Math.random() * 100) + 100; // Font size between 100px and 200px
        setCurrentLetter(randomLetter);
        setFontSize(randomFontSize);
    };

    // Start the timer and play beeps when the test begins
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isTracking) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime + 1 >= maxTestDuration) {
                        // Stop the test when the max duration is reached
                        setIsTracking(false);
                        clearInterval(timer!);

                        // Navigate to the TestResult page with the test score
                        navigate("/testresult", { state: { testScore: Math.floor((prevTime / maxTestDuration) * 100) } });
                        return maxTestDuration; // Ensure time doesn't exceed max duration
                    }
                    return prevTime + 1;
                });
                generateRandomLetter(); // Generate a new letter every second
                beep.play(); // Play beep sound
            }, 1000);
        } else if (!isTracking && timer) {
            clearInterval(timer);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isTracking, navigate]); // Add navigate to the dependency array

    // Toggle tracking state
    const toggleTracking = () => {
        setIsTracking((prev) => !prev);
    };

    return (
        <div className="relative w-full max-w-[375px] h-[812px] bg-[#f9f9f9]">
            {/* Permission Modal */}
            <PermissionModal
                isOpen={isPermissionModalOpen}
                onAllow={handleAllowAccess}
                onCancel={handleCancelPermission}
            />

            <main className="w-full h-[620px] mt-[14px] bg-white">
                {/* Top tracking bar */}
                <div className="flex w-full items-center justify-between px-4 py-0 mt-[30px]">
                    <div className="flex items-center gap-1">
                        <img
                            className="w-[26px] h-[26px]"
                            alt="Beeping"
                            src="/assets/Frame 2147224506.png"
                        />
                        <span className="font-medium text-blue-600 text-sm text-center font-['Outfit',Helvetica]">
                            {trackingData.status}
                        </span>
                    </div>

                    <div className="w-[17px] h-[19px]">
                        <span className="font-semibold text-[#637587] text-sm text-center font-['Manrope',Helvetica]">
                            {trackingData.time}
                        </span>
                    </div>

                    <div className="flex items-center gap-1" onClick={toggleTracking}>
                        <img
                            className="w-[18px] h-[18px]"
                            alt={isTracking ? "Pause" : "Play"}
                            src={isTracking ? "/assets/pause.png" : "/assets/play.png"}
                        />
                        <span className="font-bold text-[#637587] text-center font-['Outfit',Helvetica]">
                            {trackingData.pauseText}
                        </span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mx-4 mt-[16px]">
                    <Progress
                        value={(time / maxTestDuration) * 100} // Calculate progress as a percentage
                        className="h-1 bg-[#e6e6e6] rounded-[10px]"
                    />
                </div>

                {/* Main test content */}
                <div className="flex flex-col items-center justify-center mt-[62px]">
                    <h1
                        className="font-bold text-black text-center font-['Outfit',Helvetica] leading-normal"
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        {currentLetter}
                    </h1>

                    <p className="font-normal text-[#637587] text-xs mt-[62px] font-['Outfit',Helvetica] leading-[21px]">
                        Keep Device at arm&apos;s length
                    </p>
                </div>

                {/* Instruction card */}
                <Card className="mx-4 mt-[79px] bg-[#eef4fc] border-none">
                    <CardContent className="flex items-center justify-between p-4">
                        <div
                            className="w-[29px] h-[29px] bg-blue-100 rounded-[138.1px] flex items-center justify-center cursor-pointer"
                            onClick={handleSettingsClick}
                        >
                            <img
                                onClick={simulateVoiceDetection}
                                className="w-[22px] h-[22px]"
                                alt="Settings voice"
                                src="/assets/Frame 2147224516.png"
                            />
                        </div>

                        <div className="flex flex-col items-start justify-center">
                            <p className="font-medium text-[#0f3a98] text-sm leading-[21px] whitespace-nowrap font-['Outfit',Helvetica]">
                                {instructionData.title}
                            </p>
                            <p className="font-normal text-blue-600 text-xs leading-[21px] whitespace-nowrap font-['Outfit',Helvetica]">
                                {instructionData.status}
                            </p>
                        </div>

                        <img
                            className={`w-6 h-6 transition-transform duration-500 ${isListening ? "scale-125" : "scale-100"
                                }`}
                            alt="Graphic eq"
                            src="/assets/graphic_eq.png"
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};
