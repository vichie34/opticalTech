"use client"

import type React from "react"
import { Link } from "react-router-dom"
interface ConfirmationStepProps {
    formData: {
        name: string
        email: string
        age: string
    }
    onPrevious: () => void
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ formData, onPrevious }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-black mb-2">Confirm your details</h1>
            <p className="text-lg text-gray-700 mb-10">Please review your information</p>

            <div className="space-y-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-lg font-medium">{formData.name}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="text-lg font-medium">{formData.age}</p>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="w-full h-14 rounded-full bg-gray-200 text-gray-800 text-lg font-medium hover:bg-gray-300 transition-colors"
                >
                    Back
                </button>
                <button
                    type="button"
                    className="w-full h-14 rounded-full bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition-colors"
                >
                    <Link to="/dashboard">Continue to Dashboard</Link>
                </button>
            </div>
        </div>
    )
}

export default ConfirmationStep
