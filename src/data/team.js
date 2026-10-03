import { brand } from './brand'

export const teamMembers = [
  {
    id: 'jorgen-wong',
    name: 'Jorgen Wong',
    credentials: 'Barrister and Solicitor',
    bio: [
      `Jorgen Wong is a Toronto lawyer who specializes in complex legislative and regulatory litigation. He began his career as a securities regulator and holds a commerce degree from the University of Toronto and a law degree from Osgoode Hall Law School. He understands how regulators investigate, what they need to prove, and where files are won or lost.`,
      `His practice includes civil litigation, licensing and bylaw enforcement, criminal and provincial offences defence, and immigration. Jorgen works with ${brand.fullName} as counsel on commercial matters, alongside its process serving, court filing, and investigative support.`,
    ],
    practiceAreas: null,
  },
  {
    id: 'avery-lakics',
    name: 'Avery Lakics',
    credentials: 'Licensed Paralegal and Notary Public',
    bio: [
      `Avery Lakics is a licensed paralegal and Notary Public dedicated to providing clear, practical, and client-focused legal guidance. Since earning his license in 2025 following graduation from George Brown College, Avery has built a diverse practice. While initially specializing in Provincial Offences Act matters, he has expanded his expertise to include residential tenancy law, summary criminal defence, and tribunal proceedings.`,
      `Avery is committed to demystifying the legal process and ensuring clients understand their options every step of the way.`,
    ],
    practiceAreas: [
      {
        title: 'Summary Criminal Offences',
        description: 'Defence representation in summary criminal matters.',
      },
      {
        title: 'Provincial Offences Act Matters',
        description:
          'Defence representation for individuals charged under provincial legislation and bylaws.',
      },
      {
        title: 'Landlord and Tenant Matters',
        description:
          'Representation of both landlords and tenants in applications and proceedings before the Landlord and Tenant Board.',
      },
      {
        title: 'Small Claims Court',
        description:
          'Representation of both plaintiffs and defendants in Small Claims Court proceedings.',
      },
      {
        title: 'School Disciplinary Matters',
        description: 'Representation and assistance in school disciplinary proceedings.',
      },
      {
        title: 'Tribunal Matters',
        description: 'Representation in proceedings before administrative tribunals.',
      },
      {
        title: 'Notary and Commissioner Services',
        description: 'Notary Public and commissioning of affidavits and other documents.',
      },
    ],
  },
]
