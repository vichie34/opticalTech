import BuiltForEveryone from "./BuiltForEveryone";
import CallToAction from "./CallToAction";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import HowItWorks from "./Operations";
import TestimonialSection from "./Testimonial";
import Hero from "./Hero";

const LandingPageHeader = () => {
    return (
        <div>
            <Hero />
            <FeaturesSection />
            <HowItWorks />
        </div>
    );
};

const LandingPageContent = () => {
    return (
        <div>
            <BuiltForEveryone />
            <TestimonialSection />
            <CallToAction />
        </div>
    );
};

export default function Home() {
    return (
        <div>
            <LandingPageHeader />
            <LandingPageContent />
            <Footer />
        </div>
    );
}