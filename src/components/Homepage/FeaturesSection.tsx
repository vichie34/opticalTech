const FeaturesSection = () => {
    const features = [
        {
            icon: (
                <img src="/assets/Frame.svg" alt="" />
            ),
            title: "Smart & Adaptive",
            description: "AI-powered tests that adapt to your responses in real-time",
        },
        {
            icon: (
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
            ),
            title: "Accurate Diagnostics",
            description: "Clinically validated health you can trust",
        },
        {
            icon: (
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
                    <path d="M12 16.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />
                </svg>
            ),
            title: "Anytime, Anywhere",
            description: "Take your vision test from any device, anywhere",
        },
        {
            icon: (
                <img src="/assets/Frame (1).svg" alt="" />
            ),
            title: "Accessible for All",
            description: "Designed to be inclusive and easy to use",
        },
    ]

    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Why OptiCheck?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start text-start">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FeaturesSection
