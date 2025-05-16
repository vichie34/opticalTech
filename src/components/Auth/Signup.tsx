"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../../lib/utils";
import { useNavigate, Link } from "react-router-dom";
// import EthereumProvider from "@walletconnect/ethereum-provider"; //version2
import WalletConnectProvider from "@walletconnect/web3-provider";  //version1
import Web3 from "web3";
import axios from "axios";
import { toast } from 'sonner';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignup = async () => {
        setLoading(true);
        try {
            const response = await api.post("/api/v1/auth/register", { email, password });
            const token = response.data.token;
            const refresh_token = response.data.refresh_token;
            console.log("Token:", token);
            console.log("Refresh Token:", refresh_token);
            console.log("Response Data:", response.data);

            localStorage.setItem("token", token);
            localStorage.setItem("refresh_token", refresh_token);

            toast.success("Signup successful! Sign in to continue.");
            navigate("/signin", { state: { refresh_token } });
        } catch (err: any) {
            toast.error(
                err.response?.data?.message ||
                "Signup failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleWalletSignup = async () => {
        setLoading(true);
        try {
            const infuraId = import.meta.env.VITE_INFURA_ID;
            // console.log("Infura ID:", infuraId); // Confirm it's not undefined

            if (!infuraId) {
                throw new Error("Missing Infura ID in environment variables.");
            }

            const provider = new WalletConnectProvider({
                infuraId,
            });



            await provider.enable();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const walletAddress = accounts[0];

            await api.post("/api/v1/auth/wallet-login", { walletAddress });

            if (!accounts[0]) {
                toast.error("No wallet address found. Please connect your wallet.");
                return;
            }

            const walletName = "DefaultWalletName";
            const walletResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/wallet-login`, {
                walletAddress: accounts[0],
                walletName,
            });

            const { token } = walletResponse.data;
            localStorage.setItem("token", token);
            navigate("/walletconnected");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(
                    axios.isAxiosError(err)
                        ? err.response?.data?.message || "Failed to connect wallet. Redirecting to fallback..."
                        : "An unexpected error occurred. Please try again."
                );


                navigate("/sign_in_with_wallet");
            } else {
                toast.error(
                    axios.isAxiosError(err)
                        ? err.response?.data?.message || "Failed to connect wallet. Redirecting to fallback..."
                        : "An unexpected error occurred. Please try again."
                );

            }
        } finally {
        }
    };

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh-access-token`, {}, {
                    withCredentials: true,
                });
                const { token } = response.data;
                localStorage.setItem("token", token);
                console.log("Token refreshed successfully.");
            } catch (err) {
                console.error("Token refresh failed:", err);
                // setError("Session expired. Please log in again.");
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
                >
                    <img src="/assets/Vector.png" alt="" />
                    <span className="text-lg font-medium">Sign up with Wallet</span>
                </button>

                <div className="flex items-center justify-center mb-6">
                    <span className="text-[#6b7280] text-sm font-medium">OR SIGN UP WITH YOUR EMAIL</span>
                </div>

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

                <button
                    className="w-full bg-[#3b99fc] text-white rounded-full py-4 px-6 text-lg font-medium mb-8"
                    onClick={handleSignup}
                    disabled={loading}
                    type="button"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>

                <div className="text-center mb-8">
                    <span className="text-[#1d1d1d]">Already have an account? </span>
                    <Link to="/signin" className="text-[#3b99fc] font-medium">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;

