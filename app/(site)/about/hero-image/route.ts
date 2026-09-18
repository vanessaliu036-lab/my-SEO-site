import chunk1 from "./chunks/1"
import chunk2 from "./chunks/2"
import chunk3 from "./chunks/3"
import chunk4 from "./chunks/4"
import chunk5 from "./chunks/5"

export const runtime = "nodejs"
export const dynamic = "force-static"

export function GET() {
  const image = Buffer.from(chunk1 + chunk2 + chunk3 + chunk4 + chunk5, "base64")

  return new Response(image, {
    headers: {
      "Content-Type": "image/avif",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
