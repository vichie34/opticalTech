import { X } from 'lucide-react'
import { Link } from "react-router-dom";

export default function Loader() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9] text-[#1d1d1d] relative">
            {/* OptiCheck Logo and Header */}
            <div className="flex items-center gap-2 p-4 mt-4">
                <div className="w-10 h-10 bg-[#3b99fc] rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="white" />
                        <circle cx="12" cy="12" r="4" fill="white" />
                    </svg>
                </div>
                <span className="text-[#3b99fc] text-2xl font-bold">OptiCheck</span>
            </div>

            {/* Sign up heading */}
            <div className="p-4 mt-8">
                <h1 className="text-3xl font-bold text-[#1d1d1d]">Sign up to OptiCheck</h1>
            </div>

            {/* WalletConnect Modal */}
            <div className="mt-8 flex-1 flex flex-col">
                {/* WalletConnect Header */}
                <div className="bg-[#02153e] p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12C6 12 10 8 12 8C14 8 18 12 18 12C18 12 14 16 12 16C10 16 6 12 6 12Z" stroke="#ffd60a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#ffd60a] text-xl font-medium">WalletConnect</span>
                    </div>
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <X size={16} className="text-[#02153e]" />
                    </button>
                </div>

                {/* Wallet Options */}
                <div className="bg-white rounded-3xl mx-4 -mt-4 p-4 shadow-lg">
                    {/* First Row */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#ffd60a] rounded-xl flex items-center justify-center">
                                <span className="text-[#02153e] text-2xl font-bold">S</span>
                            </div>
                            <span className="text-xs mt-1 text-center">Solflare</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#0f0f0f] rounded-xl flex items-center justify-center">
                                <span className="text-[#f0b90b] text-2xl font-bold">B</span>
                            </div>
                            <span className="text-xs mt-1 text-center">Binance</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#7c3fed] rounded-xl flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">S</span>
                            </div>
                            <span className="text-xs mt-1 text-center">SafePal</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#297ff9] rounded-xl flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">TP</span>
                            </div>
                            <span className="text-xs mt-1 text-center">TokenPoc...</span>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
                                <img
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="Metamask"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <span className="text-xs mt-1 text-center">Metamask</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#3b99fc] to-[#0500ff] rounded-xl flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">T</span>
                            </div>
                            <span className="text-xs mt-1 text-center">Trust</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
                                <span className="text-[#02153e] text-2xl font-bold">B</span>
                            </div>
                            <span className="text-xs mt-1 text-center">Bitget</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#0f0f0f] rounded-xl flex items-center justify-center">
                                <div className="w-8 h-8 grid grid-cols-2 gap-0.5">
                                    <div className="bg-white"></div>
                                    <div className="bg-white"></div>
                                    <div className="bg-white"></div>
                                    <div className="bg-white"></div>
                                </div>
                            </div>
                            <span className="text-xs mt-1 text-center">OKX</span>
                        </div>
                    </div>

                    {/* View All Button */}
                    <Link to="#" className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-[#1d1d1d] font-medium">View all Wallet</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#1d1d1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>

                    {/* Instruction Text */}
                    <p className="text-sm text-[#6b7280] text-center px-4">
                        If you don't have a wallet, you can select a provider by clicking on any of the icons above and create one now.
                    </p>
                </div>
            </div>
        </div>
    )
}
