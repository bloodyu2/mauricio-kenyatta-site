import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/constants";
import { Globe } from "lucide-react";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white ${
        featured ? "md:flex" : ""
      }`}
    >
      <div
        className={`relative bg-gray-100 ${
          featured ? "md:w-2/5 h-52 md:h-auto" : "h-48"
        }`}
      >
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-50">
            <Globe size={40} className="text-[#f59e0b] opacity-50" />
          </div>
        )}
      </div>

      <div className={`p-5 ${featured ? "md:w-3/5 flex flex-col justify-center" : ""}`}>
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {post.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
              >
                {cat}
              </span>
            ))}
            {post.language === "en" && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">EN</span>
            )}
          </div>
        )}

        <h3
          className={`font-bold text-gray-900 group-hover:text-slate-600 transition-colors line-clamp-2 mb-2 ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-3 text-xs text-gray-400">
          {post.firstPublishedDate && (
            <span>{formatDate(post.firstPublishedDate)}</span>
          )}
          {post.minutesToRead && (
            <span>· {post.minutesToRead} min</span>
          )}
        </div>
      </div>
    </Link>
  );
}
