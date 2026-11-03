
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";

function Home() {
  return (
   <>
      <Navbar/>
    <main>
      <Hero/>
      <Features/>
      <HowItWorks/>
    </main>
</>
  );
}

export default Home;