import { connectDB } from '../../lib/mongodb.js'
import { requireAdmin } from '../../lib/auth.js'
import { Service } from '../../lib/models/Service.js'
import { seedIfEmpty } from '../../lib/seedContent.js'
import { serviceToPublic } from '../../lib/serviceDto.js'
import { deleteStoredUploadByUrl } from '../../lib/deleteUpload.js'

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  try {
    await connectDB()
    await seedIfEmpty()

    if (req.method === 'GET') {
      const docs = await Service.find().sort({ sortOrder: 1, title: 1 })
      res.status(200).json({
        success: true,
        services: docs.map((d) => ({ ...serviceToPublic(d), _id: d._id.toString(), published: d.published })),
      })
      return
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const slug = body.slug || slugify(body.title)
      if (!slug || !body.title) {
        res.status(400).json({ success: false, error: 'Title is required' })
        return
      }
      const exists = await Service.findOne({ slug })
      if (exists) {
        res.status(409).json({ success: false, error: 'Service slug already exists' })
        return
      }
      const doc = await Service.create({
        slug,
        number: body.number || '01',
        title: body.title,
        short: body.short || '',
        anchor: body.anchor || slug,
        summary: body.summary || '',
        body: body.body || [],
        clientSuppliedNote: body.clientSuppliedNote || '',
        imageUrl: body.imageUrl || '',
        imageKey: body.imageKey || '',
        featured: body.featured !== false,
        sortOrder: body.sortOrder ?? 0,
        published: body.published !== false,
      })
      res.status(201).json({ success: true, service: { ...serviceToPublic(doc), _id: doc._id.toString() } })
      return
    }

    res.status(405).json({ success: false, error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Request failed' })
  }
}

async function updateService(req, res, id) {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const doc = await Service.findById(id)
  if (!doc) {
    res.status(404).json({ success: false, error: 'Not found' })
    return
  }

  if (body.imageUrl !== undefined && body.imageUrl !== doc.imageUrl && doc.imageUrl) {
    await deleteStoredUploadByUrl(doc.imageUrl)
  }

  if (body.title !== undefined) doc.title = body.title
  if (body.number !== undefined) doc.number = body.number
  if (body.short !== undefined) doc.short = body.short
  if (body.anchor !== undefined) doc.anchor = body.anchor
  if (body.summary !== undefined) doc.summary = body.summary
  if (body.body !== undefined) doc.body = body.body
  if (body.clientSuppliedNote !== undefined) doc.clientSuppliedNote = body.clientSuppliedNote
  if (body.imageUrl !== undefined) doc.imageUrl = body.imageUrl
  if (body.imageKey !== undefined) doc.imageKey = body.imageKey
  if (body.featured !== undefined) doc.featured = body.featured
  if (body.sortOrder !== undefined) doc.sortOrder = body.sortOrder
  if (body.published !== undefined) doc.published = body.published
  if (body.slug !== undefined) doc.slug = body.slug

  await doc.save()
  res.status(200).json({ success: true, service: { ...serviceToPublic(doc), _id: doc._id.toString() } })
}

async function deleteService(req, res, id) {
  const doc = await Service.findById(id)
  if (!doc) {
    res.status(404).json({ success: false, error: 'Not found' })
    return
  }
  if (doc.imageUrl) await deleteStoredUploadByUrl(doc.imageUrl)
  await doc.deleteOne()
  res.status(200).json({ success: true })
}

export { updateService, deleteService }
