import { JSX, useEffect, useState } from "react";
import api from "../../../lib/utils";
import { NavFrame } from "./Sections/Frame/NavFrame";
import { Menu, Settings } from "lucide-react";
import PermissionModal from "./Sections/Modal/PermissionModal";
import { useNavigate } from "react-router-dom";
import { Frame } from "./Sections/Frame/Frame";
import { FrameWrapper } from "./Sections/FrameWrapper/FrameWrapper";

interface UserProfile {
    name: string;
    lastTestDate: string;
    avatarUrl?: string;
}

interface UserStats {
    [key: string]: any;
}

interface UserData {
    profile: UserProfile;
    stats: UserStats;
}

export const Dashboard = (): JSX.Element => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    const [showFallback, setShowFallback] = useState(false); // ✅ Fallback state
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const fetchUserData = async () => {
        setLoading(true);
        setError("");
        setShowFallback(false); // ✅ Reset fallback on retry

        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (!accessToken && !refreshToken) {
                throw new Error("No valid session found. Please log in again.");
            }

            const response = await api.get("/api/v1/dashboard/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setUserData(response.data);

            if (!localStorage.getItem("permissionsGranted")) {
                setIsPermissionModalOpen(true);
            }
        } catch (err: any) {
            console.error("Error fetching dashboard data:", err);

            if (err.response?.status === 401 && localStorage.getItem("refreshToken")) {
                try {
                    const refreshResponse = await api.post(
                        "/api/v1/auth/refresh-access-token",
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                            },
                        }
                    );
                    localStorage.setItem("accessToken", refreshResponse.data.accessToken);
                    await fetchUserData(); // Retry with new token
                    return;
                } catch {
                    setError("Session expired. Please log in again.");
                    navigate("/signin");
                }
            } else {
                setError(err.response?.data?.message || "Failed to load dashboard data.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (accessToken || refreshToken) {
            fetchUserData();
        }
    }, []);

    // ✅ Show fallback if loading exceeds 5 seconds
    useEffect(() => {
        if (loading) {
            const timeout = setTimeout(() => {
                setShowFallback(true);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    const handleAllowAccess = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            setIsPermissionModalOpen(false);
            localStorage.setItem("permissionsGranted", "true");
        } catch {
            alert("Failed to access mic and camera. Please allow permissions.");
        }
    };

    const handleCancelPermission = () => setIsPermissionModalOpen(false);

    // ✅ Loader (brief)
    if (loading && !showFallback) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    // ✅ Fallback UI after timeout or error
    if (showFallback || (!loading && (!userData || error))) {
        return (
            <div className="relative w-full min-h-screen bg-[#f9f9f9] flex flex-col">
                <PermissionModal
                    isOpen={isPermissionModalOpen}
                    onAllow={handleAllowAccess}
                    onCancel={handleCancelPermission}
                />

                <header className="sticky top-0 z-10 w-full bg-white">
                    <div className="flex flex-col w-full items-start">
                        <div className="flex h-11 items-center justify-between px-4 py-2.5 w-full">
                            <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
                            <div className="font-bold text-blue-600 text-base text-center font-['Merriweather_Sans',Helvetica]">
                                OptiCheck
                            </div>
                            <Settings className="w-6 h-6 cursor-pointer" />
                        </div>
                    </div>
                </header>

                <div className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <NavFrame />
                </div>

                <main className="flex-1">
                    <div className="p-4">
                        <h1 className="text-xl font-bold">Welcome, {userData?.profile?.name || "User"}!</h1>
                        <p>Your last test was on {userData?.profile?.lastTestDate || "N/A"}.</p>

                        {error && (
                            <div className="mt-4">
                                <p className="text-red-500">{error}</p>
                                <button
                                    onClick={fetchUserData}
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Retry
                                </button>
                            </div>
                        )}
                    </div>
                    <FrameWrapper />
                    <Frame />
                </main>
            </div>
        );
    }

    // ✅ Normal dashboard
    return (
        <div className="relative w-full min-h-screen bg-[#f9f9f9] flex flex-col">
            <PermissionModal
                isOpen={isPermissionModalOpen}
                onAllow={handleAllowAccess}
                onCancel={handleCancelPermission}
            />

            <header className="sticky top-0 z-10 w-full bg-white">
                <div className="flex flex-col w-full items-start">
                    <div className="flex h-11 items-center justify-between px-4 py-2.5 w-full">
                        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
                        <div className="font-bold text-blue-600 text-base text-center font-['Merriweather_Sans',Helvetica]">
                            OptiCheck
                        </div>
                        <Settings className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>
            </header>

            <div className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <NavFrame user={userData?.profile} />
            </div>

            <main className="flex-1">
                <div className="p-4">
                    <h1 className="text-xl font-bold">Welcome, {userData?.profile?.name || "User"}!</h1>
                    <p>Your last test was on {userData?.profile?.lastTestDate || "N/A"}.</p>
                </div>
                <FrameWrapper />
                <Frame />
            </main>
        </div>
    );
};

