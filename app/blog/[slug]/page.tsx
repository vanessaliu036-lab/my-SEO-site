import { getPostBySlug, getAllPosts } from '@/lib/airtable';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | OCC Origin Coffee Crafter`,
    description: post.excerpt,
    keywords: post.keywords,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {post.cover_image && (
        <div className="w-full h-72 md:h-96 overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {post.category && (
          <span className="text-xs tracking-widest uppercase text-neutral-400">
            {post.category}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-light text-neutral-900 mt-3 mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-6 text-xs text-neutral-400 tracking-wide mb-12 pb-8 border-b border-neutral-100">
          {post.publish_date && (
            <span>
              {new Date(post.publish_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          {post.author && <span>{post.author}</span>}
        </div>
        <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
        <div className="mt-20 pt-8 border-t border-neutral-100">
          
            href="/blog"
            className="text-sm tracking-widest uppercase text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            ← Back to Field Notes
          </a>
        </div>
      </div>
    </main>
  );
}
