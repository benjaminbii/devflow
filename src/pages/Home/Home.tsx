
import { Features } from "@/components/landing/Features";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import  { Showcase } from "@/components/landing/showcase";
import  { StatsStrip } from "@/components/landing/StatsStrip";
import { WhyDevFlow } from "@/components/landing/WhyDevFlow";

function Home() {
  return (
   <>
      <Navbar/>
    <main>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <StatsStrip/>
      <Showcase/>
      <WhyDevFlow/>
      <FinalCTA/>    
    </main>
    <Footer/>
</>
  );
}

export default Home;