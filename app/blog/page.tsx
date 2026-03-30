import Link from 'next/link';
import { getAllPosts } from '@/lib/airtable';

export const metadata = {
  title: 'Blog | OCC Origin Coffee Crafter',
  description: 'Specialty coffee insights, barista training guides, and origin stories from Cambodia.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-light tracking-widest uppercase text-neutral-900 mb-4">
          Field Notes
        </h1>
        <p className="text-neutral-500 text-sm tracking-wide mb-16">
          Insights from the source.
        </p>

        {posts.length === 0 ? (
          <p className="text-neutral-400">No posts published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article>
                  {post.cover_image && (
                    <div className="overflow-hidden mb-5">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  {post.category && (
                    <span className="text-xs tracking-widest uppercase text-neutral-400">
                      {post.category}
                    </span>
                  )}
                  <h2 className="text-xl font-medium text-neutral-900 mt-2 mb-3 group-hover:text-neutral-600 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-4 text-xs text-neutral-400 tracking-wide">
                    {post.publish_date && (
                      <span>{new Date(post.publish_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    )}
                    {post.author && <span className="ml-4">{post.author}</span>}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
