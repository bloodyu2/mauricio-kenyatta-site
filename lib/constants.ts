// Shared constants and pure utilities — safe to import in both server and client components
export const SITE_NAME = "Maurício Kenyatta";
export const SITE_DESCRIPTION =
  "Transforme sua trajetória acadêmica e profissional. Mentoria e consultoria de Maurício Kenyatta, professor e pesquisador em Relações Internacionais.";
export const WIX_BLOG_BASE = "https://www.kenyatta.com.br/blog";
export const CONTACT_EMAIL = "mauricio@kenyatta.com.br";
export const SITE_URL = "https://www.kenyatta.com.br";
export const INSTAGRAM = "https://www.instagram.com/mauricio.kenyatta/";
export const LINKEDIN =
  "https://www.linkedin.com/in/maur%C3%ADcio-kenyatta-barros-da-costa/";
export const WHATSAPP_NUMBER = "556196977745"; // +55 61 9697-7745

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
