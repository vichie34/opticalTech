import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../ux/card";
import { Progress } from "../../ux/progress";
import PermissionModal from "../../Dashboard/Sections/Modal/PermissionModal";

export const Test = (): JSX.Element => {
    const navigate = useNavigate();

    // State variables
    const [time, setTime] = useState(0); // Time in seconds
    const [isTracking, setIsTracking] = useState(false); // Test tracking state
    const [currentTestIndex, setCurrentTestIndex] = useState(0); // Index of the current test
    const [currentSymbol, setCurrentSymbol] = useState("E"); // Current symbol/letter
    const [fontSize, setFontSize] = useState(20); // Numeric font size in vw
    const [opacity, setOpacity] = useState(1); // Opacity for fading effect
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false); // Modal state
    const [results, setResults] = useState<Record<string, any>>({}); // Store results for all tests
    const [showNotification, setShowNotification] = useState(false); // Notification state
    const [isListening, setIsListening] = useState(false); // Listening state
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(true); // Device type state

    const maxTestDuration = 24; // Duration for each test (in seconds)

    // List of test types in order
    const testTypes = ["Tumbling E", "Lea Symbols", "Color Blindness", "Contrast Sensitivity", "Snellen Test"];

    // Check if permissions were granted
    useEffect(() => {
        const permissionsGranted = localStorage.getItem("permissionsGranted");
        if (!permissionsGranted) {
            setIsPermissionModalOpen(true); // Open modal if permissions were not granted
        }
    }, []);

    useEffect(() => {
        // Check if the screen width is less than or equal to 1024px (tablet and mobile)
        const checkDevice = () => {
            const isMobile = window.innerWidth <= 1024;
            setIsMobileOrTablet(isMobile);
        };

        // Run the check on component mount
        checkDevice();

        // Add a resize event listener to handle screen resizing
        window.addEventListener("resize", checkDevice);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", checkDevice);
        };
    }, []);

    const handleAllowAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            console.log("Access granted to mic and camera:", stream);
            setIsPermissionModalOpen(false);
            localStorage.setItem("permissionsGranted", "true");
        } catch (error) {
            console.error("Error accessing mic and camera:", error);
            alert("Failed to access mic and camera. Please allow permissions.");
            setIsPermissionModalOpen(false); // Close modal even if access is denied
        }
    };

    const handleCancelPermission = () => {
        setIsPermissionModalOpen(false);
    };

    const generateRandomSymbol = () => {
        const currentTestType = testTypes[currentTestIndex];
        let newSymbol;

        if (currentTestType === "Tumbling E") {
            const directions = ["E", "3", "M", "W"];
            do {
                newSymbol = directions[Math.floor(Math.random() * directions.length)];
            } while (newSymbol === currentSymbol);
        } else if (currentTestType === "Lea Symbols") {
            const symbols = ["Circle", "Square", "House", "Apple"];
            do {
                newSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            } while (newSymbol === currentSymbol);
        } else if (currentTestType === "Color Blindness") {
            const colors = ["🔴", "🟢", "🔵", "🟡"];
            do {
                newSymbol = colors[Math.floor(Math.random() * colors.length)];
            } while (newSymbol === currentSymbol);
        } else if (currentTestType === "Contrast Sensitivity") {
            const contrastLevels = ["A", "B", "C", "D", "E", "F", "G", "H"];
            do {
                newSymbol = contrastLevels[Math.floor(Math.random() * contrastLevels.length)];
            } while (newSymbol === currentSymbol);
        } else if (currentTestType === "Snellen Test") {
            const snellenLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
            do {
                newSymbol = snellenLetters[Math.floor(Math.random() * snellenLetters.length)];
            } while (newSymbol === currentSymbol);
            setFontSize((prevSize) => Math.max(prevSize - 2, 5)); // Decrease font size for Snellen Test
        }

        setCurrentSymbol(newSymbol || currentSymbol);
    };

    // useEffect(() => {
    //     let timer: NodeJS.Timeout | null = null;

    //     if (isTracking) {
    //         timer = setInterval(() => {
    //             setTime((prevTime) => {
    //                 if (prevTime + 1 >= maxTestDuration) {
    //                     // Save the result for the current test
    //                     const currentTestType = testTypes[currentTestIndex];
    //                     setResults((prevResults) => ({
    //                         ...prevResults,
    //                         [currentTestType]: Math.floor((prevTime / maxTestDuration) * 100), // Example score
    //                     }));

    //                     // Notify the user about the next test
    //                     setIsTracking(false);
    //                     setShowNotification(true);

    //                     clearInterval(timer!);
    //                     return maxTestDuration;
    //                 }

    //                 // Gradually reduce opacity for Snellen Test
    //                 if (testTypes[currentTestIndex] === "Snellen Test") {
    //                     const fadeOutTime = maxTestDuration * 0.8; // Fade out in the last 80% of the duration
    //                     const newOpacity = Math.max(0, 1 - (prevTime + 1) / fadeOutTime);
    //                     setOpacity(newOpacity);
    //                 }

    //                 return prevTime + 1;
    //             });
    //             generateRandomSymbol();
    //         }, 1000);
    //     } else if (!isTracking && timer) {
    //         clearInterval(timer);
    //     }

    //     return () => {
    //         if (timer) clearInterval(timer);
    //     };
    // }, [isTracking, currentTestIndex, navigate, results]);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isTracking) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 1;

                    if (newTime >= maxTestDuration) {
                        // Save the result for the current test
                        const currentTestType = testTypes[currentTestIndex];
                        setResults((prevResults) => ({
                            ...prevResults,
                            [currentTestType]: Math.floor((newTime / maxTestDuration) * 100), // Example score
                        }));

                        // Notify the user about the next test
                        setIsTracking(false);
                        setShowNotification(true);

                        clearInterval(timer!);
                        return maxTestDuration;
                    }

                    // Gradually reduce opacity for Snellen Test
                    if (testTypes[currentTestIndex] === "Snellen Test") {
                        const fadeOutTime = maxTestDuration * 0.8; // Fade out in the last 80% of the duration
                        const newOpacity = Math.max(0, 1 - newTime / fadeOutTime);
                        setOpacity(newOpacity);
                    }

                    return newTime;
                });

                generateRandomSymbol();
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isTracking, currentTestIndex]);


    const startNextTest = () => {
        setShowNotification(false); // Hide notification
        if (currentTestIndex + 1 < testTypes.length) {
            setCurrentTestIndex((prevIndex) => prevIndex + 1);
            setTime(0); // Reset time for the next test
            setFontSize(20); // Reset font size for Snellen Test
            setOpacity(1); // Reset opacity for the next test
            setIsTracking(true); // Start the next test
        } else {
            // All tests completed, navigate to results page
            navigate("/testresult", { state: { results } });
        }
    };

    const toggleTracking = () => {
        setIsTracking((prev) => {
            const newTrackingState = !prev;
            setIsListening(newTrackingState); // Update isListening based on tracking state
            return newTrackingState;
        });
    };

    useEffect(() => {
        if (isTracking) {
            setIsListening(true); // System is working
        } else {
            setIsListening(false); // System is paused
        }
    }, [isTracking]);

    // Determine the instruction text based on the current test type
    const getInstructionText = () => {
        const currentTestType = testTypes[currentTestIndex];
        if (currentTestType === "Color Blindness") {
            return "Say the color you see";
        } else if (currentTestType === "Contrast Sensitivity") {
            return "Say the word you see";
        } else {
            return "Say the letter you see out loud";
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
        <div className="relative w-full max-w-[375px] h-[812px] bg-[#f9f9f9] lg:hidden">
            {/* Permission Modal */}
            <PermissionModal
                isOpen={isPermissionModalOpen}
                onAllow={handleAllowAccess}
                onCancel={handleCancelPermission}
            />

            {/* Notification for the next test */}
            {showNotification && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#FFFFFF] bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            {currentTestIndex + 1 < testTypes.length
                                ? `Next Test: ${testTypes[currentTestIndex + 1]}`
                                : "All Tests Completed"}
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            {currentTestIndex + 1 < testTypes.length
                                ? "Take a moment to get comfortable before starting the next test."
                                : "You have completed all tests. Click below to see your results."}
                        </p>
                        <button
                            onClick={startNextTest}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            {currentTestIndex + 1 < testTypes.length ? "Start Next Test" : "See Results"}
                        </button>
                    </div>
                </div>
            )}

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

                {/* Progress bar */}
                <div className="mx-4 mt-[16px]">
                    <Progress
                        value={Math.min((time / maxTestDuration) * 100, 100)} // Clamp progress to 100%
                        className="h-1 bg-[#e6e6e6] rounded-[10px]"
                    />
                </div>

                {/* Main test content */}
                <div className="flex flex-col items-center justify-center mt-[62px]">
                    <h1
                        className={`font-bold text-black text-center font-['Outfit',Helvetica] leading-normal transition-opacity duration-1000 ${testTypes[currentTestIndex] === "Contrast Sensitivity" ? "blurred-text" : ""
                            }`}
                        style={{ fontSize: `${fontSize}vw`, opacity: opacity }}
                    >
                        {currentSymbol}
                    </h1>

                    <p className="font-normal text-[#637587] text-xs mt-[62px] font-['Outfit',Helvetica] leading-[21px]">
                        Keep Device at arm&apos;s length
                    </p>
                </div>

                {/* Instruction card */}
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
                                {getInstructionText()}
                            </p>
                            <p className="font-normal text-blue-600 text-xs leading-[21px] whitespace-nowrap font-['Outfit',Helvetica]">
                                {isTracking ? "Listening....." : "Paused"}
                            </p>
                        </div>

                        <img
                            className={`w-6 h-6 ${isListening ? "animate-pulse-scale" : ""}`}
                            alt="Graphic eq"
                            src="/assets/graphic_eq.png"
                        />
                    </CardContent>
                </Card>
            </main>

            <style>{`
                @keyframes pulse-scale {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.25);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                .animate-pulse-scale {
                    animation: pulse-scale 1s infinite;
                }

                .blurred-text {
                    filter: blur(3px); /* Apply blur effect */
                    opacity: 0.7; /* Slightly fade the text */
                }
            `}</style>
        </div>
    );
};
