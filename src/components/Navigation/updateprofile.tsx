"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Menu, Settings } from "lucide-react"
import { Button } from "../UI/ux/button"
import { NavFrame } from "../UI/Dashboard/Sections/Frame/NavFrame"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function UpdateProfile() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        name: ""
    })
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen((prev) => !prev)

    // Fetch current user data
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_INFURA_ID}api/v1/dashboard/me`, {
                    credentials: "include"
                })
                if (response.ok) {
                    const data = await response.json()
                    setFormData({
                        email: data.email,
                        name: data.name
                    })
                }
            } catch (error) {
                toast.error("Failed to load user data")
            }
        }
        fetchUserData()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/users`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email
                })
            })

            if (response.ok) {
                toast.success("Profile updated successfully")
                navigate("/profile")
            } else {
                const error = await response.json()
                toast.error(error.message || "Failed to update profile")
            }
        } catch (error) {
            toast.error("An error occurred while updating profile")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="min-h-screen bg-[#f9f9f9] max-w-sm mx-auto">
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

            <div className={`fixed top-0 left-0 h-full w-[245px] bg-[#f4f5f7] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <NavFrame />
            </div>

            {/* Page Title */}
            <div className="flex items-center gap-3 px-6 py-4">
                <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                    <ArrowLeft className="h-6 w-6 text-black" />
                </Button>
                <h1 className="text-2xl font-medium text-black">Update Profile</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 pt-8 space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-lg font-medium text-black">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-14 rounded-full border-2 border-[#2563eb] bg-white px-6 text-lg focus:border-[#2563eb] focus:ring-0"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="name" className="text-lg font-medium text-black">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-14 rounded-full border-2 border-[#2563eb] bg-white px-6 text-lg focus:border-[#2563eb] focus:ring-0"
                        required
                    />
                </div>

                <div className="pt-8">
                    <Button
                        type="submit"
                        className="w-full h-14 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-lg font-medium"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
