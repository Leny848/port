"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-6 relative">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            Available for Hire
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
        >
          Chukwuma Promise{" "}
          <span className="text-gradient">—</span>
          <br />
          <span className="text-gradient">Building Scalable</span>
          <br />
          Full-Stack Systems.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I architect robust backend infrastructure and craft pixel-perfect frontend experiences.
          Specializing in{" "}
          <span className="text-white font-medium">React.js</span>,{" "}
          <span className="text-white font-medium">Next.js</span>,{" "}
          <span className="text-white font-medium">Node.js</span>, and{" "}
          <span className="text-white font-medium">Golang</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:scale-105 transition-transform"
          >
            Explore Architecture
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-white blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-border hover:border-accent-cyan hover:text-accent-cyan transition-colors font-medium"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-6"
        >
          {[
            { icon: Github, href: "https://github.com/Leny848", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/promise-chukwuma%F0%93%83%B5-470a41268/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:cpromise166@gmail.com", label: "Email" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card border border-border hover:border-accent-cyan hover:text-accent-cyan hover:scale-110 transition-all"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
