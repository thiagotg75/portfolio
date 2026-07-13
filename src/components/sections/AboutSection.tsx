"use client";

import { useEffect, useRef } from "react";
import { MapPin, Coffee, Rocket, BookOpen } from "lucide-react";

const stats = [
  { value: "3+", label: "Anos de experiência" },
  { value: "20+", label: "Projetos entregues" },
  { value: "10+", label: "Clientes satisfeitos" },
  { value: "100%", label: "Dedicação" },
];

const facts = [
  { icon: MapPin, text: "Blumenau, Santa Catarina, Brasil" },
  { icon: Coffee, text: "Movido a café e código limpo" },
  { icon: Rocket, text: "Sempre aprendendo novas tecnologias" },
  { icon: BookOpen, text: "Apaixonado por open source" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".animate-on-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
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
    <section id="about" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-12">
          <span className="font-mono text-accent-cyan text-sm">// sobre mim</span>
          <h2 className="text-4xl font-bold mt-2">
            Quem sou <span className="text-gradient">eu?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-6">
            <p className="animate-on-scroll text-text-secondary leading-relaxed text-lg">
              Sou um desenvolvedor full-stack apaixonado por criar soluções
              digitais que fazem a diferença. Combino frontend moderno com
              React e Next.js com backends robustos em Python e FastAPI.
            </p>
            <p className="animate-on-scroll text-text-secondary leading-relaxed">
              Tenho experiência com todo o ciclo de desenvolvimento: desde a
              concepção da ideia, modelagem do banco de dados, desenvolvimento
              da API, até a interface final entregue ao usuário com performance
              e acessibilidade.
            </p>

            <div className="animate-on-scroll grid grid-cols-2 gap-3 mt-6">
              {facts.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 p-3 rounded-lg bg-bg-card border border-border hover:border-accent-purple/30 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-accent-purple mt-0.5 shrink-0" />
                  <span className="text-sm text-text-secondary">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="animate-on-scroll grid grid-cols-2 gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="p-6 rounded-xl bg-bg-card border border-border hover:border-accent-purple/30 transition-all duration-300 group"
              >
                <p className="text-4xl font-bold text-gradient mb-2 group-hover:scale-105 transition-transform duration-200">
                  {value}
                </p>
                <p className="text-sm text-text-secondary">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
