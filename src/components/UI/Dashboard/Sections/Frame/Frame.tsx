import { Badge } from "../../../../../components/UI/ux/badge";
import { Button } from "../../../../../components/UI/ux/button";
import { Card, CardContent } from "../../../../../components/UI/ux/card";
import { JSX } from "react";
import { Link } from "react-router-dom";

// Define test card data for mapping
const testCards = [
    {
        id: 1,
        title: "Snellen Test",
        backgroundImage: "url('/assets/Depth 4, Frame 0.png')",
    },
    {
        id: 2,
        title: "Color Blindness Test",
        backgroundImage: "url('/assets/Depth 4, Frame 2.png')",
    },
    {
        id: 3,
        title: "Tumbling E Test",
        backgroundImage: "url('/assets/Depth 4, Frame 0 (1).png')",
    },
    {
        id: 4,
        title: "Lea Symbols Test",
        backgroundImage: "url('')",
    },
    {
        id: 5,
        title: "Contrast Sensitivity Test",
        backgroundImage: "url(..//depth-4--frame-0-3.png)",
    },
];

// Define recent tests data
const recentTests = [
    {
        id: 1,
        name: "Full vision test",
        date: "May 5, 2025",
        result: "20/25",
    },
    {
        id: 2,
        name: "Color Blindness test",
        date: "May 1, 2025",
        result: "Normal",
    },
    {
        id: 3,
        name: "Full Vision test",
        date: "April 12, 2025",
        result: "20/25",
    },
];

// Define helpful information data
const helpfulInfo = [
    {
        id: 1,
        title: "Check your vision with OptiCheck",
        action: "Learn more",
    },
    {
        id: 2,
        title: "How to take a vision test",
        action: "Learn more",
    },
];

export const Frame = (): JSX.Element => {
    return (
        <div className="flex flex-col w-full items-center gap-9">
            {/* Quick Actions Section */}
            <section className="flex flex-col items-start w-full">
                <div className="flex flex-col items-center gap-3 px-4 py-3 w-full">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="font-medium text-[#1d1d1d] text-base">
                            Quick Actions
                        </h2>
                        <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600 text-xs font-medium"
                        >
                            View History
                        </Button>
                    </div>

                    <Card className="w-full border-[0.25px] border-[#b6b6b6] rounded-xl">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-[35px] h-[35px] bg-blue-100 rounded-full flex items-center justify-center">
                                    <img
                                        className="w-[18px] h-[18px]"
                                        alt="Visibility"
                                        src="/assets/Frame 2147224506.png"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-[#1d1d1d] text-base">
                                        Start a Test
                                        <Link to="/test" className="text-white">Start a Test</Link>
                                    </span>
                                    <span className="font-normal text-[#637587] text-xs">
                                        Complete test in 5 minutes
                                    </span>
                                </div>
                            </div>
                            <div className="w-[35px] h-[35px] bg-blue-600 rounded-full flex items-center justify-center">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <div className="w-[17.14px] h-[17.14px] bg-[url('/assets/Depth 4, Frame 0 (2).png')] bg-[100%_100%]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Test Cards */}
                {testCards.map((test) => (
                    <div
                        key={test.id}
                        className="flex flex-col h-[316px] items-start px-4 py-3 w-full"
                    >
                        <Card className="w-full overflow-hidden rounded-xl shadow-[0px_0px_8px_#0000001a] border-[#ccc]">
                            <div className="w-full h-[201px] rounded-xl overflow-hidden">
                                <div
                                    className="w-full h-[201px] rounded-xl"
                                    style={{
                                        background: test.backgroundImage,
                                        backgroundSize: "cover",
                                        backgroundPosition: "50% 50%",
                                    }}
                                />
                            </div>
                            <CardContent className="flex flex-col items-start justify-center gap-1 p-4">
                                <h3 className="font-medium text-[#111416] text-base leading-[23px] w-full">
                                    {test.title}
                                </h3>
                                <div className="flex items-end justify-between w-full">
                                    <Button
                                        variant="link"
                                        className="h-auto p-0 text-blue-600 text-base font-normal"
                                    >
                                        Start the test
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}

                {/* Recent Tests Section */}
                <div className="flex flex-col w-full items-center gap-3 px-4 py-3">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="font-medium text-[#1d1d1d] text-base">
                            Recent Tests
                        </h2>
                        <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600 text-xs font-medium"
                        >
                            View History
                        </Button>
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full">
                        {recentTests.map((test) => (
                            <Card
                                key={test.id}
                                className="w-full border-[0.25px] border-[#b6b6b6] rounded-xl"
                            >
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-normal text-[#1d1d1d] text-base">
                                            {test.name}
                                        </span>
                                        <span className="font-light text-[#637587] text-xs">
                                            {test.date}
                                        </span>
                                    </div>
                                    <Badge className="bg-[#e9fdf3] text-[#237460] rounded-3xl px-1.5 py-0 font-medium text-xs">
                                        {test.result}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Helpful Information Section */}
                <div className="flex flex-col w-full items-start">
                    <div className="h-[60px] pt-5 pb-3 px-4 w-full">
                        <h2 className="font-medium text-[#111416] text-base leading-7">
                            Helpful Information
                        </h2>
                    </div>

                    {helpfulInfo.map((info) => (
                        <div
                            key={info.id}
                            className="h-[72px] flex items-center justify-between px-4 py-2 bg-white w-full"
                        >
                            <div className="flex flex-col justify-center">
                                <h3 className="font-normal text-[#111416] text-base leading-6 whitespace-nowrap">
                                    {info.title}
                                </h3>
                                <span className="font-light text-[#637587] text-sm leading-[21px]">
                                    {info.action}
                                </span>
                            </div>
                            <div className="flex items-center justify-center w-7">
                                <div className="w-6 h-6 bg-[url('/assets/Depth 4, Frame 0 (3).png')] bg-[100%_100%]" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Start a Test Button */}
            <Button className="w-[343px] p-3 bg-blue-600 rounded-3xl font-bold text-[#fefefe] text-base font-['Manrope',Helvetica]">
                Start a Test
            </Button>
        </div>
    );
};