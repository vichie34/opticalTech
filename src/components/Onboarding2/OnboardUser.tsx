"use client"

import { useState } from "react"
import NameStep from "./NameStep"
import AgeStep from "./AgeStep"
import ConfirmationStep from "./DeviceConfimation"

function UserOnboarding() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
    })

    const totalSteps = 3

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const updateFormData = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value,
        })
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <NameStep
                        name={formData.name}
                        updateName={(value) => updateFormData("name", value)}
                        onNext={handleNext}
                    />
                );
            case 2:
                return (
                    <AgeStep
                        age={formData.age}
                        updateAge={(value) => updateFormData("age", value)}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                );
            case 3:
                return (
                    <ConfirmationStep
                        formData={formData}
                        onPrevious={handlePrevious}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white px-4 pt-10 pb-8">
            {/* Progress Indicator */}
            <div className="flex gap-2 mb-16">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 rounded-full flex-1 ${index + 1 <= currentStep ? "bg-blue-600" : "bg-gray-200"
                            }`}
                    ></div>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1">{renderStep()}</div>
        </div>
    )
}

export default UserOnboarding
