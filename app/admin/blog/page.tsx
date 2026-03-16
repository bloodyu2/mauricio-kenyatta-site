import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminBlogClient from './AdminBlogClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin — Blog | Maurício Kenyatta' }

export default async function AdminBlogPage() {
  const supabase = await createClient()
  if (!supabase) redirect('/auth/login?next=/admin/blog')

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/admin/blog')

  const { data: profile } = await supabase
    .from('mk_profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'admin') redirect('/')

  const { data: posts } = await supabase
    .from('mk_blog_posts')
    .select('id, title, slug, status, language, categories, featured, first_published_date, created_at')
    .order('created_at', { ascending: false })

  return <AdminBlogClient posts={posts || []} />
}
