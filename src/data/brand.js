/** Single source for public contact details (footer, contact page, mailto form). */
export const brandContact = {
  email: 'info@mannixlegal.com',
  mailto: 'mailto:info@mannixlegal.com',
  /** Display format — do not use raw digits on the site */
  phone: '(942) 444-9422',
  phoneTel: 'tel:+19424449422',
}

export const brand = {
  name: 'Mannix',
  fullName: 'Mannix Investigation & Legal Services',
  logoAlt: 'Mannix Investigations and Legal Services logo',
  logoSrc: '/images/mannix-logo.png',
  tagline: 'Investigations & Legal Services',
  ...brandContact,
  yearsEyebrow: 'OVER 40 YEARS IN BUSINESS',
  heroServiceTicker: [
    'PROCESS SERVING',
    'SKIP TRACING',
    'BACKGROUND VERIFICATION',
    'ASSET INVESTIGATIONS',
  ],
  /** Client-supplied; set publishProcessServingSuccessRate to true only after approval */
  processServingSuccessRate: '99.3%',
  publishProcessServingSuccessRate: false,
  disclaimer:
    'Information on this website is general in nature. Contacting us does not automatically establish a professional engagement.',
  footerBlurb:
    'Specialized investigation and information gathering to support informed decisions across legal, financial, and community matters.',
}
