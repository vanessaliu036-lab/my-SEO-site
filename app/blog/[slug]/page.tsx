export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1>Blog Post: {params.slug}</h1>
        <p>Coming soon...</p>
      </div>
    </main>
  );
}
