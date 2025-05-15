const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            icon: (
                <img src="/assets/div (2).svg" alt="" />

            ),
            title: "Sign Up & Set Profile",
            description:
                "Create your account with your Email or Connect your Wallet and set up your vision profile in minutes.",
        },
        {
            number: 2,
            icon: (
                <img src="/assets/div (1).svg" alt="" />
            ),
            title: "Take Smart Tests",
            description: "Complete AI-guided vision tests at your own pace.",
        },
        {
            number: 3,
            icon: (
                <img src="/assets/div.svg" alt="" />
            ),
            title: "Get Instant Results",
            description: "Receive detailed results and recommendations immediately.",
        },
    ];

    return (
        <div
            className="relative bg-[#001337] py-10 px-6 overflow-hidden  mx-1 rounded-[10px] md:rounded-tl-[250px] md:rounded-br-[250px]"
        >
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            ></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-center text-white mb-12">How It Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative p-6 rounded-lg shadow-md md:bg-white md:text-gray-900 text-center flex flex-col items-center"
                        >
                            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-medium text-white md:text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-300 md:text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;