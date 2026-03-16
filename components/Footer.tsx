import Link from "next/link";
import { SITE_NAME, CONTACT_EMAIL, INSTAGRAM, LINKEDIN } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-400 pt-12 pb-6">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="text-white font-bold text-lg mb-3">{SITE_NAME}</div>
          <p className="text-sm leading-relaxed mb-4">
            Doutorando em Relações Internacionais pela UnB. Mentoria acadêmica e
            consultoria em RI — do projeto à defesa.
          </p>
          {/* Social */}
          <div className="flex gap-3">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1e293b] border border-[#334155] hover:border-blue-500 hover:text-blue-400 transition-colors text-sm font-bold"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1e293b] border border-[#334155] hover:border-blue-500 hover:text-blue-400 transition-colors text-sm font-bold"
              aria-label="LinkedIn"
            >
              IN
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div className="font-semibold text-white mb-3 text-sm">Navegação</div>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Início" },
              { href: "/servicos", label: "Serviços" },
              { href: "/blog", label: "Blog" },
              { href: "/sobre", label: "Sobre" },
              { href: "/contato", label: "Contato" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-semibold text-white mb-3 text-sm">Contato</div>
          <div className="space-y-2 text-sm">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hover:text-white transition-colors block break-all"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-xs text-slate-500 leading-relaxed mt-3">
              SEPN 707/907, Bloco C
              <br />
              Asa Norte, Brasília — DF
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-6 border-t border-[#1e293b] text-center text-xs text-slate-600">
        © {year} {SITE_NAME}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
