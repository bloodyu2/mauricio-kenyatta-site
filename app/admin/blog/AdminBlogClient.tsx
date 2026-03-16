'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Post = {
  id: string
  title: string
  slug: string
  status: string
  language: string | null
  categories: string[]
  featured: boolean
  first_published_date: string | null
  created_at: string
}

interface Props {
  posts: Post[]
}

export default function AdminBlogClient({ posts: initialPosts }: Props) {
  const [posts, setPosts] = useState(initialPosts)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [langFilter, setLangFilter] = useState<'all' | 'pt' | 'en'>('all')
  const [loading, setLoading] = useState<string | null>(null)

  const filtered = posts.filter(p => {
    if (filter === 'published' && p.status !== 'published') return false
    if (filter === 'draft' && p.status !== 'draft') return false
    if (langFilter === 'pt' && p.language === 'en') return false
    if (langFilter === 'en' && p.language !== 'en') return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const toggleStatus = async (id: string, currentStatus: string) => {
    setLoading(id)
    const supabase = createClient()
    if (!supabase) return
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    const { error } = await supabase
      .from('mk_blog_posts')
      .update({ status: newStatus, last_published_date: new Date().toISOString() })
      .eq('id', id)
    if (!error) {
      setPosts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
    }
    setLoading(null)
  }

  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Excluir "${title}"?\n\nEsta ação não pode ser desfeita.`)) return
    setLoading(id)
    const supabase = createClient()
    if (!supabase) return
    const { error } = await supabase.from('mk_blog_posts').delete().eq('id', id)
    if (!error) {
      setPosts(prev => prev.filter(p => p.id !== id))
    }
    setLoading(null)
  }

  const publishedCount = posts.filter(p => p.status === 'published').length
  const draftCount = posts.filter(p => p.status === 'draft').length

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Blog</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {publishedCount} publicados · {draftCount} rascunhos
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-blue-500 transition-colors text-sm"
        >
          + Novo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por título..."
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm flex-1 min-w-[200px] focus:outline-none focus:border-blue-600"
        />
        <div className="flex border border-gray-200 rounded-xl overflow-hidden text-sm">
          {(['all', 'published', 'draft'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 font-medium transition-colors ${
                filter === f ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'published' ? 'Publicados' : 'Rascunhos'}
            </button>
          ))}
        </div>
        <div className="flex border border-gray-200 rounded-xl overflow-hidden text-sm">
          {(['all', 'pt', 'en'] as const).map(l => (
            <button
              key={l}
              onClick={() => setLangFilter(l)}
              className={`px-3 py-2 font-medium transition-colors ${
                langFilter === l ? 'bg-slate-800 text-white' : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {l === 'all' ? 'PT + EN' : l === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Título</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Idioma</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Data</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(post => (
              <tr key={post.id} className={`hover:bg-gray-50 transition-colors ${loading === post.id ? 'opacity-50' : ''}`}>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">/blog/{post.slug}</div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.status === 'published' ? '● Publicado' : '○ Rascunho'}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs text-gray-500">
                    {post.language === 'en' ? '🇺🇸 EN' : '🇧🇷 PT'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">
                  {post.first_published_date
                    ? new Date(post.first_published_date).toLocaleDateString('pt-BR')
                    : new Date(post.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => toggleStatus(post.id, post.status)}
                      disabled={loading === post.id}
                      className="text-xs font-semibold text-gray-500 hover:text-blue-600 disabled:opacity-50 transition-colors"
                    >
                      {post.status === 'published' ? 'Despublicar' : 'Publicar'}
                    </button>
                    <button
                      onClick={() => deletePost(post.id, post.title)}
                      disabled={loading === post.id}
                      className="text-xs font-semibold text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  {search ? 'Nenhum post encontrado para essa busca.' : 'Nenhum post ainda.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">← Voltar ao site</Link>
      </div>
    </div>
  )
}
