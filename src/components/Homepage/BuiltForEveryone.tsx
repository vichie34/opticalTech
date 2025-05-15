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
                            <img src="/assets/Frame (2).svg" />
                        }
                        imagePosition="left"
                    />

                    <Feature
                        title="Elderly Mode"
                        description="High contrast interface with larger fonts for improved visibility and easier navigation"
                        icon={
                            <img src="/assets/Frame (3).svg" />

                        }
                        imagePosition="right"
                    />
                </div>
            </div>
        </div>
    );
};

export default BuiltForEveryone;
