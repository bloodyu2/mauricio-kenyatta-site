import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BlogPostEditor from '@/components/admin/BlogPostEditor'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Novo Post — Blog Admin | Maurício Kenyatta' }

export default async function NewBlogPostPage() {
  const supabase = await createClient()
  if (!supabase) redirect('/auth/login?next=/admin/blog/new')

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/admin/blog/new')

  const { data: profile } = await supabase
    .from('mk_profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'admin') redirect('/')

  return <BlogPostEditor post={null} />
}
