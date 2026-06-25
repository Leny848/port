"use client";

import { motion } from "framer-motion";
import Hero from "@/components/hero";
import TechStack from "@/components/tech-stack";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-violet/10 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TechStack />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
