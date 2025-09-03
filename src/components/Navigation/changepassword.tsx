"use client"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../UI/ux/button";
import { Input } from "../UI/ux/input";
import { toast } from "sonner";

export default function ChangePassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_INFURA_ID}api/v1/users/me/password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });

            if (response.ok) {
                toast.success("Password updated successfully");
                navigate("/profile");
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to update password");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f9f9f9] max-w-sm mx-auto">
            <header className="sticky top-0 z-10 w-full bg-white">
                <div className="flex h-11 items-center justify-between px-4 py-2.5">
                    <ArrowLeft
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <div className="font-bold text-[#1d1d1d] text-base">
                        Change Password
                    </div>
                    <div className="w-6" />
                </div>
            </header>

            <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
                <div className="space-y-4">
                    <Input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Password"}
                </Button>
            </form>
        </div>
    );
}
