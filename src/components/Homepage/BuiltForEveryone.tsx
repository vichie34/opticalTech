import type React from "react";

interface FeatureProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    imagePosition: "left" | "right";
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, imagePosition }) => {
    const content = (
        <div className="flex flex-col px-4 md:px-[120px]">
            <div className="flex items-center mb-2">
                <div className="text-blue-600 mr-2">{icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600">{description}</p>
        </div>
    );

    const image = (
        <div className="hidden md:block bg-[#001337] rounded-lg aspect-square w-full max-w-[240px]"></div>
    );

    return (
        <div className="flex flex-col md:flex-row items-center gap-5 py-8">
            {imagePosition === "left" ? (
                <>
                    <div className="md:w-1/2 flex justify-center">{image}</div>
                    <div className="md:w-1/2">{content}</div>
                </>
            ) : (
                <>
                    <div className="md:w-1/2 md:order-2 flex justify-center">{image}</div>
                    <div className="md:w-1/2 md:order-1">{content}</div>
                </>
            )}
        </div>
    );
};

const BuiltForEveryone: React.FC = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Built for Everyone</h2>

                <div className="space-y-8">
                    <Feature
                        title="Kids Mode"
                        description="Engaging cartoon visuals and friendly voice guidance make testing fun and easy for children"
                        icon={
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.69 2 6 4.69 6 8c0 2.97 2.16 5.43 5 5.91V16h-2v2h2v2h2v-2h2v-2h-2v-2.09c2.84-.48 5-2.94 5-5.91 0-3.31-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                            </svg>
                        }
                        imagePosition="left"
                    />

                    <Feature
                        title="Elderly Mode"
                        description="High contrast interface with larger fonts for improved visibility and easier navigation"
                        icon={
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                            </svg>
                        }
                        imagePosition="right"
                    />
                </div>
            </div>
        </div>
    );
};

export default BuiltForEveryone;
