const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            icon: (
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    <path d="M18 8h2v2h-2zm0-4h2v2h-2z" />
                </svg>
            ),
            title: "Sign Up & Set Profile",
            description:
                "Create your account with your Email or Connect your Wallet and set up your vision profile in minutes.",
        },
        {
            number: 2,
            icon: (
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                </svg>
            ),
            title: "Take Smart Tests",
            description: "Complete AI-guided vision tests at your own pace.",
        },
        {
            number: 3,
            icon: (
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
            ),
            title: "Get Instant Results",
            description: "Receive detailed results and recommendations immediately.",
        },
    ];

    return (
        <div
            className="relative bg-[#001337] py-10 px-6 overflow-hidden mx-1 rounded-none md:rounded-tl-[250px] md:rounded-br-[250px]"
        >
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