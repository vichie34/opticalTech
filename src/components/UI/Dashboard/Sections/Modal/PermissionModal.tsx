"use client"

import type React from "react"

interface PermissionModalProps {
    isOpen: boolean
    onAllow: () => void
    onCancel: () => void
}

const PermissionModal: React.FC<PermissionModalProps> = ({ isOpen, onAllow, onCancel }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm border border-blue-100 overflow-hidden">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Allow Access to Mic & Camera</h3>
                    <p className="text-sm text-gray-600 mb-6">
                        OptiCheck needs access to your mic and camera to record audio and video
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={onAllow}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors"
                        >
                            Allow Access
                        </button>

                        <button
                            onClick={onCancel}
                            className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-full transition-colors"
                        >
                            Not Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PermissionModal
