"use client";

import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    name: "Frontend",
    color: "accent-purple",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    name: "Backend",
    color: "accent-cyan",
    skills: [
      { name: "Python / FastAPI", level: 90 },
      { name: "Node.js / Express", level: 80 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    name: "DevOps & Tools",
    color: "green-400",
    skills: [
      { name: "Docker", level: 78 },
      { name: "Git / GitHub", level: 95 },
      { name: "Linux / Bash", level: 82 },
      { name: "AWS / Vercel", level: 72 },
    ],
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL",
  "Docker", "Redis", "TailwindCSS", "Prisma", "SQLAlchemy", "Git",
  "Vercel", "Linux", "REST APIs", "GraphQL",
];

function SkillBar({ name, level, color, animate }: {
  name: string;
  level: number;
  color: string;
  animate: boolean;
}) {
  const colorMap: Record<string, string> = {
    "accent-purple": "bg-accent-purple",
    "accent-cyan": "bg-accent-cyan",
    "green-400": "bg-green-400",
  };

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text-primary">{name}</span>
        <span className="text-xs font-mono text-text-muted">{level}%</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorMap[color] || "bg-accent-purple"}`}
          style={{ width: animate ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            entry.target.querySelectorAll(".animate-on-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-12">
          <span className="font-mono text-accent-cyan text-sm">// habilidades</span>
          <h2 className="text-4xl font-bold mt-2">
            Meu <span className="text-gradient">Stack</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.name}
              className="animate-on-scroll p-6 rounded-xl bg-bg-card border border-border hover:border-accent-purple/30 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <h3 className="font-semibold text-text-primary mb-6 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    cat.color === "accent-purple"
                      ? "bg-accent-purple"
                      : cat.color === "accent-cyan"
                      ? "bg-accent-cyan"
                      : "bg-green-400"
                  }`}
                />
                {cat.name}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    animate={animate}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="animate-on-scroll">
          <p className="text-sm text-text-muted font-mono mb-4">
            // outras tecnologias
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-bg-card border border-border text-sm text-text-secondary hover:text-accent-purple hover:border-accent-purple/40 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
