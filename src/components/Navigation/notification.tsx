
// import { ArrowLeft, Bell, CheckCircle, Clock, Flame, Menu } from "lucide-react"

// export default function NotificationsPage() {
//     const [notifications, setNotifications] = useState([
//         {
//             id: 1,
//             icon: "flame",
//             title: "New features added",
//             description: "We've improved test accuracy. Update your app to enjoy these features.",
//             time: "9:20 AM",
//             read: false,
//         },
//         {
//             id: 2,
//             icon: "clock",
//             title: "Time for your eye test",
//             description: "Your weekly eye screening is due. Tap to begin the test now or reschedule.",
//             time: "9:20 AM",
//             read: false,
//         },
//         {
//             id: 3,
//             icon: "check",
//             title: "Your test results are ready",
//             description: "Your latest vision test shows slight improvement. Tap to view full report.",
//             time: "9:20 AM",
//             read: false,
//         },
//         {
//             id: 4,
//             icon: "check",
//             title: "Your test results are ready",
//             description: "Your latest vision test shows slight improvement. Tap to view full report.",
//             time: "9:20 AM",
//             read: false,
//         },
//         {
//             id: 5,
//             icon: "check",
//             title: "Your test results are ready",
//             description: "Your latest vision test shows slight improvement. Tap to view full report.",
//             time: "9:20 AM",
//             read: false,
//         },
//         {
//             id: 6,
//             icon: "check",
//             title: "Your test results are ready",
//             description: "Your latest vision test shows slight improvement. Tap to view full report.",
//             time: "9:20 AM",
//             read: false,
//         },
//     ])

//     const markAllRead = () => {
//         setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
//     }

//     return (
//         <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
//             {/* Status Bar */}
//             <div className="flex justify-between items-center p-2 px-4 bg-white">
//                 <div className="text-black font-semibold">9:41</div>
//                 <div className="flex items-center gap-1">
//                     <div className="h-3 w-4">
//                         <svg viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M1 1H19" stroke="black" strokeWidth="2" strokeLinecap="round" />
//                             <path d="M4 5H16" stroke="black" strokeWidth="2" strokeLinecap="round" />
//                             <path d="M7 9H13" stroke="black" strokeWidth="2" strokeLinecap="round" />
//                         </svg>
//                     </div>
//                     <div className="h-3 w-4">
//                         <svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                                 d="M0 0.5C0 0.223858 0.223858 0 0.5 0H15.5C15.7761 0 16 0.223858 16 0.5V11.5C16 11.7761 15.7761 12 15.5 12H0.5C0.223858 12 0 11.7761 0 11.5V0.5Z"
//                                 fill="black"
//                             />
//                             <path
//                                 d="M2 2.5C2 2.22386 2.22386 2 2.5 2H13.5C13.7761 2 14 2.22386 14 2.5V9.5C14 9.77614 13.7761 10 13.5 10H2.5C2.22386 10 2 9.77614 2 9.5V2.5Z"
//                                 fill="white"
//                             />
//                         </svg>
//                     </div>
//                 </div>
//             </div>

//             {/* Header */}
//             <div className="flex justify-between items-center p-4 bg-white">
//                 <Menu className="w-6 h-6 text-black" />
//                 <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center">
//                         <div className="w-4 h-4 rounded-full border-2 border-white"></div>
//                     </div>
//                     <span className="text-[#2563eb] font-bold text-xl">OptiCheck</span>
//                 </div>
//                 <Bell className="w-6 h-6 text-black" />
//             </div>

//             {/* Notifications Header */}
//             <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-[#f9f9f9]">
//                 <div className="flex items-center gap-2">
//                     <ArrowLeft className="w-6 h-6 text-black" />
//                     <h1 className="text-2xl font-bold text-black">Notifications</h1>
//                 </div>
//                 <button onClick={markAllRead} className="text-[#c73538] font-medium">
//                     Mark All Read
//                 </button>
//             </div>

//             {/* Notifications List */}
//             <div className="flex-1 bg-[#ebebf5] overflow-y-auto">
//                 {notifications.map((notification) => (
//                     <div key={notification.id} className="flex gap-4 p-4 border-b border-gray-200 bg-white">
//                         <div className="mt-1">
//                             {notification.icon === "flame" && (
//                                 <div className="w-10 h-10 rounded-full bg-[#ff9500]/10 flex items-center justify-center">
//                                     <Flame className="w-6 h-6 text-[#ff9500]" />
//                                 </div>
//                             )}
//                             {notification.icon === "clock" && (
//                                 <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center">
//                                     <Clock className="w-6 h-6 text-[#2563eb]" />
//                                 </div>
//                             )}
//                             {notification.icon === "check" && (
//                                 <div className="w-10 h-10 rounded-full bg-[#34c759]/10 flex items-center justify-center">
//                                     <CheckCircle className="w-6 h-6 text-[#34c759]" />
//                                 </div>
//                             )}
//                         </div>
//                         <div className="flex-1">
//                             <div className="flex justify-between items-start">
//                                 <h3 className="font-bold text-black">{notification.title}</h3>
//                                 <span className="text-[#637587] text-sm">{notification.time}</span>
//                             </div>
//                             <p className="text-[#637587] mt-1">{notification.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Bottom Bar Indicator */}
//             <div className="flex justify-center p-2 bg-white">
//                 <div className="w-32 h-1 bg-[#d9d9d9] rounded-full"></div>
//             </div>
//         </div>
//     )
// }


"use client"

import { useState } from "react"
import { ArrowLeft, Menu, Settings, BellOff } from "lucide-react"
import { Button } from "../UI/ux/button"
import { NavFrame } from "../UI/Dashboard/Sections/Frame/NavFrame"


export default function Component() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    return (
        <div className="max-w-sm mx-auto bg-[#f9f9f9] min-h-screen flex flex-col">
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

            {/* Navigation Header */}
            <div className="flex items-center gap-[5rem] px-3 py-4">
                <Button variant="ghost" size="icon" className="p-0 h-8 w-8" onClick={() => window.history.back()}>
                    <ArrowLeft className="h-6 w-6 text-[#1d1d1d]" />
                </Button>
                <h1 className="text-[#1d1d1d] text-xl font-semibold">Notifications</h1>
            </div>

            {/* Empty State Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
                {/* Empty State Illustration */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 bg-[#dee9ff] rounded-full opacity-60"></div>
                    <div className="absolute top-4 left-4 w-24 h-24 bg-[#ebebf5] rounded-full opacity-80"></div>
                    <div className="absolute top-8 left-8 w-16 h-16 bg-[#418df9] rounded-full flex items-center justify-center">
                        <BellOff className="h-8 w-8 text-white" />
                    </div>
                </div>

                {/* Empty State Text */}
                <div className="text-center space-y-3">
                    <h2 className="text-[#1d1d1d] text-xl font-semibold">You don't have any notifications</h2>
                    <p className="text-[#353535] text-base leading-relaxed max-w-xs">
                        When you receive a notification, it will appear here
                    </p>
                </div>
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center pb-2">
                <div className="w-32 h-1 bg-[#1d1d1d] rounded-full"></div>
            </div>
        </div>
    )
}

