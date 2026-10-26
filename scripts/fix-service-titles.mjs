import mongoose from 'mongoose'
import { connectDB } from '../lib/mongodb.js'
import { formatServiceTitle } from '../lib/formatServiceTitle.js'
import { formatHeadingText } from '../lib/headingText.js'
import { replaceEmDashInText } from '../lib/replaceEmDash.js'
import { Service } from '../lib/models/Service.js'

async function main() {
  await connectDB()
  const docs = await Service.find()
  let updated = 0
  for (const doc of docs) {
    let changed = false
    if (doc.slug === 'process-serving' && doc.clientSuppliedNote) {
      doc.clientSuppliedNote = ''
      changed = true
      console.log(`Cleared clientSuppliedNote on ${doc.slug}`)
    }
    for (const field of ['title', 'short', 'summary', 'clientSuppliedNote']) {
      if (doc[field]) {
        const next = replaceEmDashInText(doc[field])
        if (field === 'title') {
          const formatted = formatHeadingText(formatServiceTitle(next))
          if (formatted !== doc[field]) {
            doc[field] = formatted
            changed = true
          }
        } else if (next !== doc[field]) {
          doc[field] = next
          changed = true
        }
      }
    }
    if (Array.isArray(doc.body)) {
      const nextBody = doc.body.map((p) => replaceEmDashInText(p))
      if (nextBody.some((p, i) => p !== doc.body[i])) {
        doc.body = nextBody
        changed = true
        console.log(`Em dash → comma in body: ${doc.slug}`)
      }
    }
    if (changed) {
      await doc.save()
      updated += 1
    }
  }
  console.log(`Done. ${updated} service record(s) updated.`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
