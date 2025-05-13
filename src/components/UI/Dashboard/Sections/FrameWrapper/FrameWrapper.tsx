import React, { JSX } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../../../components/UI/ux/avatar";
import { Card, CardContent } from "../../../../../components/UI/ux/card";
import { Separator } from "../../../../../components/UI/ux/separator";

export const FrameWrapper = (): JSX.Element => {
    // User data
    const userData = {
        name: "Oge",
        lastTest: "May 5, 2025",
        avatarSrc: "/ellipse-35.png",
    };

    // Stats data
    const statsData = [
        {
            label: "Vision Score",
            value: "20/25",
        },
        {
            label: "Test Taken",
            value: "10",
        },
        {
            label: "Next Text",
            value: "5 days",
        },
    ];

    return (
        <div className="flex flex-col w-full items-start gap-[25px] p-4 bg-white">
            {/* User profile section */}
            <div className="flex items-center gap-3 w-full">
                <Avatar className="w-[38.36px] h-[38.36px]">
                    <AvatarImage src={userData.avatarSrc} alt="User avatar" />
                    <AvatarFallback>OG</AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-start justify-center">
                    <div className="flex items-center gap-[6.1px] w-full">
                        <div className="[font-family:'Outfit',Helvetica] font-medium text-[#1d1d1d] text-base">
                            Hello {userData.name}!
                        </div>
                    </div>

                    <div className="flex items-center gap-[6.1px] w-full">
                        <div className="[font-family:'Outfit',Helvetica] font-normal text-[#637587] text-xs">
                            last test: {userData.lastTest}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats card */}
            <Card className="w-full border-[0.25px] border-solid border-[#b6b6b6] rounded-xl">
                <CardContent className="flex items-center gap-[15px] p-4">
                    {statsData.map((stat, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center flex-1">
                                <div className="flex items-center justify-center">
                                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#7fa3f3] text-xs">
                                        {stat.label}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="[font-family:'Outfit',Helvetica] font-medium text-blue-600 text-base">
                                        {stat.value}
                                    </div>
                                </div>
                            </div>
                            {index < statsData.length - 1 && (
                                <Separator orientation="vertical" className="h-full" />
                            )}
                        </React.Fragment>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};
