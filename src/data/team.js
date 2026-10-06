import { brand } from './brand'

export const teamMembers = [
  {
    id: 'ziva',
    name: 'Ziva',
    credentials: 'Senior Investigator | Forensic Claims & Skip Tracing Specialist',
    bio: [
      `With more than 33 years of experience in the insurance industry, Ziva brings an exceptional depth of knowledge and investigative expertise to ${brand.fullName}.`,
      `Throughout her distinguished career, Ziva has developed extensive experience in the forensic investigation of a wide range of insurance claims, learning to recognize the details, inconsistencies, and subtle indicators that can determine what truly lies beneath the surface of a case.`,
      `Her greatest strength, however, may be her extraordinary investigative instinct — an ability to know where to look when the evidence appears to be nowhere in sight. That instinct, combined with decades of industry experience, has established Ziva as a highly accomplished specialist in skip tracing and locating individuals.`,
      `Over the course of her career, Ziva has successfully located individuals across Canada and around the world, often uncovering information and connections that others believed had long since disappeared or been deliberately concealed.`,
      `Whether tracing a missing individual, investigating a complex claim, or pursuing information buried beneath layers of misinformation, Ziva approaches every assignment with persistence, discretion, analytical precision, and an unwavering determination to find the truth.`,
      `At ${brand.fullName}, Ziva represents the firm's commitment to combining experience, instinct, investigative methodology, and results — particularly when the answers are difficult to find.`,
    ],
    practiceAreas: null,
  },
  {
    id: 'kaylee',
    name: 'Kaylee',
    credentials: 'Administrator Ambassador & Intelligence Specialist',
    bio: [
      `Kaylee plays a vital role in the intelligence and operational infrastructure of ${brand.fullName}. Combining advanced organizational skills, technological expertise, and a strong understanding of human communication, she transforms complex information into clear, actionable intelligence.`,
      `With a background in Psychology and Communicative Disorders, Kaylee brings a unique analytical perspective to investigations. Her ability to organize large volumes of information, identify critical connections, and assess communication patterns helps support strategic decision-making across a wide range of files.`,
      `Known for her precision, efficiency, and attention to detail, Kaylee works behind the scenes to ensure investigators have the structure, intelligence, and insights they need to approach complex matters with confidence.`,
      `Meticulous. Analytical. Technologically adept.`,
      `Kaylee is an integral force behind the intelligence, organization, and strategic efficiency that drive ${brand.fullName}.`,
    ],
    practiceAreas: null,
  },
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
