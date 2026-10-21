/** Single source for public contact details (footer, contact page, mailto form). */
export const brandContact = {
  email: 'info@mannixlegal.com',
  mailto: 'mailto:info@mannixlegal.com',
  /** Display format, do not use raw digits on the site */
  phone: '(942) 444-9422',
  phoneTel: 'tel:+19424449422',
}

export const brand = {
  name: 'Mannix',
  fullName: 'Mannix Investigation & Legal Services',
  logoAlt: 'Mannix Investigation & Legal Services logo',
  logoSrc: '/images/mannix-logo.png',
  tagline: 'Investigation & Legal Services',
  ...brandContact,
  yearsEyebrow: 'OVER 40 YEARS IN BUSINESS',
  heroAccolade: 'Celebrated And Awarded Commercial Investigator',
  whatWeDoHeadline: 'Investigation, Process Serving & Legal Support',
  whatWeDoSummary:
    'Mannix Investigation & Legal Services helps lawyers, businesses, and individuals locate people, serve documents, verify backgrounds, and investigate assets, with disciplined research and clear reporting across Canada.',
  coreOfferings: [
    'Process serving & court filing support',
    'Skip tracing & locate investigations',
    'Tenant applicant & background verification',
    'Solvency & asset investigations',
  ],
  processServersCanada: 18,
  processServersNote:
    'Mannix maintains a network of 18 process servers across Canada to support timely, informed service of process.',
  paralegalIntro: 'Our team includes licensed paralegals specializing in:',
  paralegalSpecializations: [
    'Landlord and Tenant Board (LTB) matters',
    'Traffic violations',
    'Small Claims Court actions',
    'Provincial Offences Act matters',
    'Summary criminal and tribunal proceedings',
    'Notary and commissioner services',
  ],
  /** @deprecated use paralegalIntro + paralegalSpecializations */
  paralegalTeamNote:
    'Our team includes licensed paralegals specializing in Landlord and Tenant Board (LTB) cases, traffic violations, and Small Claims Court actions.',
  partnersSummary:
    'Our partners and in-house associates include paralegals, attorneys, and forensic accounting experts, bringing together investigative experience and licensed professional perspectives in one coordinated practice.',
  socialLinks: [
    { label: 'LinkedIn', emoji: '💼', href: 'https://www.linkedin.com/' },
    { label: 'Facebook', emoji: '📘', href: 'https://www.facebook.com/' },
    { label: 'Instagram', emoji: '📷', href: 'https://www.instagram.com/' },
    { label: 'Email', emoji: '✉️', href: 'mailto:info@mannixlegal.com' },
  ],
  heroServiceTicker: [
    'PROCESS SERVING',
    'SKIP TRACING',
    'BACKGROUND VERIFICATION',
    'ASSET INVESTIGATIONS',
  ],
  processServingSuccessRate: '99.3%',
  publishProcessServingSuccessRate: false,
  disclaimer:
    'Information on this website is general in nature. Contacting us does not automatically establish a professional engagement.',
  footerBlurb:
    'Specialized investigation and information gathering to support informed decisions across legal, financial, and community matters.',
}
