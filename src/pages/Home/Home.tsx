
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import  { Showcase } from "@/components/landing/showcase";
import  { StatsStrip } from "@/components/landing/StatsStrip";

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
    </main>
</>
  );
}

export default Home;