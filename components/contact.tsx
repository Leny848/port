"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const socials = [
  {
    name: "GitHub",
    handle: "@Leny848",
    href: "https://github.com/Leny848",
    icon: Github,
    color: "hover:border-white hover:text-white",
  },
  {
    name: "LinkedIn",
    handle: "Promise Chukwuma",
    href: "https://www.linkedin.com/in/promise-chukwuma%F0%93%83%B5-470a41268/",
    icon: Linkedin,
    color: "hover:border-blue-500 hover:text-blue-500",
  },
  {
    name: "Email",
    handle: "cpromise166@gmail.com",
    href: "mailto:cpromise166@gmail.com",
    icon: Mail,
    color: "hover:border-accent-cyan hover:text-accent-cyan",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let&apos;s Build Something <span className="text-gradient">Amazing</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            I&apos;m currently open to new opportunities and collaborations. If you have a project that needs a skilled full-stack engineer, let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`group flex items-center justify-between p-6 rounded-2xl bg-card border border-border ${social.color} transition-all duration-300`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <social.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">{social.name}</h3>
                  <p className="text-sm text-muted">{social.handle}</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-8 border-t border-border text-center text-sm text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Chukwuma Promise. Built with Next.js & Tailwind.</p>
        </motion.div>
      </div>
    </section>
  );
}
