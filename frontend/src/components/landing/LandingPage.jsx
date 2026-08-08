import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import DemoPreview from './DemoPreview';
import CTASection from './CTASection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans selection:bg-[#B600A8]/30 selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <DemoPreview />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
