'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from './RichTextEditor'
import ImageUploader from './ImageUploader'
import { createClient } from '@/lib/supabase/client'

interface Post {
  id?: string
  slug?: string
  title?: string
  excerpt?: string | null
  content?: string | null
  image?: string | null
  image_alt?: string | null
  categories?: string[]
  language?: string | null
  status?: string | null
  featured?: boolean | null
  minutes_to_read?: number | null
  seo_title?: string | null
  seo_description?: string | null
  first_published_date?: string | null
}

interface Props {
  post?: Post | null
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function BlogPostEditor({ post }: Props) {
  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [slugLocked, setSlugLocked] = useState(!!post?.id)
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [image, setImage] = useState(post?.image ?? '')
  const [imageAlt, setImageAlt] = useState(post?.image_alt ?? '')
  const [categories, setCategories] = useState<string[]>(post?.categories ?? [])
  const [newCat, setNewCat] = useState('')
  const [language, setLanguage] = useState<'pt' | 'en'>((post?.language as 'pt' | 'en') ?? 'pt')
  const [featured, setFeatured] = useState(post?.featured ?? false)
  const [minutesToRead, setMinutesToRead] = useState<string>(post?.minutes_to_read?.toString() ?? '')
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? '')
  const [seoDescription, setSeoDescription] = useState(post?.seo_description ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!slugLocked && title) {
      setSlug(slugify(title))
    }
  }, [title, slugLocked])

  const addCategory = () => {
    const cat = newCat.trim()
    if (cat && !categories.includes(cat)) {
      setCategories(prev => [...prev, cat])
    }
    setNewCat('')
  }

  const handleSave = async (publishStatus: 'draft' | 'published') => {
    if (!title.trim()) { setError('O título é obrigatório'); return }
    if (!slug.trim()) { setError('O slug é obrigatório'); return }
    setSaving(true)
    setError('')

    const supabase = createClient()
    if (!supabase) { setError('Erro de configuração do Supabase'); setSaving(false); return }

    const now = new Date().toISOString()
    const payload: Record<string, unknown> = {
      slug: slug.trim(),
      title: title.trim(),
      excerpt: excerpt.trim() || null,
      content: content || null,
      image: image.trim() || null,
      image_alt: imageAlt.trim() || null,
      categories,
      language,
      status: publishStatus,
      featured,
      minutes_to_read: minutesToRead ? Number(minutesToRead) : null,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      last_published_date: now,
    }

    let result
    if (post?.id) {
      result = await supabase.from('mk_blog_posts').update(payload).eq('id', post.id)
    } else {
      result = await supabase.from('mk_blog_posts').insert({
        ...payload,
        first_published_date: now,
      })
    }

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
    } else {
      setSaved(true)
      setSaving(false)
      setTimeout(() => {
        setSaved(false)
        if (!post?.id) router.push('/admin/blog')
        else router.refresh()
      }, 1500)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className="text-sm text-slate-400 hover:text-blue-600 transition-colors mb-1 flex items-center gap-1"
          >
            ← Voltar para o blog
          </button>
          <h1 className="text-xl font-extrabold text-slate-900">
            {post?.id ? 'Editar Post' : 'Novo Post'}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="border-2 border-gray-300 text-gray-700 font-bold px-4 py-2 rounded-xl hover:bg-gray-50 disabled:opacity-50 text-sm"
          >
            {saving ? '...' : 'Salvar rascunho'}
          </button>
          <button
            type="button"
            onClick={() => handleSave('published')}
            disabled={saving}
            className="bg-blue-600 text-white font-bold px-5 py-2 rounded-xl hover:bg-blue-500 disabled:opacity-50 text-sm"
          >
            {saving ? 'Salvando...' : saved ? '✓ Salvo!' : 'Publicar'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Main */}
        <div className="space-y-5">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título do post *"
            className="w-full text-2xl font-extrabold border-0 border-b-2 border-gray-200 focus:border-blue-600 focus:outline-none py-2 text-slate-900 placeholder-gray-300"
          />

          {/* Slug */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 flex-shrink-0">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={e => { setSlug(e.target.value); setSlugLocked(true) }}
              className="flex-1 border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700"
            />
            {slugLocked && !post?.id && (
              <button
                type="button"
                onClick={() => { setSlugLocked(false); setSlug(slugify(title)) }}
                className="text-xs text-gray-400 hover:text-blue-600"
              >
                gerar auto
              </button>
            )}
          </div>

          {/* Editor */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Conteúdo</label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Escreva o conteúdo do artigo aqui..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Resumo (excerpt)</label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              rows={3}
              placeholder="Resumo breve exibido nos cards de blog..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Status indicator */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Status</h3>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
              post?.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {post?.status === 'published' ? '● Publicado' : '○ Rascunho'}
            </div>
            <p className="text-xs text-gray-400 mt-2">Use os botões no topo para publicar.</p>
          </div>

          {/* Cover Image */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Imagem de Capa</h3>
            <ImageUploader value={image} onChange={setImage} bucket="mk-blog-images" />
            {image && (
              <input
                type="text"
                value={imageAlt}
                onChange={e => setImageAlt(e.target.value)}
                placeholder="Texto alternativo (alt)..."
                className="mt-2 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs"
              />
            )}
          </div>

          {/* Categories */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Categorias</h3>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {categories.map(cat => (
                <span key={cat} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {cat}
                  <button type="button" onClick={() => setCategories(prev => prev.filter(c => c !== cat))} className="hover:text-red-500">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-1">
              <input
                type="text"
                value={newCat}
                onChange={e => setNewCat(e.target.value)}
                placeholder="Nova categoria..."
                className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addCategory() } }}
              />
              <button type="button" onClick={addCategory} className="bg-blue-600 text-white text-xs px-2 py-1.5 rounded-lg font-medium">+</button>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">SEO</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={seoTitle}
                onChange={e => setSeoTitle(e.target.value)}
                placeholder="Título SEO (padrão: título do post)"
                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs"
                maxLength={70}
              />
              <div className="text-right text-xs text-gray-300">{seoTitle.length}/70</div>
              <textarea
                value={seoDescription}
                onChange={e => setSeoDescription(e.target.value)}
                placeholder="Meta descrição SEO..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs resize-none"
                maxLength={160}
              />
              <div className="text-right text-xs text-gray-300">{seoDescription.length}/160</div>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Opções</h3>
            <div className="space-y-3">
              {/* Language toggle */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Idioma</label>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden text-xs">
                  <button
                    type="button"
                    onClick={() => setLanguage('pt')}
                    className={`flex-1 py-1.5 font-semibold transition-colors ${language === 'pt' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    PT Português
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`flex-1 py-1.5 font-semibold transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    EN English
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={e => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm text-gray-700">Destaque (featured)</span>
              </label>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Tempo de leitura (min)</label>
                <input
                  type="number"
                  value={minutesToRead}
                  onChange={e => setMinutesToRead(e.target.value)}
                  min="1"
                  max="120"
                  placeholder="Ex: 8"
                  className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
