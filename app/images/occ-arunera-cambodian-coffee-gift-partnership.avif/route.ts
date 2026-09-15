import { partnershipImageChunk1 } from "@/lib/assets/partnership-image-chunk-1"
import { partnershipImageChunk2 } from "@/lib/assets/partnership-image-chunk-2"
import { partnershipImageChunk3 } from "@/lib/assets/partnership-image-chunk-3"

const imageBytes = Buffer.from(
  partnershipImageChunk1 + partnershipImageChunk2 + partnershipImageChunk3,
  "base64",
)

export const dynamic = "force-static"

export function GET() {
  return new Response(imageBytes, {
    headers: {
      "Content-Type": "image/avif",
      "Content-Length": String(imageBytes.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
