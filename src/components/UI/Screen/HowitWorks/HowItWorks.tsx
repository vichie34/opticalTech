import { Menu, Settings } from "lucide-react"; // Correct icons
import { Button } from "../../ux/button";
import { Card, CardContent } from "../../ux/card";
import { NavFrame } from "../../Dashboard/Sections/Frame/NavFrame";
import { JSX, useState } from 'react';
import { Link } from "react-router-dom";

export const HowItWorks = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    function goBack(): void {
        window.history.back();
    }


    // Data for instruction cards
    const instructionCards = [
        {
            title: "Position your Device",
            description: "Hold your device at arm's lenghth",
            icon: "/assets/Frame 2147224506 (3).svg",
            bgColor: "bg-blue-100",
        },
        {
            title: "Read the Letters",
            description: "Follow on-screen instructions",
            icon: "/assets/Frame 2147224506 (1).svg",
            bgColor: "bg-violet-50",
        },
        {
            title: "Voice Commands",
            description: "Speak the letters you see clearly",
            icon: "/assets/Frame 2147224506 (4).svg",
            bgColor: "bg-emerald-50",
        },
    ];

    return (
        <div className="relative h-screen max-w-[375px] bg-[#f9f9f9]">
            {/* Status bar and header */}
            <div className="flex flex-col w-full items-start sticky top-0 z-10 bg-white">
                <header className="sticky top-0 z-10 w-full bg-white">
                    <div className="flex flex-col w-full items-start sticky top-0 z-10 bg-white">
                        <div className="flex h-11 items-center justify-between px-4 py-2.5 w-full">
                            <Menu className="w-6 h-6" onClick={toggleMenu} />
                            <div className="font-bold text-blue-600 text-base text-center font-['Merriweather_Sans',Helvetica]">
                                OptiCheck
                            </div>
                            <Settings className="w-6 h-6" />
                        </div>
                    </div>
                </header>

                {/* Slide-in Menu */}
                <div
                    className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <NavFrame />
                </div>
            </div>

            {/* Back button and title */}
            <div className="flex w-[344px] items-center gap-[87px] mt-6 mx-4">
                <img onClick={goBack} className="w-6 h-6" alt="Arrow back" src="/assets/arrow_back.png" />
                <div className="flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center justify-center gap-[9.24px]">
                        <div className="font-normal text-[#1d1d1d] text-lg text-center font-['Outfit',Helvetica]">
                            How it works
                        </div>
                    </div>
                </div>
            </div>

            {/* Main image */}
            <div className="w-[343px] h-[211px] mt-6 mx-auto rounded-xl overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    alt="Young woman in singlet taking photo on phone"
                    src="/assets/Frame 2147224510.png"
                />
            </div>

            {/* Instructions and button */}
            <div className="flex flex-col w-[342px] items-center gap-8 mt-8 mx-auto">
                <div className="flex flex-col items-start gap-2 w-full">
                    {instructionCards.map((card, index) => (
                        <Card
                            key={index}
                            className="w-full border-[0.25px] border-solid border-[#b6b6b6] rounded-xl"
                        >
                            <CardContent className="flex items-center gap-[15px] p-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`relative w-[35px] h-[35px] ${card.bgColor} rounded-[100px] overflow-hidden`}
                                    >
                                        <img
                                            className="absolute w-[18px] h-[18px] top-2 left-2"
                                            alt={card.title}
                                            src={card.icon}
                                        />
                                    </div>

                                    <div className="flex flex-col items-start">
                                        <div className="font-normal text-[#1d1d1d] text-base font-['Outfit',Helvetica]">
                                            {card.title}
                                        </div>
                                        <div className="font-light text-[#637587] text-xs font-['Outfit',Helvetica]">
                                            {card.description}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Button className="w-full py-3 bg-blue-600 rounded-3xl font-['Manrope',Helvetica] font-bold text-[#fefefe] text-base">
                    <Link to="/test">Start Vision Test</Link>
                </Button>
            </div>

        </div>
    );
};
