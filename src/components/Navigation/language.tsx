// "use client"

// import { useState } from "react"
// import { ArrowLeft, Bell, Eye, Menu } from "lucide-react"
// import Link from "next/link"

// export default function LanguageSelection() {
//     const [selectedLanguage, setSelectedLanguage] = useState("English")

//     const languages = [
//         "English",
//         "English",
//         "Arabic",
//         "Spanish",
//         "Spanish",
//         "Chinese",
//         "Arabic",
//         "Portuguese",
//         "Portuguese",
//         "Hindi",
//     ]

//     return (
//         <div className="max-w-md mx-auto bg-[#f9f9f9] min-h-screen flex flex-col">
//             {/* Status Bar */}
//             <div className="flex justify-between items-center px-4 py-2 text-[#000000]">
//                 <div className="font-semibold">9:41</div>
//                 <div className="flex items-center gap-1">
//                     <div className="font-semibold">•••</div>
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                             d="M12 20.0001C15.866 20.0001 19 16.8661 19 13.0001C19 9.13407 15.866 6.00007 12 6.00007C8.13401 6.00007 5 9.13407 5 13.0001C5 16.8661 8.13401 20.0001 12 20.0001Z"
//                             stroke="black"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                         <path d="M12 6.00007V2.00007" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path
//                             d="M4.22 4.22007L6.34 6.34007"
//                             stroke="black"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                         <path d="M2 13.0001H6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path
//                             d="M4.22 21.7801L6.34 19.6601"
//                             stroke="black"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                         <path d="M12 24.0001V20.0001" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path
//                             d="M19.78 21.7801L17.66 19.6601"
//                             stroke="black"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                         <path d="M22 13.0001H18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path
//                             d="M19.78 4.22007L17.66 6.34007"
//                             stroke="black"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                     </svg>
//                     <div className="w-8 h-4 border-2 border-black rounded-sm relative">
//                         <div className="absolute top-0 left-0 right-0.5 bottom-0 bg-black m-0.5"></div>
//                     </div>
//                 </div>
//             </div>

//             {/* Header */}
//             <div className="flex justify-between items-center px-4 py-3">
//                 <button className="p-1">
//                     <Menu className="w-6 h-6 text-[#000000]" />
//                 </button>
//                 <div className="flex items-center gap-2">
//                     <div className="bg-[#2563eb] rounded-full p-1">
//                         <Eye className="w-5 h-5 text-white" />
//                     </div>
//                     <span className="text-[#2563eb] text-xl font-semibold">OptiCheck</span>
//                 </div>
//                 <button className="p-1">
//                     <Bell className="w-6 h-6 text-[#000000]" />
//                 </button>
//             </div>

//             {/* Content */}
//             <div className="flex-1 bg-[#ebebf5]">
//                 {/* Back button and title */}
//                 <div className="flex items-center gap-3 px-4 py-5">
//                     <Link href="#" className="p-1">
//                         <ArrowLeft className="w-6 h-6 text-[#000000]" />
//                     </Link>
//                     <h1 className="text-2xl font-medium text-[#1d1d1d]">Choose Language</h1>
//                 </div>

//                 {/* Language list */}
//                 <div className="mt-4">
//                     {languages.map((language, index) => (
//                         <button
//                             key={index}
//                             className={`w-full flex justify-between items-center px-6 py-4 ${index === 0 ? "text-[#2563eb]" : "text-[#1d1d1d]"
//                                 }`}
//                             onClick={() => setSelectedLanguage(language)}
//                         >
//                             <span className="text-lg">{language}</span>
//                             {index === 0 && (
//                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path
//                                         d="M20 6L9 17L4 12"
//                                         stroke="#2563eb"
//                                         strokeWidth="2"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                     />
//                                 </svg>
//                             )}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Home indicator */}
//             <div className="flex justify-center py-2">
//                 <div className="w-32 h-1 bg-[#353535] rounded-full"></div>
//             </div>
//         </div>
//     )
// }



"use client"

import { useState } from "react"
import { NavFrame } from "../UI/Dashboard/Sections/Frame/NavFrame"

// Icon components (you can replace these with your preferred icon library)
const ArrowLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const Bell = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13.73 21A2 2 0 0 1 10.27 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const Menu = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

interface LanguageSelectionProps {
    onLanguageSelect?: (language: string) => void
    onBack?: () => void
    onMenuClick?: () => void
    onNotificationClick?: () => void
}

export default function LanguageSelection({
    onLanguageSelect,
    onBack,
    onMenuClick,
    onNotificationClick,
}: LanguageSelectionProps) {
    const [selectedLanguage, setSelectedLanguage] = useState("English")

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const languages = [
        "English",
        "English",
        "Arabic",
        "Spanish",
        "Spanish",
        "Chinese",
        "Arabic",
        "Portuguese",
        "Portuguese",
        "Hindi",
    ]

    const handleLanguageClick = (language: string, index: number) => {
        setSelectedLanguage(language)
        if (onLanguageSelect) {
            onLanguageSelect(language)
        }
    }

    const handleBackClick = () => {
        if (onBack) {
            onBack()
        }
    }

    const handleMenuClick = () => {
        if (onMenuClick) {
            toggleMenu()
        }
    }

    const handleNotificationClick = () => {
        if (onNotificationClick) {
            onNotificationClick()
        }
    }

    return (
        <div
            style={{
                maxWidth: "448px",
                margin: "0 auto",
                backgroundColor: "#f9f9f9",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                fontFamily: "Arial, Helvetica, sans-serif",
            }}
        >

            {/* Header */}
            <header className="sticky top-0 z-10 w-full bg-white">
                <div className="flex flex-col w-full items-start">
                    <div className="flex h-11 items-center justify-between px-4 py-2.5 w-full">
                        <button
                            onClick={handleMenuClick}
                            style={{
                                padding: "4px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#000000",
                            }}
                        >
                            <Menu />
                        </button>
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
            <div style={{ flex: 1, backgroundColor: "#ebebf5" }}>
                {/* Back button and title */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "20px 16px",
                    }}
                >
                    <button
                        onClick={handleBackClick}
                        style={{
                            padding: "4px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#000000",
                        }}
                    >
                        <ArrowLeft />
                    </button>
                    <h1
                        style={{
                            fontSize: "24px",
                            fontWeight: "500",
                            color: "#1d1d1d",
                            margin: 0,
                        }}
                    >
                        Choose Language
                    </h1>
                </div>

                {/* Language list */}
                <div style={{ marginTop: "16px" }}>
                    {languages.map((language, index) => (
                        <button
                            key={index}
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "16px 24px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: index === 0 ? "#2563eb" : "#1d1d1d",
                                fontSize: "18px",
                                textAlign: "left",
                            }}
                            onClick={() => handleLanguageClick(language, index)}
                        >
                            <span>{language}</span>
                            {index === 0 && <CheckIcon />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
