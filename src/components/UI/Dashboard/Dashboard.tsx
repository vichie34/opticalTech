import { JSX, useEffect, useState } from "react";
import api from "../../../lib/utils";
import { NavFrame } from "./Sections/Frame/NavFrame";
import { Menu, Settings } from "lucide-react"; // Corrected icon imports
import PermissionModal from "./Sections/Modal/PermissionModal";
import { FC } from "react";

interface UserProfile {
    name: string;
    lastTestDate: string;
}

interface UserStats {
    [key: string]: any; // Adjust based on the structure of stats data
}

interface UserData {
    profile: UserProfile;
    stats: UserStats;
}

interface FrameWrapperProps {
    userData?: UserProfile;
}

export const UserFrameWrapper: FC<FrameWrapperProps> = ({ userData }) => {
    return (
        <div>
            {/* FrameWrapper content */}
            <p>User: {userData?.name || "Unknown"}</p>
        </div>
    );
};

interface FrameProps {
    statsData?: UserStats;
}

export const LocalFrame: FC<FrameProps> = ({ statsData }) => {
    return (
        <div>
            {/* Frame content */}
            <pre>{JSON.stringify(statsData, null, 2)}</pre>
        </div>
    );
};

export const Dashboard = (): JSX.Element => {
    const [userData, setUserData] = useState<UserData | null>(null); // Added type for userData
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(true); // Show modal on first login

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/user/dashboard"); // Adjust endpoint based on API docs
                setUserData(response.data);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAllowAccess = async () => {
        try {
            // Request access to the microphone and camera
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            console.log("Access granted to mic and camera:", stream);

            // Close the modal after access is granted
            setIsPermissionModalOpen(false);
        } catch (err) {
            console.error("Error accessing mic and camera:", err);
            alert("Failed to access mic and camera. Please allow permissions.");
        }
    };

    const handleCancelPermission = () => {
        // Close the modal if the user cancels
        setIsPermissionModalOpen(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="relative w-full min-h-screen bg-[#f9f9f9] flex flex-col">
            {/* Permission Modal */}
            <PermissionModal
                isOpen={isPermissionModalOpen}
                onAllow={handleAllowAccess}
                onCancel={handleCancelPermission}
            />

            {/* Header */}
            <header className="sticky top-0 z-10 w-full bg-white">
                <div className="flex flex-col w-full items-start sticky top-0 z-10 bg-white">
                    <div className="flex h-11 items-center justify-between px-4 py-2.5 w-full">
                        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
                        <div className="font-bold text-blue-600 text-base text-center font-['Merriweather_Sans',Helvetica]">
                            OptiCheck
                        </div>
                        <Settings className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>
            </header>

            {/* Slide-in Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <NavFrame />
            </div>

            {/* Main Content */}
            <main className="flex-1">
                <div className="p-4">
                    <h1 className="text-xl font-bold">Welcome, {userData?.profile?.name || "User"}!</h1>
                    <p>Your last test was on {userData?.profile?.lastTestDate || "N/A"}.</p>
                </div>
                <UserFrameWrapper userData={userData?.profile} />
                <LocalFrame statsData={userData?.stats} />
            </main>
        </div>
    );
};