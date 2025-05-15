import type React from "react";

interface TestimonialProps {
    name: string;
    title: string;
    quote: string;
    imageSrc: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, title, quote, imageSrc }) => {
    return (
        <div className="bg-transparent md:bg-white rounded-lg p-6 shadow-md text-white">
            <div className="flex items-center mb-4">
                <img
                    src={imageSrc || "/assets/img.png"}
                    alt={name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-sm md:text-gray-500">{title}</p>
                </div>
            </div>
            <p className="text-sm leading-relaxed md:text-gray-500">{quote}</p>
        </div>
    );
};

const TestimonialSection: React.FC = () => {
    return (
        <div className="bg-[#001337] py-16 relative">
            {/* Grid background pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            ></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-2xl font-bold text-center text-white mb-10">What Experts Say</h2>

                <Testimonial
                    name="Dr. Kami Adeniran"
                    title="Chief Ophthalmologist, Vision Care Institute"
                    quote="OptiCheck represents a significant advancement in accessible vision care. The accuracy of their AI-powered tests combined with the user-friendly interface makes it a valuable tool for both preliminary screenings and regular vision monitoring."
                    imageSrc="/assets/img.png?height=100&width=100"
                />
            </div>
        </div>
    );
};

export default TestimonialSection;