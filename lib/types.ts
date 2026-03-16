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
}
