"use client"

import { useState } from "react"
import { ArrowLeft, Menu, Bell, Eye, EyeOff } from "lucide-react"
import { Button } from "../UI/ux/button"
import { Label } from "../UI/ux/label"
import { NavFrame } from "../UI/Dashboard/Sections/Frame/NavFrame"


export default function Component() {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const handleNotificationClick = () => {
        console.log("clicked");
    }
    return (
        <div className="min-h-screen bg-[#f9f9f9] max-w-sm mx-auto">

            {/* Header */}
            <header className="sticky top-0 z-10 w-full bg-white">
                <div className="flex flex-col w-full items-start">
                    <div className="flex h-11 items-center justify-between px-4 py-2.5 w-full">
                        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
                        <div className="font-bold text-blue-600 text-base text-center font-['Merriweather_Sans',Helvetica]">
                            OptiCheck
                        </div>
                        <button
                            onClick={handleNotificationClick}
                            style={{
                                padding: "4px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#000000",
                            }}
                        >
                            <Bell />
                        </button>
                    </div>
                </div>
            </header>

            <div className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <NavFrame />
            </div>

            {/* Content */}
            <div className="px-6 mt-8">
                {/* Page Title */}
                <div className="flex items-center gap-4 mb-12">
                    <Button variant="ghost" size="icon" className="p-0">
                        <ArrowLeft className="w-6 h-6 text-black" />
                    </Button>
                    <h1 className="text-2xl font-medium text-black">Change Password</h1>
                </div>

                {/* Form */}
                <div className="space-y-8">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-lg text-black font-normal">
                            Email
                        </Label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value="ogechukwu@gmail.com"
                                readOnly
                                className="h-14 px-4 text-base bg-[#ebebf5] border-2 border-[#2563eb] rounded-2xl text-black placeholder:text-[#6b7280] focus:border-[#2563eb] focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-lg text-black font-normal">
                            Password
                        </Label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="input new password"
                                className="h-14 px-4 pr-12 text-base bg-[#ebebf5] border border-[#d9d9d9] rounded-2xl text-black placeholder:text-[#b8b8b8] focus:border-[#2563eb] focus:ring-0"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-8 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5 text-[#6b7280]" />
                                ) : (
                                    <Eye className="w-5 h-5 text-[#6b7280]" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Update Button */}
                <div className="mt-16">
                    <Button className="w-full h-14 bg-[#2563eb] hover:bg-[#1980e5] text-white text-lg font-medium rounded-2xl">
                        Update
                    </Button>
                </div>
            </div>
        </div>
    )
}
