import { useMemo, useState } from 'react'
import { featuredServices } from '../data/services'
import { brand } from '../data/brand'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function buildMailto({ name, email, phone, service, message }) {
  const subject = encodeURIComponent(`Inquiry — ${brand.name} (${service || 'General'})`)
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Service of interest: ${service || 'Not specified'}`,
    '',
    'Message:',
    message,
  ].filter(Boolean)
  const body = encodeURIComponent(bodyLines.join('\n'))
  return `${brand.mailto}?subject=${subject}&body=${body}`
}

function buildPlainInquiry(form) {
  return [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone ? `Phone: ${form.phone}` : null,
    `Service: ${form.service || 'Not specified'}`,
    '',
    form.message,
  ]
    .filter(Boolean)
    .join('\n')
}

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [copyState, setCopyState] = useState('idle')

  const serviceOptions = useMemo(
    () => [{ value: '', label: 'Select a service (optional)' }, ...featuredServices.map((s) => ({ value: s.title, label: s.title })), { value: 'General inquiry', label: 'General inquiry' }],
    [],
  )

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!emailPattern.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (!form.message.trim()) next.message = 'Please include a brief message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const mailto = buildMailto(form)
    window.location.href = mailto
  }

  const onCopy = async () => {
    if (!validate()) return
    try {
      await navigator.clipboard.writeText(buildPlainInquiry(form))
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2500)
    } catch {
      setCopyState('failed')
      setTimeout(() => setCopyState('idle'), 2500)
    }
  }

  const field = (id, label, required = false) => ({
    id,
    label,
    required,
    error: errors[id],
    value: form[id],
    onChange: (e) => {
      setForm((f) => ({ ...f, [id]: e.target.value }))
      if (errors[id]) setErrors((err) => ({ ...err, [id]: undefined }))
    },
  })

  const nameField = field('name', 'Name', true)
  const emailField = field('email', 'Email', true)
  const phoneField = field('phone', 'Phone (optional)')
  const messageField = field('message', 'Brief message', true)

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <p className="text-sm leading-relaxed text-text-muted">
        This form opens your email application. Send the prepared email there to complete your
        inquiry.
      </p>
      <p className="text-xs leading-relaxed text-text-muted">
        Please do not include sensitive documents or confidential case details in an initial
        inquiry.
      </p>

      {[
        { ...nameField, type: 'text', autoComplete: 'name' },
        { ...emailField, type: 'email', autoComplete: 'email' },
        { ...phoneField, type: 'tel', autoComplete: 'tel' },
      ].map(({ id, label, required, error, value, onChange, type, autoComplete }) => (
        <div key={id}>
          <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-[0.2em] text-text-muted">
            {label}
            {required ? <span className="text-gold"> *</span> : null}
          </label>
          <input
            id={id}
            name={id}
            type={type}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className="w-full border border-white/10 bg-bg-main px-4 py-3.5 text-sm text-text-primary transition-colors focus:border-gold/50"
          />
          {error ? (
            <p id={`${id}-error`} className="mt-2 text-xs text-gold-light" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      ))}

      <div>
        <label htmlFor="service" className="mb-2 block text-xs uppercase tracking-[0.2em] text-text-muted">
          Service of interest
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
          className="w-full border border-white/10 bg-bg-main px-4 py-3.5 text-sm text-text-primary"
        >
          {serviceOptions.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.2em] text-text-muted">
          Brief message<span className="text-gold"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={messageField.value}
          onChange={messageField.onChange}
          aria-invalid={Boolean(messageField.error)}
          aria-describedby={messageField.error ? 'message-error' : undefined}
          className="w-full resize-y border border-white/10 bg-bg-main px-4 py-3.5 text-sm text-text-primary focus:border-gold/50"
        />
        {messageField.error ? (
          <p id="message-error" className="mt-2 text-xs text-gold-light" role="alert">
            {messageField.error}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          className="rounded-sm btn-gold-fill px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-bg-main transition-[filter] hover:brightness-105"
        >
          Prepare Email
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-sm border border-white/15 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-primary transition-colors hover:border-gold/40 hover:text-gold"
        >
          {copyState === 'copied'
            ? 'Copied to clipboard'
            : copyState === 'failed'
              ? 'Copy failed — try manually'
              : 'Copy Inquiry'}
        </button>
      </div>
    </form>
  )
}
