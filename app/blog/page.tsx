import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Blog posts",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p>Coming soon...</p>
      </div>
    </main>
  );
}
