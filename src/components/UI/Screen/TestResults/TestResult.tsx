import { useLocation } from "react-router-dom";
import {
    AlertTriangleIcon,
    ArrowLeftIcon,
    CheckIcon,
    ClockIcon,
} from "lucide-react";
import { Card, CardContent } from "../../ux/card";
import { Button } from "../../ux/button";
import { Badge } from "../../ux/badge";
import { JSX } from "react";

export const TestResult = (): JSX.Element => {
    const location = useLocation();
    const { testScore, completedAt } = location.state || { testScore: 0, completedAt: new Date().toISOString() };

    // Format the date and time
    const formattedDate = new Date(completedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const formattedTime = new Date(completedAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    // Dynamically generate metrics based on the test score
    const metrics = [
        {
            label: "Attention Rate",
            value: `${Math.min(testScore + 5, 100)}%`, // Example: Adjust based on test score
            progressWidth: `w-[${Math.min(testScore + 5, 100) * 1.2}px]`, // Dynamic width
            progressColor: testScore > 80 ? "bg-emerald-600" : "bg-amber-600", // Green for high scores, amber for lower
        },
        {
            label: "Gaze Stability",
            value: `${Math.max(testScore - 10, 50)}%`, // Example: Adjust based on test score
            progressWidth: `w-[${Math.max(testScore - 10, 50) * 1.2}px]`, // Dynamic width
            progressColor: testScore > 70 ? "bg-emerald-600" : "bg-red-600", // Green for high scores, red for low
        },
    ];

    // Dynamically generate test insights based on the test score
    const testInsights = [
        ...(testScore > 90
            ? [
                {
                    type: "success",
                    bgColor: "bg-emerald-50",
                    iconBgColor: "bg-emerald-600",
                    textColor: "text-[#058a61]",
                    icon: <CheckIcon className="w-4 h-4" />,
                    message: "Excellent attention and response accuracy",
                },
            ]
            : []),
        ...(testScore <= 90 && testScore > 70
            ? [
                {
                    type: "warning",
                    bgColor: "bg-amber-50",
                    iconBgColor: "bg-amber-600",
                    textColor: "text-[#9f5602]",
                    icon: <AlertTriangleIcon className="w-3.5 h-3.5" />,
                    message: "Slight attention drift detected",
                },
            ]
            : []),
        ...(testScore <= 70
            ? [
                {
                    type: "info",
                    bgColor: "bg-blue-50",
                    iconBgColor: "bg-blue-600",
                    textColor: "text-[#033bb4]",
                    icon: <ClockIcon className="w-3.5 h-3.5" />,
                    message: "Consider retaking the test for better accuracy",
                },
            ]
            : []),
    ];

    return (
        <main className="relative w-full max-w-[375px] h-[812px] bg-[#f9f9f9] mx-auto">
            {/* Header */}
            <header className="flex w-[344px] items-center gap-3 absolute top-20 left-4">
                <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
                    <ArrowLeftIcon className="h-6 w-6" />
                </Button>

                <div className="inline-flex flex-col items-center justify-center gap-1">
                    <h1 className="font-normal text-lg [font-family:'Outfit',Helvetica] text-[#1d1d1d] text-center">
                        Test Results
                    </h1>
                </div>
            </header>

            <div className="absolute top-[745px] left-[83px] [font-family:'Outfit',Helvetica] font-normal text-[#637587] text-xs leading-[21px] whitespace-nowrap">
                Test completed on {formattedDate} at {formattedTime}
            </div>

            <div className="flex flex-col w-[343px] items-start gap-6 absolute top-[124px] left-4">
                {/* Visual Acuity Score Card */}
                <Card className="flex flex-col h-[133px] items-center gap-1 px-8 py-6 w-full bg-blue-50 border-none rounded-xl">
                    <CardContent className="flex flex-col items-center justify-center gap-1 p-0">
                        <p className="[font-family:'Outfit',Helvetica] font-normal text-[#033bb4] text-xs">
                            Your Visual Acuity Score
                        </p>
                        <p className="[font-family:'Outfit',Helvetica] font-semibold text-[#033bb4] text-3xl">
                            {testScore > 85 ? "20/20" : testScore > 70 ? "20/25" : "20/30"}
                        </p>
                        <Badge
                            className={`flex items-center gap-1 p-1 ${testScore > 85
                                ? "bg-emerald-50 text-[#058b61]"
                                : testScore > 70
                                    ? "bg-amber-50 text-[#9f5602]"
                                    : "bg-red-50 text-[#b00020]"
                                } font-normal rounded-xl border-none`}
                        >
                            <CheckIcon className="w-4 h-4" />
                            {testScore > 85
                                ? "Perfect vision"
                                : testScore > 70
                                    ? "Good vision"
                                    : "Needs improvement"}
                        </Badge>
                    </CardContent>
                </Card>

                {/* Metrics Cards */}
                <div className="flex items-center gap-3 w-full">
                    {metrics.map((metric, index) => (
                        <Card
                            key={index}
                            className="flex flex-col items-start gap-1.5 p-4 flex-1 bg-white rounded-xl"
                        >
                            <CardContent className="flex flex-col items-start gap-1.5 p-0 w-full">
                                <p className="[font-family:'Outfit',Helvetica] font-normal text-[#637587] text-xs">
                                    {metric.label}
                                </p>
                                <div className="flex flex-col items-start gap-1 w-full">
                                    <p className="[font-family:'Outfit',Helvetica] font-semibold text-[#353535] text-xl">
                                        {metric.value}
                                    </p>
                                    <div className="relative w-full h-[7px] bg-[#e6e6e6] rounded-[100px] overflow-hidden">
                                        <div
                                            className={`h-[7px] ${metric.progressWidth} ${metric.progressColor} rounded-[100px]`}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex flex-col items-start gap-8 w-full">
                    {/* Test Insights Section */}
                    <div className="flex flex-col items-start gap-3 w-full">
                        <h2 className="font-medium text-base [font-family:'Outfit',Helvetica] text-[#1d1d1d]">
                            Test Insights
                        </h2>

                        <div className="flex flex-col items-start gap-2 w-full">
                            {testInsights.map((insight, index) => (
                                <Card
                                    key={index}
                                    className={`flex items-center gap-[15px] p-4 w-full ${insight.bgColor} rounded-xl border-[0.25px] border-solid border-[#b6b6b6]`}
                                >
                                    <CardContent className="flex items-center gap-4 p-0">
                                        <div
                                            className={`relative w-4 h-4 ${insight.iconBgColor} rounded-[37.14px] flex items-center justify-center overflow-hidden`}
                                        >
                                            {insight.icon}
                                        </div>
                                        <p
                                            className={`[font-family:'Outfit',Helvetica] font-normal ${insight.textColor} text-xs`}
                                        >
                                            {insight.message}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col items-start gap-3 w-full">
                        <Button className="flex items-center justify-center gap-2.5 p-3 w-full bg-blue-600 rounded-3xl h-auto">
                            <span className="[font-family:'Manrope',Helvetica] font-bold text-[#fefefe] text-base">
                                Save Report
                            </span>
                        </Button>

                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2.5 p-3 w-full bg-[#e6e6e6] text-[#353535] rounded-3xl border-none h-auto"
                        >
                            <span className="[font-family:'Manrope',Helvetica] font-bold text-base">
                                Continue to Advanced Test
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};
