import {
    HistoryIcon,
    LogOutIcon,
    SettingsIcon,
    UserCircleIcon,
} from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../ux/avatar";
import { JSX } from "react";

import { Button } from "../../..//ux/button";
import { Card, CardContent } from "../../../ux/card";

export const NavFrame = (): JSX.Element => {
    // MenuIcon items data for mapping
    const menuItems = [
        { icon: <UserCircleIcon className="h-6 w-6" />, label: "Profile" },
        { icon: <HistoryIcon className="h-6 w-6" />, label: "History" },
        { icon: <SettingsIcon className="h-6 w-6" />, label: "Settings" },
        { icon: <LogOutIcon className="h-6 w-6" />, label: "Log out" },
    ];

    return (
        <div className="relative w-[245px] h-[812px] bg-[#f4f5f7] rounded-lg overflow-hidden">
            {/* Home indicator */}
            <div className="flex flex-col w-[375px] items-start px-[120px] py-1.5 absolute bottom-0 left-0">
                <div className="relative self-stretch w-full h-[5px] bg-[#353535] rounded-[10px]" />
            </div>

            {/* MenuIcon items */}
            <div className="flex flex-col w-[218px] items-start pt-0 pb-6 px-0 absolute top-52 left-4 border-b-[0.5px] border-[#b8b8b8]">
                {menuItems.map((item, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="flex items-center justify-start gap-2 pl-0 pr-3 py-3 w-full h-auto"
                    >
                        {item.icon}
                        <span className="font-normal text-[#353535] text-base">
                            {item.label}
                        </span>
                    </Button>
                ))}
            </div>

            {/* Header */}
            {/* <div className="flex flex-col w-[375px] h-[20px] items-start absolute top-[-10px] left-0 bg-white">
                <img
                    className="relative self-stretch w-full flex-[0_0_auto]"
                    alt="Status bar upper"
                    src="/status-bar-upper.svg"
                />

                <div className="flex h-11 items-center justify-between px-4 py-2.5 relative self-stretch w-full">
                    <MenuIcon className="h-6 w-6" />
                    <div className="font-bold text-blue-600 text-base font-['Merriweather_Sans',Helvetica]">
                        OptiCheck
                    </div>
                    <SettingsIcon className="h-6 w-6 opacity-0" />
                </div>
            </div> */}

            {/* User profile section */}
            <Card className="flex flex-col w-[245px] items-start gap-2 pt-0 pb-6 px-4 absolute top-[83px] left-0 bg-white border-none shadow-none">
                <CardContent className="p-0 flex flex-col gap-2">
                    <Avatar className="w-[38.36px] h-[38.36px]">
                        <AvatarImage src="/ellipse-36.png" alt="User avatar" />
                        <AvatarFallback>OG</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col items-start justify-center">
                        <div className="flex items-center gap-[6.1px] w-full">
                            <div className="font-medium text-[#1d1d1d] text-base font-['Outfit',Helvetica]">
                                Hello Oge!
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-[6.1px] w-full">
                            <div className="font-normal text-[#637587] text-xs font-['Outfit',Helvetica]">
                                last test: May 5, 2025
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
