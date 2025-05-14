"use client";

// Extend the Window interface to include the `ethereum` property
declare global {
    interface Window {
        ethereum?: {
            isMetaMask?: boolean;
            request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
            on?: (event: string, callback: (...args: unknown[]) => void) => void;
        };
    }
}

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import api from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";

function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSignin = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await api.post('/api/v1/auth/login', { email, password });
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            console.log("Refresh token on login:", refreshToken);
            console.log('Signin successful:', response.data);
            navigate("/dashboard");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Signin failed. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
            console.error("Signin error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleWalletConnect = async () => {
        setLoading(true);
        setError("");
        try {
            // Check for Ethereum provider (MetaMask or any injected wallet)
            const ethereum = window.ethereum;
            if (!ethereum) {
                setError("No crypto wallet found. Please install MetaMask or another wallet extension to continue, or use email login.");
                setLoading(false);
                return;
            }

            await ethereum.request({ method: "eth_requestAccounts" });
            const web3 = new Web3(ethereum as any);
            const accounts = await web3.eth.getAccounts();

            if (!accounts[0]) {
                setError("No wallet address found. Please connect your wallet.");
                setLoading(false);
                return;
            }

            // Send wallet address to the backend for authentication
            const walletName = ethereum.isMetaMask ? "MetaMask" : "Wallet";
            const response = await api.post("api/v1/auth/login", { walletAddress: accounts[0], walletName });
            const { token } = response.data;
            localStorage.setItem("token", token);

            console.log("Wallet login successful:", response.data);
            navigate("/dashboard");
        } catch (err) {
            setError("Failed to connect wallet. Please try again or use email login.");
            console.error("Wallet connect error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9] px-6 py-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-16">
                <img src="/assets/Frame.png" alt="" />
                <span className="text-[#3b99fc] text-2xl font-semibold">OptiCheck</span>
            </div>

            {/* Login Form */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#1d1d1d] mb-1">Log in to Opticheck</h1>
                <p className="text-[#6b7280] text-lg mb-8">Welcome back</p>

                {/* Wallet Login Button */}
                <button
                    className="w-full bg-[#02153e] text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 mb-6"
                    onClick={handleWalletConnect}
                    type="button"
                    disabled={loading}
                >
                    <img src="/assets/Vector.png" alt="" />
                    <span className="text-lg font-medium">Login in with Wallet</span>
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center mb-6">
                    <span className="text-[#6b7280] text-sm font-medium">OR LOGIN WITH YOUR EMAIL</span>
                </div>

                {/* Email Input */}
                <div className="mb-6">
                    {error && <p className="text-red-500">{error}</p>}

                    <label htmlFor="email" className="block text-[#1d1d1d] text-xl mb-2">
                        Email
                    </label>
                    <input required
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
                        <input required
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
                            type="button"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-[#6b7280]" />
                            ) : (
                                <Eye className="h-5 w-5 text-[#6b7280]" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end mb-8">
                    <a href="api/v1/auth/change-password" className="text-[#1d1d1d]">
                        Forgot password?
                    </a>
                </div>

                {/* Login Button */}
                <button className="w-full bg-[#3b99fc] text-white rounded-full py-4 px-6 text-lg font-medium mb-8" onClick={handleSignin}
                    disabled={loading}
                    type="button">
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                {/* Sign Up Link */}
                <div className="text-center mb-8">
                    <span className="text-[#1d1d1d]">Don't have an account? </span>
                    <a href="/signup" className="text-[#3b99fc] font-medium">
                        Sign up
                    </a>
                </div>
            </div>
        </div >
    );
}

export default Signin;
