"use client";

import { useRef, useEffect, useState } from "react";
import { Send, Mail, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react";
import { API_URL } from "@/lib/utils";
import type { ContactMessage } from "@/types";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<ContactMessage>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".animate-on-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary placeholder-text-muted font-mono text-sm focus:outline-none focus:border-accent-purple/60 focus:ring-1 focus:ring-accent-purple/30 transition-all duration-200";

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-12">
          <span className="font-mono text-accent-cyan text-sm">// contato</span>
          <h2 className="text-4xl font-bold mt-2">
            Vamos <span className="text-gradient">Conversar?</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg">
            Tem um projeto em mente ou quer bater um papo sobre tecnologia?
            Manda uma mensagem!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="animate-on-scroll lg:col-span-2 space-y-6">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "thiagodiovennne@gmail.com",
                href: "mailto:thiagodiovennne@gmail.com",
              },
              {
                icon: Github,
                label: "GitHub",
                value: "github.com/thiagotg75",
                href: "https://github.com/thiagotg75",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "linkedin.com/in/thiago-diovanne",
                href: "https://linkedin.com/in/thiago-diovanne",
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-border hover:border-accent-purple/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center group-hover:bg-accent-purple/20 transition-colors duration-200">
                  <Icon className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-mono">{label}</p>
                  <p className="text-sm text-text-primary font-medium">{value}</p>
                </div>
              </a>
            ))}

            <div className="p-5 rounded-xl bg-bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-text-secondary">Disponível para freela</span>
              </div>
              <p className="text-xs text-text-muted">
                Respondo geralmente em menos de 24 horas nos dias úteis.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="animate-on-scroll lg:col-span-3 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2">
                  name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-text-muted mb-2">
                subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Sobre o que você quer falar?"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-text-muted mb-2">
                message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Sua mensagem..."
                required
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 rounded-xl bg-accent-purple text-white font-medium flex items-center justify-center gap-2 hover:bg-accent-purple/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </>
              )}
            </button>

            {status === "success" && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4 shrink-0" />
                Mensagem enviada! Responderei em breve.
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Erro ao enviar. Tente via email diretamente.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
