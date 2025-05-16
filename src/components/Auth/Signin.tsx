/// <reference types="vite/client" />

"use client";

// Extend the Window interface to include the `ethereum` property
declare global {
    interface Window {
        ethereum?: {
            isMetaMask?: boolean; // Optional: Check if MetaMask is installed
            request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
            on?: (event: string, callback: (...args: unknown[]) => void) => void;
        };
    }
}

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import api from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { EthereumProvider } from "@walletconnect/ethereum-provider"
// import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
// import axios from "axios";
import { toast } from 'sonner';

function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [blockNumber, setblockNumber] = useState<string>("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSignin = async () => {
        setLoading(true);
        // setError("");
        try {
            const response = await api.post("/api/v1/auth/login", { email, password });
            // Use the correct keys as returned by the API
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refresh_token", refreshToken);

            // Pass refreshToken to dashboard via navigation state
            navigate("/dashboard", { state: { refresh_token: refreshToken } });
        } catch (err: any) {
            toast.error(
                err.response?.data?.message ||
                "Signin failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleWalletConnect = async () => {
        try {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            const provider = await EthereumProvider.init({
                projectId: import.meta.env.VITE_PROJECT_ID,
                chains: [1], // Replace with your chain ID
                showQrModal: !isMobile, // only show QR code on desktop
                rpcMap: {
                    1: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`,
                },
                methods: ['eth_requestAccounts', 'personal_sign', 'eth_sendTransaction'],
                metadata: {
                    name: "OptiCheck",
                    description: "Login with WalletConnect",
                    url: "https://opticheck.netlify.app",
                    icons: ["https://opticheck.netlify.app/assets/Frame.png"],
                },
            });

            // For mobile users, redirect to wallet app
            if (isMobile) {
                // This triggers the deep link to the wallet (like MetaMask or Trust Wallet)
                await provider.connect();
            } else {
                // For desktop users, this will show the QR modal automatically
                await provider.enable();
            }


            await provider.enable(); // triggers modal and wallet selection

            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();

            if (!accounts || accounts.length === 0) {
                toast.error("No accounts found. Please ensure your wallet is connected.");
                return;
            }

            const walletAddress = accounts[0];
            console.log("Connected wallet:", walletAddress);

            // Step 1: Authenticate with backend
            const authResponse = await api.post("/api/v1/auth/login", { walletAddress });
            const { token } = authResponse.data;
            localStorage.setItem("token", token);
            console.log("Wallet login successful.");

            // Step 2: Fetch block number from backend
            const rpcResponse = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/rpc`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    method: "eth_blockNumber",
                    params: [],
                    id: 1
                })
            });

            if (!rpcResponse.ok) {
                toast.error("Failed to fetch block number. Please try again.");
                return;
            }

            const json = await rpcResponse.json();
            const latestBlock = parseInt(json.result, 16);
            setblockNumber(latestBlock.toString());
            console.log("Latest block number:", latestBlock);

            // Navigate to dashboard
            navigate("/dashboard");

        } catch (err) {
            if (err instanceof Error && err.message.includes("User closed modal")) {
                toast.error("Wallet connection was canceled. Please try again.");
            } else {
                toast.error("An error occurred while connecting to the wallet.");
            }
            console.error("WalletConnect error:", err);
        }
    };


    useEffect(() => {
        if (blockNumber) {
            // Do something with the blockNumber, now that it has a value
            console.log("Block number changed:", blockNumber);
        }
    }, [blockNumber]);


    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9] px-6 py-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-16">
                <img src="/assets/Frame.png" alt="" />
                <span className="text-[#3b99fc] text-2xl font-semibold">OptiCheck</span>
            </div>

            {/* Login Form */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#1d1d1d mb-1">Log in to Opticheck</h1>
                <p className="text-[#6b7280] text-lg mb-8">Welcome back</p>

                {/* Wallet Login Button */}
                <button
                    className="w-full bg-[#02153e] text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 mb-6"
                    onClick={handleWalletConnect}
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
                    {/* {error && <p className="text-red-500">{error}</p>} */}

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
                    <Link to="/signup" className="text-[#3b99fc] font-medium">
                        Sign up
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default Signin;

