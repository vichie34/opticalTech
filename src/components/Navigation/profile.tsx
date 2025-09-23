"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, Settings, ChevronRight, Copy, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../UI/ux/avatar"
import { Button } from "../UI/ux/button"
import { Card, CardContent } from "../UI/ux/card"
import { NavFrame } from "../UI/Dashboard/Sections/Frame/NavFrame"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../UI/ux/alert-dialog"
import { toast } from "sonner"

export default function Profile() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<{ name?: string; uid?: string }>({});
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    useEffect(() => {
        async function fetchUser() {
            try {

                const access_token = localStorage.getItem("access_token");
                const refresh_token = localStorage.getItem("refresh_token");
    
                if (!access_token && !refresh_token) {
                    throw new Error("No valid session found. Please log in again.");
                }
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/dashboard/me`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ refresh_token }),
                });
                const result = await res.json(); 
                //console.log("response:", result);

                if (res.ok) {
                    const user = result.data.user;
                    //console.log("username:", user.first_name);
                    setUser({
                        name: `${user.first_name}`,
                        uid: user.id,});
                }
            } catch (error) {
                // Handle error (optional)
            }
        }
        fetchUser();
    }, []);

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/users/delete`, {
                method: "DELETE",
                credentials: "include",
            });

            if (response.ok) {
                toast.success("Account deleted successfully");
                navigate("/login");
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to delete account");
            }
        } catch (error) {
            toast.error("An error occurred while deleting account");
        }
    };

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

            {/* User Profile Section */}
            <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile" />
                        <AvatarFallback className="bg-[#c73538] text-white text-lg">
                            {user.name ? user.name[0] : "O"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-semibold text-[#1d1d1d]">
                            Hello, {user.name ? user.name : "User"}
                        </h2>
                        <div className="flex items-center gap-2 text-[#637587]">
                            <span className="text-sm">UID:{user.uid ? `${user.uid.slice(0, 5)}...` : "N/A"}</span>
                            <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                                <Copy className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="px-6 space-y-4">
                {/* First Card */}
                <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-0">
                        <div className="divide-y divide-[#ebebf5]">
                            <Button variant="ghost" className="w-full justify-between h-14 px-4 rounded-none" onClick={() => navigate("/updateprofile")}>
                                <span className="text-[#1d1d1d] text-base">Profile</span>
                                <ChevronRight className="h-5 w-5 text-[#637587]" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between h-14 px-4 rounded-none" onClick={() => navigate("/ChangePassword")}>
                                <span className="text-[#1d1d1d] text-base">Change Password</span>
                                <ChevronRight className="h-5 w-5 text-[#637587]" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between h-14 px-4 rounded-none" onClick={() => navigate("/LanguageSelection")}>
                                <span className="text-[#1d1d1d] text-base">Language</span>
                                <ChevronRight className="h-5 w-5 text-[#637587]" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Second Card */}
                <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-0">
                        <div className="divide-y divide-[#ebebf5]">
                            <Button variant="ghost" className="w-full justify-between h-14 px-4 rounded-none" onClick={() => navigate("/notifications")}>
                                <span className="text-[#1d1d1d] text-base">Notifications</span>
                                <ChevronRight className="h-5 w-5 text-[#637587]" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between h-14 px-4 rounded-none" onClick={() => navigate("/History")}>
                                <span className="text-[#1d1d1d] text-base">Test History</span>
                                <ChevronRight className="h-5 w-5 text-[#637587]" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between h-14 px-4 rounded-none">
                                <span className="text-[#1d1d1d] text-base">Refer Friends</span>
                                <ChevronRight className="h-5 w-5 text-[#637587]" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Third Card */}
                <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-0">
                        <Button variant="ghost" className="w-full justify-between h-14 px-4 rounded-lg">
                            <span className="text-[#1d1d1d] text-base">Log out</span>
                            <LogOut className="h-5 w-5 text-[#637587]" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Delete Account */}
                <div className="pt-6">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="text-[#c73538] text-base p-0 h-auto">
                                Delete Account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white max-w-[320px] rounded-xl">
                            <div className="flex justify-center mb-4">
                                <div className="font-bold text-blue-600 text-xl font-['Merriweather_Sans',Helvetica]">
                                    OptiCheck
                                </div>
                            </div>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-[#1d1d1d] text-xl font-semibold text-center">
                                    Delete Account?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-[#637587] text-center">
                                    This action cannot be undone. This will permanently delete your
                                    account and remove all your data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex flex-col gap-2 mt-6">
                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    className="w-full h-14 rounded-full bg-[#c73538] hover:bg-[#b32d30] text-white text-base font-medium"
                                >
                                    Delete Account
                                </AlertDialogAction>
                                <AlertDialogCancel className="w-full h-14 rounded-full border-2 border-[#2563eb] bg-white text-[#2563eb] text-base font-medium hover:bg-blue-50">
                                    Cancel
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}
