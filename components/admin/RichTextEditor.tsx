'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExt from '@tiptap/extension-link'
import ImageExt from '@tiptap/extension-image'
import { Link2, Image } from 'lucide-react'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useState } from 'react'

interface Props {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`px-2 py-1 rounded text-sm font-medium transition-colors min-w-[28px] ${
        active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
      } disabled:opacity-30`}
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Escreva o conteúdo do artigo...',
}: Props) {
  const [imageUrl, setImageUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExt.configure({ inline: false }),
      LinkExt.configure({
        openOnClick: false,
        HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none min-h-[320px] p-4 prose-headings:text-slate-900 prose-a:text-blue-600',
      },
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '', { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  if (!editor) return null

  const insertImage = () => {
    if (!imageUrl.trim()) return
    editor.chain().focus().setImage({ src: imageUrl }).run()
    setImageUrl('')
    setShowImageInput(false)
  }

  const insertLink = () => {
    if (!linkUrl.trim()) {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run()
    }
    setLinkUrl('')
    setShowLinkInput(false)
  }

  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-gray-50 border-b border-gray-200">
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          title="Título 1"
        >H1</Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="Título 2"
        >H2</Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="Título 3"
        >H3</Btn>
        <span className="w-px h-5 bg-gray-300 mx-1" />
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Negrito">
          <strong>B</strong>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Itálico">
          <em>I</em>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Riscado">
          <s>S</s>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Código inline">
          {'<>'}
        </Btn>
        <span className="w-px h-5 bg-gray-300 mx-1" />
        <Btn
          onClick={() => { setShowLinkInput(!showLinkInput); setShowImageInput(false) }}
          active={editor.isActive('link')}
          title="Inserir link"
        ><Link2 size={14} /></Btn>
        <Btn
          onClick={() => { setShowImageInput(!showImageInput); setShowLinkInput(false) }}
          title="Inserir imagem"
        ><Image size={14} /></Btn>
        <span className="w-px h-5 bg-gray-300 mx-1" />
        <Btn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Lista com marcadores"
        >•—</Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Lista numerada"
        >1.</Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Citação"
        >"</Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          title="Bloco de código"
        >```</Btn>
        <span className="w-px h-5 bg-gray-300 mx-1" />
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divisor">—</Btn>
        <span className="w-px h-5 bg-gray-300 mx-1" />
        <Btn
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Desfazer"
        >↩</Btn>
        <Btn
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Refazer"
        >↪</Btn>
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className="flex gap-2 p-2 bg-blue-50 border-b border-gray-200">
          <input
            type="url"
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
            onKeyDown={e => e.key === 'Enter' && insertLink()}
            autoFocus
          />
          <button type="button" onClick={insertLink} className="bg-blue-600 text-white text-sm px-3 py-1 rounded font-medium">
            Inserir
          </button>
          <button type="button" onClick={() => setShowLinkInput(false)} className="text-gray-500 text-sm px-2 py-1 rounded hover:bg-gray-200">✕</button>
        </div>
      )}

      {/* Image URL input */}
      {showImageInput && (
        <div className="flex gap-2 p-2 bg-green-50 border-b border-gray-200">
          <input
            type="url"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="URL da imagem..."
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
            onKeyDown={e => e.key === 'Enter' && insertImage()}
            autoFocus
          />
          <button type="button" onClick={insertImage} className="bg-blue-600 text-white text-sm px-3 py-1 rounded font-medium">
            Inserir
          </button>
          <button type="button" onClick={() => setShowImageInput(false)} className="text-gray-500 text-sm px-2 py-1 rounded hover:bg-gray-200">✕</button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  )
}
