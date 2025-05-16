import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider"; // Detect wallets like MetaMask
import axios from "axios";

interface Wallet {
    name: string;
    bgColor: string;
    textColor: string;
    icon?: string;
}

export default function SignUpWallet() {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [availableWallets, setAvailableWallets] = useState<string[]>([]); // Store detected wallets
    const navigate = useNavigate();

    // Detect available wallets on the user's phone
    useEffect(() => {
        const detectWallets = async () => {
            try {
                const provider = await detectEthereumProvider();
                if (provider) {
                    setAvailableWallets(["MetaMask"]); // Add MetaMask if detected
                } else {
                    setAvailableWallets([]); // No wallets detected
                }
            } catch (err) {
                console.error("Error detecting wallets:", err);
                setError("Failed to detect wallets. Please try again.");
            }
        };

        detectWallets();
    }, []);

    // Fetch wallet options dynamically
    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/available-wallets`);
                const walletsData = response.data.wallets || [];
                setWallets(walletsData);
            } catch (err) {
                console.error("Error fetching wallets:", err);
                setError("Failed to load wallet options. Please try again later.");
            }
        };

        fetchWallets();
    }, []);

    // Handle WalletConnect
    const handleWalletConnect = async (walletName: string) => {
        setError("");
        setSuccess("");

        try {
            const provider = new WalletConnectProvider({
                infuraId: import.meta.env.VITE_REACT_APP_INFURA_ID, // Use environment variable for Infura ID
            });

            await provider.enable();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();

            if (!accounts[0]) {
                setError("No wallet address found. Please connect your wallet.");
                return;
            }

            // Send wallet address to the backend for authentication
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/wallet-login`, {
                walletAddress: accounts[0],
                walletName,
            });

            const { token } = response.data;
            localStorage.setItem("token", token); // Store token for future requests
            setSuccess("Wallet connected successfully!");

            // Redirect to WalletConnected page
            navigate("/walletconnected");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to connect wallet. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
            console.error("WalletConnect error:", err);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9]">
            {/* Logo */}
            <div className="flex items-center gap-2 px-8 mt-6">
                <img src="/assets/Frame.png" alt="" />
                <span className="text-[#3b99fc] text-2xl font-semibold">OptiCheck</span>
            </div>

            {/* Sign Up Heading */}
            <h1 className="text-3xl font-bold px-8 mt-24 text-[#1d1d1d]">Sign up to OptiCheck</h1>

            {/* WalletConnect Section */}
            <div className="mt-8 w-full">
                {/* Blue Header */}
                <div className="bg-[#3b99fc] py-4 px-8 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src="/assets/Vector (1).png" alt="" />
                        <span className="text-white text-xl font-semibold">WalletConnect</span>
                    </div>
                    <button className="text-white" aria-label="Close WalletConnect">
                        <X size={24} />
                    </button>
                </div>

                {/* Wallet Options */}
                <div className="bg-[#ebebf5] rounded-b-3xl p-6">
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                    {/* Detected Wallets */}
                    {availableWallets.length > 0 ? (
                        <div className="mb-6">
                            <h2 className="text-lg font-medium text-center mb-4">Detected Wallets</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {availableWallets.map((wallet) => (
                                    <div
                                        key={wallet}
                                        className="flex flex-col items-center cursor-pointer"
                                        onClick={() => handleWalletConnect(wallet)}
                                        aria-label={`Connect to ${wallet}`}
                                    >
                                        <div className="w-16 h-16 bg-blue-500 border border-gray-200 rounded-xl flex items-center justify-center">
                                            <span className="text-white text-lg font-bold">{wallet[0]}</span>
                                        </div>
                                        <span className="text-xs mt-1 text-center">{wallet}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mb-6">No wallets detected on your device.</p>
                    )}

                    {/* All Wallet Options */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {wallets.map((wallet) => (
                            <div
                                key={wallet.name}
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => handleWalletConnect(wallet.name)}
                                aria-label={`Connect to ${wallet.name}`}
                            >
                                <div
                                    className={`w-16 h-16 ${wallet.bgColor} border border-gray-200 rounded-xl flex items-center justify-center`}
                                >
                                    {wallet.icon ? (
                                        <img src={wallet.icon} alt={`${wallet.name} Wallet Icon`} width={40} height={40} />
                                    ) : (
                                        <span className={`text-2xl font-bold ${wallet.textColor}`}>{wallet.name[0]}</span>
                                    )}
                                </div>
                                <span className="text-xs mt-1 text-center">{wallet.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <Link to="/wallets" className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-[#1d1d1d] text-lg font-medium">View all Wallet</span>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 4L16 10L10 16M4 10H16"
                                stroke="#1d1d1d"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>

                    {/* Instruction Text */}
                    <p className="text-[#637587] text-center px-4">
                        If you don't have a wallet, you can select a provider by clicking on any of the icons above and create one
                        now.
                    </p>
                </div>
            </div>
        </div>
    );
}