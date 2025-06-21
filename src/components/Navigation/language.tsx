"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
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
    const { t, i18n } = useTranslation()

    // Read from localStorage or default to English
    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem("selectedLanguage") || "English"
    )
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // List of languages and their i18n codes
    const languages = [
        { label: "English", code: "en" },
        { label: "Arabic", code: "ar" },
        { label: "Spanish", code: "es" },
        { label: "Chinese", code: "zh" },
        { label: "Portuguese", code: "pt" },
        { label: "Hindi", code: "hi" },
    ]

    // Update i18n and localStorage when language changes
    useEffect(() => {
        const langObj = languages.find((l) => l.label === selectedLanguage)
        if (langObj) {
            i18n.changeLanguage(langObj.code)
            localStorage.setItem("selectedLanguage", langObj.label)
        }
    }, [selectedLanguage])

    const toggleMenu = () => setIsMenuOpen((prev) => !prev)

    const handleLanguageClick = (language: string) => {
        setSelectedLanguage(language)
        if (onLanguageSelect) onLanguageSelect(language)
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
                        {t("chooseLanguage")}
                    </h1>
                </div>

                {/* Language list */}
                <div style={{ marginTop: "16px" }}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "16px 24px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: selectedLanguage === lang.label ? "#2563eb" : "#1d1d1d",
                                fontSize: "18px",
                                textAlign: "left",
                            }}
                            onClick={() => handleLanguageClick(lang.label)}
                        >
                            <span>{t(`languageNames.${lang.code}`, lang.label)}</span>
                            {selectedLanguage === lang.label && <CheckIcon />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
