"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-primary/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("#hero")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-accent-purple flex items-center justify-center group-hover:bg-accent-cyan transition-colors duration-300">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-mono font-bold text-text-primary">
            dev<span className="text-accent-purple">.</span>portfolio
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    active === id
                      ? "text-accent-purple bg-accent-purple/10"
                      : "text-text-secondary hover:text-text-primary hover:bg-border"
                  )}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
          <li>
            <a
              href="https://github.com/seuusername"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-accent-purple/80 transition-colors duration-200"
            >
              GitHub
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-bg-secondary border-b border-border">
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-border transition-all duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
