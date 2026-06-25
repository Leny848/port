"use client";

import { motion } from "framer-motion";
import { Layers, Server, Database, Cloud } from "lucide-react";

const skills = [
  {
    title: "Frontend Architecture",
    icon: Layers,
    items: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS"],
    color: "cyan",
    colSpan: "md:col-span-2",
  },
  {
    title: "Backend Systems",
    icon: Server,
    items: ["Node.js", "Golang", "REST APIs", "GraphQL"],
    color: "emerald",
    colSpan: "md:col-span-1",
  },
  {
    title: "Database & Storage",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    color: "violet",
    colSpan: "md:col-span-1",
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    items: ["Docker", "AWS", "Vercel", "CI/CD"],
    color: "rose",
    colSpan: "md:col-span-2",
  },
];

const colorMap = {
  cyan: "border-accent-cyan/20 hover:border-accent-cyan/50 text-accent-cyan",
  emerald: "border-accent-emerald/20 hover:border-accent-emerald/50 text-accent-emerald",
  violet: "border-accent-violet/20 hover:border-accent-violet/50 text-accent-violet",
  rose: "border-accent-rose/20 hover:border-accent-rose/50 text-accent-rose",
};

export default function TechStack() {
  return (
    <section id="stack" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            A curated arsenal of modern technologies designed to build scalable, resilient, and beautiful software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative p-6 rounded-2xl bg-card border ${colorMap[skill.color as keyof typeof colorMap]} ${skill.colSpan} transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-${skill.color === 'cyan' ? 'accent-cyan' : skill.color === 'emerald' ? 'accent-emerald' : skill.color === 'violet' ? 'accent-violet' : 'accent-rose'}/10 flex items-center justify-center mb-4`}>
                  <skill.icon className={`w-6 h-6 text-${skill.color === 'cyan' ? 'accent-cyan' : skill.color === 'emerald' ? 'accent-emerald' : skill.color === 'violet' ? 'accent-violet' : 'accent-rose'}`} />
                </div>

                <h3 className="text-xl font-bold mb-3">{skill.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
