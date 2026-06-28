import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Hackathons from "@/components/sections/Hackathons";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Notes from "@/components/sections/Notes";
import Contact from "@/components/sections/Contact";
import WaveBand from "@/components/anim/WaveBand";
import PacketStream from "@/components/anim/PacketStream";
import EqualizerBars from "@/components/anim/EqualizerBars";
import GraphBand from "@/components/anim/GraphBand";
import OrbitalBand from "@/components/anim/OrbitalBand";
import LissajousBand from "@/components/anim/LissajousBand";

export default function Home() {
  return (
    <>
      <Hero />
      <WaveBand />
      <About />
      <PacketStream />
      <Projects />
      <Hackathons />
      <EqualizerBars />
      <Experience />
      <GraphBand />
      <Education />
      <OrbitalBand />
      <Notes />
      <LissajousBand />
      <Contact />
    </>
  );
}
