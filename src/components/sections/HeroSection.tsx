"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";

const TYPING_TEXTS = [
  "Full-Stack Developer",
  "React & Next.js Expert",
  "Python Backend Dev",
  "UI/UX Enthusiast",
];

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  // Typing effect
  useEffect(() => {
    const current = TYPING_TEXTS[textIndex];
    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((i) => (i + 1) % TYPING_TEXTS.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  // Terminal boot sequence
  useEffect(() => {
    const lines = [
      "$ whoami",
      "> Desenvolvedor Full-Stack apaixonado por código",
      "$ ls skills/",
      "> React  Next.js  TypeScript  Python  FastAPI  PostgreSQL",
      "$ git status",
      "> Pronto para novos projetos ✓",
    ];

    lines.forEach((line, i) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, line]);
      }, i * 400);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-accent-cyan/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-purple/30 bg-accent-purple/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono text-accent-purple-light">
              Disponível para projetos
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Olá, eu sou{" "}
            <span className="text-gradient block">Thiago Diovanne</span>
          </h1>

          <div className="h-8 mb-6">
            <span className="text-xl text-text-secondary font-mono">
              {displayText}
              <span className="animate-blink text-accent-cyan">|</span>
            </span>
          </div>

          <p className="text-text-secondary leading-relaxed mb-8 max-w-lg">
            Criando experiências digitais incríveis com código limpo e design
            moderno. Especializado em React, Next.js e backends Python robustos.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 rounded-xl bg-accent-purple text-white font-medium hover:bg-accent-purple/80 transition-all duration-200 hover:shadow-lg hover:shadow-accent-purple/25"
            >
              Ver Projetos
            </button>
            <a
              href="/cv.pdf"
              download
              className="px-6 py-3 rounded-xl border border-border text-text-secondary hover:text-text-primary hover:border-accent-purple/50 transition-all duration-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>

          <div className="flex items-center gap-4 mt-8">
            {[
              {
                icon: Github,
                href: "https://github.com/thiagotg75",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://linkedin.com/in/thiago-diovanne",
                label: "LinkedIn",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-accent-purple hover:border-accent-purple transition-all duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Terminal */}
        <div className="relative">
          <div className="rounded-xl border border-border bg-bg-card overflow-hidden shadow-2xl shadow-black/50">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-secondary">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs font-mono text-text-muted">
                terminal — portfolio
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono text-sm min-h-[280px]">
              {terminalLines.map((line, i) => (
                <div key={i} className="mb-1">
                  {line.startsWith("$") ? (
                    <span className="text-accent-cyan">{line}</span>
                  ) : (
                    <span className="text-text-secondary">{line}</span>
                  )}
                </div>
              ))}
              {terminalLines.length < 6 && (
                <span className="text-accent-cyan animate-blink">▊</span>
              )}
            </div>
          </div>

          {/* Floating tech badges */}
          <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg bg-bg-card border border-border text-xs font-mono text-accent-purple animate-float">
            Next.js 14
          </div>
          <div
            className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-lg bg-bg-card border border-border text-xs font-mono text-accent-cyan animate-float"
            style={{ animationDelay: "2s" }}
          >
            Python FastAPI
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-text-muted" />
      </div>
    </section>
  );
}
