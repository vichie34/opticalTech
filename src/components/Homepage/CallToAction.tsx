import type React from "react"
import { Link } from "react-router-dom"
// import eyeImage from ""

const CallToAction: React.FC = () => {
    return (
        <div className="bg-white py-16 border-t-4 border-[#001337]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div className="md:w-1/2">
                        <div className="relative rounded-lg overflow-hidden">
                            <img
                                src={"/assets/Depth 2, Frame 0.png"}
                                alt="Close-up of an eye with vision test chart"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="md:w-1/2 flex flex-col items-start">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Testing Today</h2>
                        <p className="text-gray-600 mb-6">All you need is a screen and a few minutes.</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors">
                            <Link to="/signup">Start Vision Test</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallToAction