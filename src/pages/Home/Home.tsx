
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";

function Home() {
  return (
   <>
      <Navbar/>
    <main>
      <Hero/>
      <Features/>
    </main>
</>
  );
}

export default Home;