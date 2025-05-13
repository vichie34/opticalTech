"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface AgeStepProps {
    age: string
    updateAge: (age: string) => void
    onNext: () => void
    onPrevious: () => void
}

const AgeStep: React.FC<AgeStepProps> = ({ age, updateAge, onNext, onPrevious }) => {
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        // Validate age (must be a number and greater than 0)
        const ageNumber = parseInt(age, 10)
        setIsValid(!isNaN(ageNumber) && ageNumber > 0)
    }, [age])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isValid) {
            onNext()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-black mb-2">How old are you?</h1>
            <p className="text-lg text-gray-700 mb-10">We'll use this to personalize your experience</p>

            <div className="space-y-2">
                <label htmlFor="age" className="block text-black font-medium">
                    Age
                </label>
                <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => updateAge(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full rounded-full border border-gray-300 h-14 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="w-full h-14 rounded-full bg-gray-200 text-gray-800 text-lg font-medium hover:bg-gray-300 transition-colors"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full h-14 rounded-full text-white text-lg font-medium transition-colors ${isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                        }`}
                >
                    Next
                </button>
            </div>
        </form>
    )
}

export default AgeStep