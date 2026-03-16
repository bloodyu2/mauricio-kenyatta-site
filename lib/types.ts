export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string | null
  image: string | null
  image_alt: string | null
  categories: string[]
  categoryIds: string[]
  language: string | null
  featured: boolean | null
  minutesToRead: number | null
  status: string | null
  seo_title: string | null
  seo_description: string | null
  firstPublishedDate: string | null
  lastPublishedDate: string | null
}

export interface ServiceVariation {
  label: string       // e.g. "Graduação" | "Mestrado" | "Doutorado"
  priceLabel: string  // e.g. "R$1.000"
  description: string // e.g. "6 meses · 2 reuniões/mês"
}

export interface Service {
  id: string
  name: string
  slug: string
  category: string
  description: string
  tagline: string
  priceLabel: string
  icon: string
  duration: number // minutes
  hasVariations?: boolean
  variations?: ServiceVariation[]
}

export interface Artwork {
  id: string
  slug: string
  title: string
  description: string | null
  image_url: string
  price_cents: number
  price_label: string
  quantity: number
  active: boolean
  created_at: string
  updated_at: string
}
