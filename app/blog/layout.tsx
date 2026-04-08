import BlogScrollToContent from "./BlogScrollToContent"

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogScrollToContent />
      {children}
    </>
  )
}
