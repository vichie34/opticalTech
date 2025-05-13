function OptiCheckWelcome() {
    return (
        <div className="flex flex-col min-h-screen bg-white">

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                {/* Eye Image */}
                <div className="relative w-full h-72 lg:w-1/2 lg:h-auto">
                    <img
                        src="/assets/Depth 2, Frame 0.png"
                        alt="Close-up of an eye with vision test markers"
                        className="w-full h-full object-cover"
                    />
                    {/* Vision Test Markers */}
                    <div className="absolute left-4 top-10 flex flex-col items-start text-black space-y-6">
                        <span className="text-xs font-bold">T</span>
                        <span className="text-xs font-bold">Y</span>
                        <span className="text-xs font-bold">I</span>
                        <span className="text-xs font-bold">U</span>
                        <span className="text-xs font-bold">P</span>
                    </div>
                    <div className="absolute left-10 top-12 flex flex-col items-start text-black/50 space-y-6 text-[8px]">
                        <span>1/20</span>
                        <span>1/30</span>
                        <span>1/40</span>
                        <span>1/50</span>
                        <span>1/70</span>
                    </div>
                </div>
                {/* Welcome Text and Buttons */}
                <div className="px-8 pt-6 pb-4 lg:w-1/2">
                    <h1 className="text-4xl font-bold text-[#1d1d1d] mb-4">Welcome to Opticheck</h1>
                    <p className="text-xl text-[#1d1d1d] mb-6">
                        Vision testing has never been easier. Get started with a simple email sign up or connect your wallet.
                    </p>
                    <div className="space-y-4">
                        <button className="w-full py-4 bg-[#2563eb] text-white text-mg cursor-pointer font-medium rounded-full hover:bg-[#1d4ed8] transition-colors">
                            <a href="/signup">
                                Sign up with Email
                            </a>
                        </button>
                        <button className="w-full py-4 bg-[#e6e6e6] text-[#1d1d1d] text-md cursor-pointer font-medium rounded-full hover:bg-[#d1d5db] transition-colors">
                            Connect Solflare Wallet
                        </button>
                        <div className="flex justify-center mt-6">
                            <a href="/signin" className="text-[#1d1d1d] text-lg hover:underline">
                                I already have an account?
                            </a>
                        </div>
                    </div>
                </div>


            </div>

            {/* Footer */}
            <div className="px-8 pb-8 pt-4">
                <p className="text-[#637587] text-center text-sm">
                    By signing up, you agree to our{" "}
                    <a href="/terms" className="text-[#2563eb] hover:underline">
                        terms
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-[#2563eb] hover:underline">
                        privacy policy
                    </a>
                    .
                </p>
            </div>

            {/* Bottom Indicator */}
            {/* <div className="flex justify-center pb-6">
                <div className="w-36 h-1 bg-black rounded-full"></div>
            </div> */}
        </div>
    )
}

export default OptiCheckWelcome
