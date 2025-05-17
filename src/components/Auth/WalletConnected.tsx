// import { useEffect } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WalletConnected() {
    const navigate = useNavigate();

    const handleContinue = () => {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
            alert("Refresh token missing. Please log in again.");
            navigate("/login");
            return;
        }

        // Navigate to dashboard and optionally pass token via navigation state
        navigate("/dashboard", { state: { refresh_token: refreshToken } });
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            {/* Top Header */}
            <div className="mt-8 text-center">
                <h1 className="text-2xl font-bold">Wallet Connected</h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
                {/* Wallet Icon with Check Badge */}
                <div className="relative">
                    <div className="w-36 h-36 rounded-full bg-[#2563eb] flex items-center justify-center">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 7V5C19 3.9 18.1 3 17 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H17C18.1 21 19 20.1 19 19V17M19 7H13C11.9 7 11 7.9 11 9V15C11 16.1 11.9 17 13 17H19C20.1 17 21 16.1 21 15V9C21 7.9 20.1 7 19 7ZM16 14C15.45 14 15 13.55 15 13C15 12.45 15.45 12 16 12C16.55 12 17 12.45 17 13C17 13.55 16.55 14 16 14Z"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className="absolute top-0 right-0 bg-[#34c759] rounded-full p-1.5">
                        <Check className="w-5 h-5 text-white" />
                    </div>
                </div>

                {/* Success Text */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Wallet Connected</h2>
                    <p className="text-2xl font-bold">Successfully</p>
                </div>
            </div>

            {/* Continue Button */}
            <div className="px-4 mb-12">
                <button
                    onClick={handleContinue}
                    className="block w-full bg-[#2563eb] text-white text-center py-4 rounded-full text-lg font-medium"
                >
                    Continue to dashboard
                </button>
            </div>
        </div>
    );
}
