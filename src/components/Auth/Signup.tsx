"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import axios from "axios";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignup = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await api.post("/api/v1/auth/register", { email, password });
            const { token } = response.data;
            localStorage.setItem("token", token); // Store token for future requests
            console.log("Signup successful:", response.data);
            navigate("/signin");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Signup failed. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
            console.error("Signup error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleWalletSignup = async () => {
        setLoading(true);
        setError("");
        try {
            const provider = new WalletConnectProvider({
                infuraId: import.meta.env.VITE_REACT_APP_INFURA_ID,
                bridge: "https://bridge.walletconnect.org",
            });

            await provider.enable();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const walletAddress = accounts[0];

            const response = await api.post("/api/v1/auth/wallet-login", { walletAddress });

            if (!accounts[0]) {
                setError("No wallet address found. Please connect your wallet.");
                return;
            }

            // Send wallet address to the backend for authentication
            const walletName = "DefaultWalletName"; // Replace with actual logic to determine wallet name
            const walletResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/wallet-login`, {
                walletAddress: accounts[0],
                walletName,
            });

            const { token } = walletResponse.data;
            localStorage.setItem("token", token); // Store token for future requests
            navigate("/walletconnected");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to connect wallet. Redirecting to fallback...");
                console.error("WalletConnect error:", err);

                // Redirect to fallback route
                navigate("/sign_in_with_wallet");
            } else {
                setError("An unexpected error occurred. Please try again.");
                console.error("Unexpected error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    // Token Refresh Logic
    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh-access-token`, {}, {
                    withCredentials: true, // Ensure cookies are sent
                });
                const { token } = response.data;
                localStorage.setItem("token", token); // Update token in localStorage
                console.log("Token refreshed successfully.");
            } catch (err) {
                console.error("Token refresh failed:", err);
                setError("Session expired. Please log in again.");
                navigate("/signin");
            }
        };

        // Refresh token every 15 minutes
        const interval = setInterval(refreshToken, 15 * 60 * 1000);
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9] px-6 py-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-16">
                <img src="/assets/Frame.png" alt="" />
                <span className="text-[#3b99fc] text-2xl font-semibold">OptiCheck</span>
            </div>

            {/* Signup Form */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#1d1d1d] mb-1">Sign up for OptiCheck</h1>
                <p className="text-[#6b7280] text-lg mb-8">Create your account</p>

                {/* Wallet Signup Button */}
                <button
                    className="w-full bg-[#02153e] text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 mb-6"
                    onClick={handleWalletSignup}
                >
                    <img src="/assets/Vector.png" alt="" />
                    <span className="text-lg font-medium">Sign up with Wallet</span>
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center mb-6">
                    <span className="text-[#6b7280] text-sm font-medium">OR SIGN UP WITH YOUR EMAIL</span>
                </div>

                {/* Email Input */}
                <div className="mb-6">
                    {error && <p className="text-red-500">{error}</p>}

                    <label htmlFor="email" className="block text-[#1d1d1d] text-xl mb-2">
                        Email
                    </label>
                    <input
                        required
                        type="email"
                        id="email"
                        placeholder="Type your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-4 border border-[#d9d9d9] rounded-full text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-2">
                    <label htmlFor="password" className="block text-[#1d1d1d] text-xl mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Choose password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 border border-[#d9d9d9] rounded-full text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]"
                        />
                        <button
                            className="absolute right-6 top-1/2 transform -translate-y-1/2"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-[#6b7280]" />
                            ) : (
                                <Eye className="h-5 w-5 text-[#6b7280]" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Signup Button */}
                <button
                    className="w-full bg-[#3b99fc] text-white rounded-full py-4 px-6 text-lg font-medium mb-8"
                    onClick={handleSignup}
                    disabled={loading}
                    type="button"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>

                {/* Sign In Link */}
                <div className="text-center mb-8">
                    <span className="text-[#1d1d1d]">Already have an account? </span>
                    <a href="/signin" className="text-[#3b99fc] font-medium">
                        Sign in
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Signup;
