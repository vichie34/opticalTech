import { JSX, useEffect, useState } from "react";
import api from "../../../lib/utils";
import { NavFrame } from "./Sections/Frame/NavFrame";
import { Menu, Settings } from "lucide-react";
import PermissionModal from "./Sections/Modal/PermissionModal";
import { useNavigate } from "react-router-dom";

interface UserProfile {
    name: string;
    lastTestDate: string;
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
    const [error, setError] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const fetchAccessToken = async (refreshToken: string): Promise<string | null> => {
        try {
            const response = await api.post('/api/v1/auth/refresh-token', { refreshToken });
            const { accessToken } = response.data;

            // Store the new access token in localStorage
            localStorage.setItem('accessToken', accessToken);

            return accessToken;
        } catch (err: any) {
            console.error('Error refreshing access token:', err);
            return null;
        }
    };

    const fetchUserData = async () => {
        setLoading(true);
        setError('');

        try {
            // Fetch the access token from localStorage
            let accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                throw new Error("Refresh token is missing. Please log in again.");
            }

            // If access token is missing, use the refresh token to get a new one
            if (!accessToken) {
                accessToken = await fetchAccessToken(refreshToken);
                if (!accessToken) {
                    throw new Error("Failed to refresh access token. Please log in again.");
                }
            }

            // Set the Authorization header with the access token
            const response = await api.get('/api/v1/users/dashboard', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Set the user data
            setUserData(response.data);

            // Check if permissions are granted
            const permissionsGranted = localStorage.getItem('permissionsGranted');
            if (!permissionsGranted) {
                setIsPermissionModalOpen(true);
            }
        } catch (err: any) {
            console.error('Error fetching dashboard data:', err);

            // Handle token expiration or invalid token
            if (err.response?.status === 401) {
                setError("Session expired. Please log in again.");
                localStorage.removeItem('accessToken'); // Clear the invalid access token
                localStorage.removeItem('refreshToken'); // Clear the invalid refresh token
                navigate('/signin'); // Redirect to the login page
            } else {
                // Handle other errors
                const errorMessage =
                    err.response?.data?.message || 'Failed to load dashboard data. Please try again later.';
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [navigate]);

    const handleAllowAccess = async () => {
        try {
            // Request access to the microphone and camera
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            console.log('Access granted to mic and camera:', stream);

            // Close the modal after access is granted
            setIsPermissionModalOpen(false);
            localStorage.setItem('permissionsGranted', 'true');
        } catch (err) {
            console.error('Error accessing mic and camera:', err);
            alert('Failed to access mic and camera. Please allow permissions.');
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
            {/* Header */}
            <header className="sticky top-0 z-10 w-full bg-white">
                <div className="flex h-11 items-center justify-between px-4 py-2.5 w-full">
                    <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
                    <div className="font-bold text-blue-600 text-base">OptiCheck</div>
                    <Settings className="w-6 h-6 cursor-pointer" />
                </div>
            </header>

            {/* Slide-in Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <NavFrame />
            </div>

            {/* Main Content */}
            <main className="flex-1">
                <div className="p-4">
                    <h1 className="text-xl font-bold">Welcome, {userData?.profile?.name || 'User'}!</h1>
                    <p>Your last test was on {userData?.profile?.lastTestDate || 'N/A'}.</p>
                </div>
                <pre>{JSON.stringify(userData?.stats, null, 2)}</pre>
            </main>

            {/* Permission Modal */}
            <PermissionModal
                isOpen={isPermissionModalOpen}
                onAllow={handleAllowAccess}
                onCancel={handleCancelPermission}
            />
        </div>
    );
};