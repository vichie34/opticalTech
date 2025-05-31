"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../../lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import Web3 from "web3";
import { toast } from 'sonner';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // Track the current step
    const [first_name, setName] = useState("");
    const [age, setAge] = useState("");


    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSignup = async () => {
        setLoading(true);
        try {
            const res = await api.post("/api/v1/auth/register", { email, password, first_name, age });
            const data = res.data.data
            //const { token, refresh_token } = res.data;

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

            toast.success("Signup successful! Please sign in.");
            navigate("/signin");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleWalletSignup = async () => {
        setLoading(true);
        try {
            const provider = await EthereumProvider.init({
                projectId: import.meta.env.VITE_PROJECT_ID,
                chains: [1],
                showQrModal: true, // Always show the QR modal
                rpcMap: {
                    1: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`,
                },
                methods: ['eth_requestAccounts', 'personal_sign', 'eth_sendTransaction'],
                metadata: {
                    name: "OptiCheck",
                    description: "Sign up with WalletConnect",
                    url: "https://opticheck.netlify.app",
                    icons: ["https://opticheck.netlify.app/assets/Frame.png"],
                },
            });

            await provider.connect(); // Always connect regardless of device

            const web3 = new Web3(provider as any);
            const accounts = await web3.eth.getAccounts();

            if (!accounts || accounts.length === 0) {
                toast.error("No wallet account found.");
                return;
            }

            const walletAddress = accounts[0];
            const walletName = "DefaultWalletName"; // optional

            const { data } = await api.post("/api/v1/auth/wallet-login", {
                walletAddress,
                walletName,
            });

            localStorage.setItem("token", data.token);
            toast.success("Wallet signup successful!");
            navigate("/walletconnected");
        } catch (err: any) {
            if (err?.message?.includes("User closed modal")) {
                toast.error("Wallet connection canceled.");
            } else {
                toast.error("Wallet signup failed. Redirecting...");
                navigate("/sign_in_with_wallet");
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const refreshToken = async () => {
            try {
                const { data } = await api.post("/api/v1/auth/refresh-access-token");
                localStorage.setItem("token", data.token);
            } catch {
                toast.error("Session expired. Please log in again.");
                navigate("/signin");
            }
        };

        const interval = setInterval(refreshToken, 15 * 60 * 1000);
        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9] px-6 py-8">
            <div className="flex items-center gap-2 mb-16">
                <img src="/assets/Frame.png" alt="" />
                <span className="text-[#3b99fc] text-2xl font-semibold">OptiCheck</span>
            </div>

            <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#1d1d1d] mb-1">Sign up for OptiCheck</h1>
                <p className="text-[#6b7280] text-lg mb-8">Create your account</p>

                <button
                    className="w-full bg-[#02153e] text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 mb-6"
                    onClick={handleWalletSignup}
                    disabled={loading}
                >
                    <img src="/assets/Vector.png" alt="wallet icon" />
                    <span className="text-lg font-medium">Sign up with Wallet</span>
                </button>

                <div className="flex items-center justify-center mb-6">
                    <span className="text-[#6b7280] text-sm font-medium">OR SIGN UP WITH YOUR EMAIL</span>
                </div>

                {step === 1 ? (
                    <>
                        <div className="mb-6">
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

                        <div className="mb-6">
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

                        <button
                            className="w-full bg-[#3b99fc] text-white rounded-full py-4 px-6 text-lg font-medium mb-8"
                            onClick={() => setStep(2)} // move to step 2
                            type="button"
                        >
                            Next
                        </button>
                    </>
                ) : (
                    <>
                        <div className="mb-6">
                            <label htmlFor="first_name" className="block text-[#1d1d1d] text-xl mb-2">
                                First Name
                            </label>
                            <input
                                required
                                type="text"
                                id="first_name"
                                placeholder="Enter your first name"
                                value={first_name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-6 py-4 border border-[#d9d9d9] rounded-full text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="age" className="block text-[#1d1d1d] text-xl mb-2">
                                Age
                            </label>
                            <input
                                required
                                type="number"
                                id="age"
                                placeholder="Enter your age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-6 py-4 border border-[#d9d9d9] rounded-full text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]"
                            />
                        </div>

                        <div className="flex justify-between gap-4">
                            <button
                                className="w-1/2 border border-[#3b99fc] text-[#3b99fc] rounded-full py-4 text-lg font-medium"
                                onClick={() => setStep(1)}
                                type="button"
                            >
                                Back
                            </button>

                            <button
                                className="w-1/2 bg-[#3b99fc] text-white rounded-full py-4 text-lg font-medium"
                                onClick={handleSignup}
                                disabled={loading}
                                type="button"
                            >
                                {loading ? "Signing up..." : "Sign Up"}
                            </button>
                        </div>
                    </>
                )}


                <div className="text-center m-4">
                    <span className="text-[#1d1d1d]">Already have an account? </span>
                    <Link to="/signin" className="text-[#3b99fc] font-medium">
                        Sign in
                    </Link>
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
        </div>
    );
}

export default Signup;