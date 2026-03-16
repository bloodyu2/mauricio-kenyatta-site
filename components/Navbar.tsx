"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/arte", label: "Arte" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Logo — left */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <Logo size="sm" />
          <span className="font-bold text-sm text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors hidden sm:block leading-tight">
            Maurício<br />
            <span className="text-blue-600">Kenyatta</span>
          </span>
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-sm"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger — right */}
        <div className="flex items-center gap-2 justify-end">
          <Link
            href="/servicos"
            className="hidden md:inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            Agendar
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 flex flex-col gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <span
              className={`block w-5 h-0.5 bg-slate-700 transition-transform duration-200 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-700 transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-700 transition-transform duration-200 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium py-2.5 px-3 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/servicos"
            className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-3 rounded-lg text-center transition-colors"
            onClick={() => setOpen(false)}
          >
            Agendar Mentoria
          </Link>
        </div>
      )}
    </header>
  );
}
