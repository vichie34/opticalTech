import { Link } from "react-router-dom"

function Hero() {
    return (
        <div className="bg-[#020c1f] min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                {/* Navigation */}
                <nav className="flex items-center justify-between py-6">
                    <div className="flex items-center">
                        <svg className="h-6 w-6 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                        <Link to="/">
                            <span className="font-semibold text-lg">OptiCheck</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-sm font-medium">
                            About
                        </a>
                        <a href="#" className="text-sm font-medium">
                            Features
                        </a>
                        <a href="#" className="text-sm font-medium">
                            How it Works
                        </a>
                        <a href="#" className="text-sm font-medium">
                            Contact
                        </a>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-full">
                        <Link to="/Signup">Start Free Trial</Link>
                    </button>
                </nav>

                {/* Hero Section */}
                <div className="py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Redefining Eye Health with AI-Powered Vision Testing
                        </h1>
                        <p className="mt-6 text-gray-300">
                            No appointments. Mobile. Just accurate, intelligent eye exams. Free to use for all your needs.
                        </p>
                        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                            <button className="bg-blue-600 w-full hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105">
                                <Link to="/Signup">Get Started</Link>
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <img
                            src={"/assets/div.png"}
                            alt="Eye examination process"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hero
