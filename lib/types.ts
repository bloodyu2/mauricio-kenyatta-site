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
