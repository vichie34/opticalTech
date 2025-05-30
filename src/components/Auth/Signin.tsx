"use client";

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import api from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import Web3 from "web3";
import { toast } from 'sonner';

function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [blockNumber, setblockNumber] = useState<string>("");
    const [wcProvider, setWcProvider] = useState<any | null>(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    useEffect(() => {
        const initWalletConnect = async () => {
            try {
                // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

                const provider = await EthereumProvider.init({
                    projectId: import.meta.env.VITE_PROJECT_ID,
                    chains: [1],
                    showQrModal: true,
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

                setWcProvider(provider);
            } catch (err) {
                console.error("Failed to initialize WalletConnect:", err);
            }
        };

        initWalletConnect();
    }, []);

    const handleSignin = async () => {
        setLoading(true);
        try {
            const res = await api.post("/api/v1/auth/login", { email, password });
            const { token, refresh_token } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("refresh_token", refresh_token);

            toast.success("Signin successful!");
            // dashboard page
            navigate("/Onboarding");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Signin failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleWalletConnect = async () => {
        if (!wcProvider) {
            toast.error("WalletConnect is not ready yet. Please try again in a moment.");
            return;
        }

        setLoading(true);
        try {
            await wcProvider.connect();

            const web3 = new Web3(wcProvider as any);
            const accounts = await web3.eth.getAccounts();

            if (!accounts || accounts.length === 0) {
                toast.error("No wallet account found.");
                return;
            }

            const walletAddress = accounts[0];
            const { data } = await api.post("/api/v1/auth/wallet-login", { walletAddress });

            localStorage.setItem("token", data.token);
            toast.success("Wallet login successful!");

            // Fetch block number via backend proxy
            const rpcResponse = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/rpc`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
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

            navigate("/dashboard");
        } catch (err: any) {
            if (err?.message?.includes("User closed modal")) {
                toast.error("Wallet connection canceled.");
            } else {
                toast.error("Wallet login failed. Redirecting...");
                navigate("/sign_in_with_wallet");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (blockNumber) {
            console.log("Block number changed:", blockNumber);
        }
    }, [blockNumber]);

    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9] px-6 py-8">
            <div className="flex items-center gap-2 mb-16">
                <img src="/assets/Frame.png" alt="Logo" />
                <span className="text-[#3b99fc] text-2xl font-semibold">OptiCheck</span>
            </div>

            <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#1d1d1d] mb-1">Log in to OptiCheck</h1>
                <p className="text-[#6b7280] text-lg mb-8">Welcome back</p>

                <button
                    className="w-full bg-[#02153e] text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 mb-6 disabled:opacity-50"
                    onClick={handleWalletConnect}
                    disabled={loading}
                >
                    <img src="/assets/Vector.png" alt="Wallet Icon" />
                    <span className="text-lg font-medium">Login with Wallet</span>
                </button>

                <div className="flex items-center justify-center mb-6">
                    <span className="text-[#6b7280] text-sm font-medium">OR LOGIN WITH YOUR EMAIL</span>
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-[#1d1d1d] text-xl mb-2">Email</label>
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

                <div className="mb-2">
                    <label htmlFor="password" className="block text-[#1d1d1d] text-xl mb-2">Password</label>
                    <div className="relative">
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 border border-[#d9d9d9] rounded-full text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]"
                        />
                        <button
                            type="button"
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

                <div className="flex justify-end mb-8">
                    <Link to="/forgot-password" className="text-[#1d1d1d] font-medium">Forgot password?</Link>
                </div>
            </div>

            <button
                className="w-full bg-[#3b99fc] text-white rounded-full py-4 px-6 text-lg font-medium mb-8 disabled:opacity-50"
                onClick={handleSignin}
                disabled={loading}
                type="button"
            >
                {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center mb-8">
                <span className="text-[#1d1d1d]">Don't have an account? </span>
                <Link to="/signup" className="text-[#3b99fc] font-medium">Sign up</Link>
            </div>

            <div className="flex justify-center pb-6">
                <div className="flex gap-3 items-center">
                    <div className="">
                        <img src="/assets/token-branded_solana.svg" alt="" />
                    </div>
                    <div className="text-[#5B5B5B] text-lg">Powered by Solana</div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
