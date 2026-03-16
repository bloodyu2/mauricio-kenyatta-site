import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import BlogPostEditor from '@/components/admin/BlogPostEditor'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Editar Post — Blog Admin | Maurício Kenyatta' }

interface Props { params: Promise<{ id: string }> }

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params
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

  const { data: post } = await supabase
    .from('mk_blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) notFound()

  return <BlogPostEditor post={post} />
}
