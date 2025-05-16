import { JSX, useEffect, useState } from "react";
import api from "../../../lib/utils";
import { NavFrame } from "./Sections/Frame/NavFrame";
import { Menu, Settings } from "lucide-react";
import PermissionModal from "./Sections/Modal/PermissionModal";
import { useNavigate, useLocation } from "react-router-dom";

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
    const [error, setError] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const fetchAccessToken = async (refresh_token: string): Promise<string | null> => {
        try {
            const response = await api.post('/api/v1/auth/refresh/access/token', { refresh_token });
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            return accessToken;
        } catch (err: any) {
            console.error('Error refreshing access token:', err);
            return null;
        }
    };


    // const fetchUserData = async () => {
    //     setLoading(true);
    //     setError('');
    //     try {
    //         const refresh_token = location.state?.refresh_token || localStorage.getItem('refresh_token');
    //         if (!refresh_token) throw new Error("Refresh token is missing. Please log in again.");

    //         let accessToken = localStorage.getItem('accessToken');
    //         if (!accessToken) {
    //             accessToken = await fetchAccessToken(refresh_token);
    //             if (!accessToken) throw new Error("Failed to refresh access token. Please log in again.");
    //         }

    //         const response = await api.post('/api/v1/dashboard/me', {}, {
    //             headers: { Authorization: `Bearer ${accessToken}` },
    //         });
    //         setUserData(response.data);

    //         const permissionsGranted = localStorage.getItem('permissionsGranted');
    //         if (!permissionsGranted) setIsPermissionModalOpen(true);

    //     } catch (err: any) {
    //         console.error('Error fetching dashboard data:', err);
    //         if (err.response?.status === 401) {
    //             setError("Session expired. Please log in again.");
    //             localStorage.removeItem('accessToken');
    //             localStorage.removeItem('refresh_token');
    //             navigate('/signin');
    //         } else {
    //             setError(err.response?.data?.message || 'Failed to load dashboard data. Please try again later.');
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchUserData = async () => {
        setLoading(true);
        setError('');
        try {
            const refresh_token = location.state?.refresh_token || localStorage.getItem('refresh_token');
            if (!refresh_token) throw new Error("Refresh token is missing. Please log in again.");

            let accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                accessToken = await fetchAccessToken(refresh_token);
                if (!accessToken) throw new Error("Failed to refresh access token. Please log in again.");
            }

            const response = await api.post('/api/v1/dashboard/me', {}, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUserData(response.data);

            const permissionsGranted = localStorage.getItem('permissionsGranted');
            if (!permissionsGranted) setIsPermissionModalOpen(true);

        } catch (err: any) {
            console.error('Error fetching dashboard data:', err);
            if (err.response?.status === 401) {
                setError("Session expired. Please log in again.");
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refresh_token');
                navigate('/signin');
            } else {
                setError(err.response?.data?.message || 'Failed to load dashboard data. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refresh_token = localStorage.getItem('refresh_token');
        if (accessToken || refresh_token) {
            fetchUserData();
        }
    }, []);

    const handleAllowAccess = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            setIsPermissionModalOpen(false);
            localStorage.setItem('permissionsGranted', 'true');
        } catch {
            alert('Failed to access mic and camera. Please allow permissions.');
        }
    };

    const handleCancelPermission = () => setIsPermissionModalOpen(false);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
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
                <div className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <NavFrame user={userData?.profile} />
                </div>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="p-4">
                        <h1 className="text-xl font-bold">
                            Welcome, {userData?.profile?.name?.split(" ")[0] || 'User'}!
                        </h1>
                        <p>Your last test was on {userData?.profile?.lastTestDate || 'N/A'}.</p>
                        <div className="text-red-500 mt-4">{error}</div>
                    </div>
                    <pre>{JSON.stringify({}, null, 2)}</pre>
                </main>

                <PermissionModal
                    isOpen={isPermissionModalOpen}
                    onAllow={handleAllowAccess}
                    onCancel={handleCancelPermission}
                />
            </div>
        );
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
            <div className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <NavFrame user={userData?.profile} />
            </div>

            {/* Main Content */}
            <main className="flex-1">
                <div className="p-4">
                    <h1 className="text-xl font-bold">
                        Welcome, {userData?.profile?.name?.split(" ")[0] || 'User'}!
                    </h1>
                    <p>Your last test was on {userData?.profile?.lastTestDate || 'N/A'}.</p>
                </div>
                <pre>{JSON.stringify(userData?.stats, null, 2)}</pre>
            </main>

            <PermissionModal
                isOpen={isPermissionModalOpen}
                onAllow={handleAllowAccess}
                onCancel={handleCancelPermission}
            />
        </div>
    );
};
