"use client"

import { useState } from "react"
import { ArrowLeft, Menu, Settings } from "lucide-react"
import { Button } from "../UI/ux/button"
import { NavFrame } from "../UI/Dashboard/Sections/Frame/NavFrame"

export default function UpdateProfile() {
    const [email, setEmail] = useState("ogechukwu@gmail.com")
    const [name, setName] = useState("Oge Chukwu")

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
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
                        <Settings className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>
            </header>

            <div className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <NavFrame />
            </div>

            {/* Page Title */}
            <div className="flex items-center gap-3 px-6 py-4">
                <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                    <ArrowLeft className="h-6 w-6 text-black" />
                </Button>
                <h1 className="text-2xl font-medium text-black">Update Profile</h1>
            </div>

            {/* Form */}
            <div className="px-6 pt-8 space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-lg font-medium text-black">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 rounded-full border-2 border-[#2563eb] bg-white px-6 text-lg focus:border-[#2563eb] focus:ring-0"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="name" className="text-lg font-medium text-black">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-14 rounded-full border-2 border-[#2563eb] bg-white px-6 text-lg focus:border-[#2563eb] focus:ring-0"
                    />
                </div>

                <div className="pt-8">
                    <Button className="w-full h-14 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-lg font-medium">
                        Update
                    </Button>
                </div>
            </div>
        </div>
    )
}
