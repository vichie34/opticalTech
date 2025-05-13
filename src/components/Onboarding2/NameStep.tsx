"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface NameStepProps {
    name: string
    updateName: (name: string) => void
    onNext: () => void
}

const NameStep: React.FC<NameStepProps> = ({ name, updateName, onNext }) => {
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        setIsValid(name.trim().length > 0)
    }, [name])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isValid) {
            onNext()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-black mb-2">What's your name?</h1>
            <p className="text-lg text-gray-700 mb-10">We'll use this to personalize your experience</p>

            <div className="space-y-2">
                <label htmlFor="name" className="block text-black font-medium">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => updateName(e.target.value)}
                    placeholder="Type your full name"
                    className="w-full rounded-full border border-gray-300 h-14 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                disabled={!isValid}
                className={`w-full h-14 rounded-full mt-6 text-white text-lg font-medium transition-colors ${isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                    }`}
            >
                Next
            </button>
        </form>
    )
}

export default NameStep
