/** Display title: one-line friendly, fixes legacy comma after "Tenant". */
export function formatServiceTitle(title) {
  if (!title || typeof title !== 'string') return title
  return title
    .replace(/Tenant,\s*Applicant/gi, 'Tenant Applicant')
    .replace(/\s+/g, ' ')
    .trim()
}
