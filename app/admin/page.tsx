import { revalidatePath } from 'next/cache'
import AdminDashboard from './AdminDashboard'
import { fetchContactLeads, updateContactLead, convertContactLead } from '@/lib/admin-contact-inbox.mjs'
import { fetchOrderInbox, updateOrderInboxEntry } from '@/lib/admin-order-inbox.mjs'

export const dynamic = 'force-dynamic'

async function orderInboxAction(formData: FormData) {
  'use server'
  const id = String(formData.get('id') || '')
  const action = String(formData.get('action') || '')
  if (action === 'read') await updateOrderInboxEntry(id, { readStatus: 'Read' })
  if (action === 'unread') await updateOrderInboxEntry(id, { readStatus: 'Unread' })
  if (action === 'priority') await updateOrderInboxEntry(id, { priority: String(formData.get('value') || '') })
  if (action === 'reviewing') await updateOrderInboxEntry(id, { inboxStatus: 'Reviewing', readStatus: 'Read' })
  if (action === 'converted') await updateOrderInboxEntry(id, { inboxStatus: 'Converted', readStatus: 'Read' })
  revalidatePath('/admin')
}

async function contactInboxAction(formData: FormData) {
  'use server'
  const id = String(formData.get('id') || '')
  const action = String(formData.get('action') || '')
  if (action === 'read') await updateContactLead(id, { readStatus: 'Read' })
  if (action === 'unread') await updateContactLead(id, { readStatus: 'Unread' })
  if (action === 'priority') await updateContactLead(id, { priority: String(formData.get('value') || '') })
  if (action === 'discussion') await updateContactLead(id, { status: 'In Discussion', readStatus: 'Read' })
  if (action === 'account' || action === 'contact' || action === 'quote') await convertContactLead(id, action)
  revalidatePath('/admin')
}

export default async function AdminPage() {
  const [ordersResult, contactsResult] = await Promise.allSettled([
    fetchOrderInbox({ limit: 100 }),
    fetchContactLeads({ limit: 100 }),
  ])

  return (
    <AdminDashboard
      initialOrders={ordersResult.status === 'fulfilled' ? ordersResult.value : []}
      initialContacts={contactsResult.status === 'fulfilled' ? contactsResult.value : []}
      orderInboxError={ordersResult.status === 'rejected'}
      contactInboxError={contactsResult.status === 'rejected'}
      orderInboxAction={orderInboxAction}
      contactInboxAction={contactInboxAction}
    />
  )
}
