import { useEffect, useState } from "react";
import { Settings, ChevronLeft, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { NavFrame } from "../UI/Dashboard/Sections/Frame/NavFrame";
import { useTranslation } from "react-i18next";

interface TestResult {
    title: string;
    date: string;
    result: string;
    resultColor: string;
    bgColor: string;
}

export default function History() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const { t } = useTranslation();

    const [testHistory, setTestHistory] = useState<TestResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const refresh_token = localStorage.getItem("refresh_token");

                const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}api/v1/test/my-tests`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${access_token}`,
                        },
                        credentials: "include",
                        body: JSON.stringify({ refresh_token }),
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch");

                const data = await res.json();
                console.log("DATA HISTORY", data)

                // Map your API response to UI format
                const formatted: TestResult[] = data.data.map((item: any) => ({

                    title: item.test_type, // snellen, tumbling_e, etc
                    date: new Date(item.tested_at).toLocaleDateString(),
                    result: item.result?.toString() || "-",
                    resultColor: "text-[#34c759]", // adjust conditionally if needed
                    bgColor: "bg-[#eafdf3]",
                }));

                setTestHistory(formatted);
            } catch (err) {
                console.error("Error loading history", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);


    const isEmpty = !loading && testHistory.length === 0;

    return (
        <div className="max-w-md mx-auto bg-[#f9f9f9] min-h-screen flex flex-col">
            {/* Header */}
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

            {/* Side Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <NavFrame />
            </div>

            {/* Back Navigation */}
            <div className="flex items-center gap-2 px-4 py-3">
                <Link to="#" className="p-1">
                    <ChevronLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-2xl font-bold">{t("history")}</h1>
            </div>

            {/* Loading state */}
            {loading && (
                <div className="text-center mt-20 text-gray-500">{t("loading", "Loading history...")}</div>
            )}

            {/* Empty state */}
            {isEmpty && (
                <div className="flex flex-col items-center justify-center px-6 mt-16">
                    <div className="relative mb-12">
                        <div className="w-32 h-32 bg-[#dee9ff] rounded-full flex items-center justify-center">
                            <div className="relative">
                                <div className="w-16 h-12 bg-[#2563eb] rounded-2xl rounded-bl-sm relative">
                                    <div className="absolute top-3 left-3 w-8 h-1 bg-white rounded-full"></div>
                                    <div className="absolute top-5 left-3 w-6 h-1 bg-white rounded-full"></div>
                                </div>
                                <div className="w-14 h-10 bg-[#418df9] rounded-2xl rounded-br-sm absolute -bottom-2 -right-2">
                                    <div className="absolute top-2.5 left-2.5 w-6 h-1 bg-white rounded-full"></div>
                                    <div className="absolute top-4 left-2.5 w-4 h-1 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-semibold text-[#1d1d1d] mb-3">
                            {t("noHistoryTitle", "You don't have any history")}
                        </h2>
                        <p className="text-[#353535] text-base leading-relaxed">
                            {t("noHistoryDesc", "When you take a test, it will appear here")}
                        </p>
                    </div>
                    <div className="w-full px-6 fixed bottom-8 left-0 right-0 max-w-sm mx-auto">
                        <Link to="/test">
                            <button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-4 rounded-2xl text-lg font-medium">
                                {t("startTest", "Start a Test")}
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            {/* History list */}
            {!loading && testHistory.length > 0 && (
                <div className="px-4 py-2 flex flex-col gap-4">
                    {testHistory.map((test, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">{test.title}</h2>
                                    <p className="text-gray-500">{test.date}</p>
                                </div>
                                <div
                                    className={`px-3 py-1 rounded-full ${test.bgColor} ${test.resultColor} font-semibold`}
                                >
                                    {test.result}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
