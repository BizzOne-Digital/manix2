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
  fullName: 'Mannix Investigations & Legal Services',
  logoAlt: 'Mannix Investigations & Legal Services logo',
  logoSrc: '/images/mannix-logo.png',
  tagline: 'Investigations & Legal Services',
  ...brandContact,
  yearsEyebrow: 'OVER 40 YEARS IN BUSINESS',
  whatWeDoHeadline: 'Investigation, process serving & legal support',
  whatWeDoSummary:
    'Mannix Investigations & Legal Services helps lawyers, businesses, and individuals locate people, serve documents, verify backgrounds, and investigate assets—with disciplined research and clear reporting across Canada.',
  coreOfferings: [
    'Process serving & court filing support',
    'Skip tracing & locate investigations',
    'Tenant, applicant & background verification',
    'Solvency & asset investigations',
  ],
  processServersCanada: 18,
  processServersNote:
    'Mannix maintains a network of 18 process servers across Canada to support timely, informed service of process.',
  paralegalSpecializations: [
    'Landlord and Tenant Board (LTB) matters',
    'Traffic violations',
    'Small Claims Court actions',
  ],
  paralegalTeamNote:
    'Our team includes licensed paralegals specializing in Landlord and Tenant Board (LTB) cases, traffic violations, and Small Claims Court actions.',
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
