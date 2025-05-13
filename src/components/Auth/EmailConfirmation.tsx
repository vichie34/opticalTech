"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // For handling query parameters and navigation
import api from "../../lib/utils";

function EmailConfirmation() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams(); // Destructure the URLSearchParams object
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        // Check if a verification code is provided in the URL
        const queryCode = searchParams.get("code");
        if (queryCode) {
            setCode(queryCode);
            handleVerification(queryCode); // Automatically verify the code
        }
    }, [searchParams]);

    const handleVerification = async (verificationCode: string) => {
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            const response = await api.post("/auth/refresh-access-token", { code: verificationCode });
            console.log("Verification successful:", response.data);
            setSuccess(true);

            // Redirect to another page after successful verification
            setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
        } catch (err: any) {
            console.error("Verification error:", err);
            setError(err.response?.data?.message || "Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleVerification(code); // Verify the code entered by the user
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9]">
            <div className="flex flex-col px-8 pt-12 pb-8 flex-1">
                {/* App Logo */}
                <div className="px-8 pt-8 pb-16">
                    <div className="flex justify-start gap-2">
                        <img src="/assets/Frame.png" alt="OptiCheck Logo" />
                        <span className="text-[#2563eb] text-2xl font-semibold">OptiCheck</span>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full">
                    <h1 className="text-4xl font-bold text-[#1d1d1d] mb-4">Confirm Email</h1>
                    <p className="text-lg text-[#353535] mb-10">
                        A code has been sent to your email. Copy and paste it here or use the link provided.
                    </p>

                    {/* Error and Success Messages */}
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">Email verified successfully! Redirecting...</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="code" className="block text-lg font-medium text-[#1d1d1d] mb-2">
                                Enter Code
                            </label>
                            <input
                                required
                                id="code"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="e.g., 001246"
                                className="w-full h-14 px-4 text-lg rounded-full border border-[#b8b8b8] focus:border-[#2563eb] focus:ring-[#2563eb] focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                disabled={loading} // Disable input while loading
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full h-14 mt-6 bg-[#2563eb] hover:bg-[#2563eb]/90 text-white rounded-full text-lg font-medium transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? "Submitting..." : "Submit Code"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmailConfirmation;
