import { revalidatePath } from 'next/cache'

const MONDULKIRI_OWNER_PATH = '/blog/mondulkiri-next-specialty-coffee-origin'

export async function GET() {
  revalidatePath(MONDULKIRI_OWNER_PATH)
  return Response.json({ revalidated: true, path: MONDULKIRI_OWNER_PATH })
}
