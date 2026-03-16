export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string | null
  firstPublishedDate: string | null
  lastPublishedDate: string | null
  featured: boolean | null
  minutesToRead: number | null
  categoryIds: string[]
  categories: string[]
  language: string | null
  image: string | null
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
