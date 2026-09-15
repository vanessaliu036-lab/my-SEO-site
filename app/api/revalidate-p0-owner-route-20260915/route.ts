import { revalidatePath } from 'next/cache'

const SUPPLIER_OWNER_PATH =
  '/blog/evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability'

function revalidateSupplierOwner() {
  revalidatePath(SUPPLIER_OWNER_PATH)
  return Response.json({ revalidated: true, path: SUPPLIER_OWNER_PATH })
}

export async function GET() {
  return revalidateSupplierOwner()
}

export async function POST() {
  return revalidateSupplierOwner()
}
