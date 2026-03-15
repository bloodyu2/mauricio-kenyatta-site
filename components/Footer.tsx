import Link from "next/link";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400 pt-10 pb-6">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="text-white font-bold text-lg mb-2">{SITE_NAME}</div>
          <p className="text-sm">
            Análises de política internacional, geopolítica e diplomacia brasileira.
          </p>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Navegação</div>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Início" },
              { href: "/blog", label: "Blog" },
              { href: "/sobre", label: "Sobre" },
              { href: "/contato", label: "Contato" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Contato</div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm hover:text-white transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
        © {year} {SITE_NAME}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
