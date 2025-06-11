// import { ArrowLeft, Menu, Bell, Eye } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export default function Component() {
//     return (
//         <div className="max-w-sm mx-auto bg-[#f9f9f9] min-h-screen">
//             {/* Status Bar */}
//             <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[#1d1d1d]">
//                 <div className="text-lg font-semibold">9:41</div>
//                 <div className="flex items-center gap-1">
//                     <div className="flex gap-1">
//                         <div className="w-1 h-3 bg-[#1d1d1d] rounded-full"></div>
//                         <div className="w-1 h-3 bg-[#1d1d1d] rounded-full"></div>
//                         <div className="w-1 h-3 bg-[#1d1d1d] rounded-full"></div>
//                         <div className="w-1 h-3 bg-[#d9d9d9] rounded-full"></div>
//                     </div>
//                     <div className="ml-1">
//                         <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
//                             <path
//                                 d="M1 5.5C1 5.5 3.5 1 7.5 1S14 5.5 14 5.5s-2.5 4.5-6.5 4.5S1 5.5 1 5.5z"
//                                 stroke="#1d1d1d"
//                                 strokeWidth="1.5"
//                                 fill="none"
//                             />
//                             <path d="M1 5.5h13" stroke="#1d1d1d" strokeWidth="1.5" />
//                         </svg>
//                     </div>
//                     <div className="w-6 h-3 bg-[#1d1d1d] rounded-sm ml-1">
//                         <div className="w-full h-full bg-[#34c759] rounded-sm"></div>
//                     </div>
//                 </div>
//             </div>

//             {/* Header */}
//             <div className="flex items-center justify-between px-6 py-4">
//                 <Button variant="ghost" size="icon" className="p-0 h-8 w-8">
//                     <Menu className="h-6 w-6 text-[#1d1d1d]" />
//                 </Button>

//                 <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center">
//                         <Eye className="h-5 w-5 text-white" />
//                     </div>
//                     <span className="text-[#2563eb] text-xl font-semibold">OptiCheck</span>
//                 </div>

//                 <Button variant="ghost" size="icon" className="p-0 h-8 w-8">
//                     <Bell className="h-6 w-6 text-[#1d1d1d]" />
//                 </Button>
//             </div>

//             {/* History Header */}
//             <div className="flex items-center px-6 py-4">
//                 <Button variant="ghost" size="icon" className="p-0 h-8 w-8 mr-4">
//                     <ArrowLeft className="h-6 w-6 text-[#1d1d1d]" />
//                 </Button>
//                 <h1 className="text-2xl font-semibold text-[#1d1d1d]">History</h1>
//             </div>

//             {/* Empty State Content */}
//             <div className="flex flex-col items-center justify-center px-6 mt-16">
//                 {/* Illustration */}
//                 <div className="relative mb-12">
//                     <div className="w-32 h-32 bg-[#dee9ff] rounded-full flex items-center justify-center">
//                         <div className="relative">
//                             {/* Chat bubble 1 */}
//                             <div className="w-16 h-12 bg-[#2563eb] rounded-2xl rounded-bl-sm relative">
//                                 <div className="absolute top-3 left-3 w-8 h-1 bg-white rounded-full"></div>
//                                 <div className="absolute top-5 left-3 w-6 h-1 bg-white rounded-full"></div>
//                             </div>
//                             {/* Chat bubble 2 */}
//                             <div className="w-14 h-10 bg-[#418df9] rounded-2xl rounded-br-sm absolute -bottom-2 -right-2">
//                                 <div className="absolute top-2.5 left-2.5 w-6 h-1 bg-white rounded-full"></div>
//                                 <div className="absolute top-4 left-2.5 w-4 h-1 bg-white rounded-full"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Text Content */}
//                 <div className="text-center mb-16">
//                     <h2 className="text-2xl font-semibold text-[#1d1d1d] mb-3">You don't have any history</h2>
//                     <p className="text-[#353535] text-base leading-relaxed">When you take a test, it will appear here</p>
//                 </div>

//                 {/* Start Test Button */}
//                 <div className="w-full px-6 fixed bottom-8 left-0 right-0 max-w-sm mx-auto">
//                     <Button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-4 rounded-2xl text-lg font-medium">
//                         Start a Test
//                     </Button>
//                 </div>
//             </div>

//             {/* Home Indicator */}
//             <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
//                 <div className="w-32 h-1 bg-[#1d1d1d] rounded-full"></div>
//             </div>
//         </div>
//     )
// }


import { useState } from "react";
import { Settings, ChevronLeft, Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { NavFrame } from "../UI/Dashboard/Sections/Frame/NavFrame"

export default function History() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    return (
        <div className="max-w-md mx-auto bg-[#f9f9f9] min-h-screen flex flex-col">
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

            {/* Back Navigation */}
            <div className="flex items-center gap-2 px-4 py-3">
                <Link to="#" className="p-1">
                    <ChevronLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-2xl font-bold">History</h1>
            </div>

            {/* Test History List */}
            <div className="px-4 py-2 flex flex-col gap-4">
                {/* Test 1 */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Full vision test</h2>
                            <p className="text-gray-500">May 5, 2025</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-[#eafdf3] text-[#34c759] font-semibold">20/25</div>
                    </div>
                </div>

                {/* Test 2 */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Color Blindness test</h2>
                            <p className="text-gray-500">May 1, 2025</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-[#eafdf3] text-[#34c759] font-semibold">Normal</div>
                    </div>
                </div>

                {/* Test 3 */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Full Vision test</h2>
                            <p className="text-gray-500">April 12, 2025</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-[#eafdf3] text-[#34c759] font-semibold">20/25</div>
                    </div>
                </div>

                {/* Test 4 */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Color Blindness test</h2>
                            <p className="text-gray-500">May 1, 2025</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-[#eafdf3] text-[#34c759] font-semibold">Normal</div>
                    </div>
                </div>

                {/* Test 5 */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Full vision test</h2>
                            <p className="text-gray-500">May 5, 2025</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-[#fdeaea] text-[#c73538] font-semibold">20/30</div>
                    </div>
                </div>

                {/* Test 6 */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Color Blindness test</h2>
                            <p className="text-gray-500">May 1, 2025</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-[#eafdf3] text-[#34c759] font-semibold">Normal</div>
                    </div>
                </div>
            </div>

            {/* Bottom Home Indicator */}
            <div className="mt-auto flex justify-center py-2">
                <div className="w-32 h-1 bg-black rounded-full"></div>
            </div>
        </div>
    )
}
