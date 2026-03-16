'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

interface Props {
  value: string
  onChange: (url: string) => void
  bucket: string
  folder?: string
}

export default function ImageUploader({ value, onChange, bucket, folder = 'blog' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setUploading(true)
    setError('')
    const supabase = createClient()
    if (!supabase) {
      setError('Supabase não configurado')
      setUploading(false)
      return
    }
    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `${folder}/${Date.now()}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filename, file, { upsert: true })

    if (uploadError) {
      setError(uploadError.message)
    } else {
      const { data } = supabase.storage.from(bucket).getPublicUrl(filename)
      onChange(data.publicUrl)
    }
    setUploading(false)
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
          <Image src={value} alt="Imagem de capa" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-white/80 text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-white"
          >✕</button>
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="URL da imagem de capa..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          title="Fazer upload"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 flex-shrink-0"
        >
          {uploading ? '⏳' : '📁 Upload'}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const f = e.target.files?.[0]
          if (f) handleUpload(f)
          e.target.value = ''
        }}
      />
    </div>
  )
}
