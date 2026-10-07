import { brand } from './brand'

export const featuredServices = [
  {
    id: 'process-serving',
    number: '01',
    title: 'Process Serving',
    short:
      'Locating subjects and establishing circumstances to support reliable service of process.',
    anchor: 'process-serving',
    imageKey: 'processServing',
  },
  {
    id: 'skip-tracing',
    number: '02',
    title: 'Skip Tracing',
    short:
      'Research-led location work using persistence and multiple information avenues.',
    anchor: 'skip-tracing',
    imageKey: 'skipTracing',
  },
  {
    id: 'background-verification',
    number: '03',
    title: 'Tenant, Applicant & Background Verification',
    short:
      'Independent verification to assess consistency between applications and wider findings.',
    anchor: 'background-verification',
    imageKey: 'background',
  },
  {
    id: 'solvency-asset',
    number: '04',
    title: 'Solvency & Asset Investigations',
    short:
      'Lawfully obtainable information on assets, liabilities, interests, and financial relationships.',
    anchor: 'solvency-asset',
    imageKey: 'solvency',
  },
]

export const serviceDetails = [
  {
    id: 'process-serving',
    number: '01',
    title: 'Process Serving',
    summary:
      'Process serving supported by investigation to locate the subject and establish relevant circumstances before documents are delivered.',
    body: [
      'Effective service often depends on understanding where someone lives, works, or can reliably be reached. Our work combines investigative research with disciplined field coordination so service attempts are informed rather than speculative.',
      brand.processServersNote,
      'When subjects cannot be located domestically, clients may choose whether to pursue further options. We communicate findings clearly so legal teams can decide next steps without assumptions.',
    ],
    clientSuppliedNote:
      'The client has referenced an approximate success rate of 99.3% for process serving. This figure is not published here pending confirmation of measurement period and methodology, and should not be read as a guarantee.',
    imageKey: 'processServing',
  },
  {
    id: 'skip-tracing',
    number: '02',
    title: 'Skip Tracing',
    summary:
      'A research-led approach using persistence, cross-referencing, and multiple information avenues to locate individuals and understand their circumstances.',
    body: [
      'Skip tracing is rarely a single-database search. We follow leads, validate sources, and document what can be established with reasonable confidence.',
      'Outcomes depend on the information available and lawful access. We focus on verified findings clients can use when planning interviews, service, or further inquiry.',
    ],
    imageKey: 'skipTracing',
  },
  {
    id: 'background-verification',
    number: '03',
    title: 'Tenant, Applicant & Background Verification',
    summary:
      'An application is a starting point. Independent verification helps assess whether information supplied by a prospective tenant, buyer, or investor aligns with broader research.',
    body: [
      'We examine stated employment, references, associations, and other claims against independently gathered information where lawfully available.',
      'This work supports landlords, lenders, legal professionals, and individuals who need clarity—not a substitute for legal advice, but a structured view of what the record supports.',
    ],
    imageKey: 'background',
  },
  {
    id: 'solvency-asset',
    number: '04',
    title: 'Solvency & Asset Investigations',
    summary:
      'Investigations into individuals and entities, including legally obtainable information about assets, liabilities, corporate interests, partnerships, beneficial ownership, and potentially undisclosed interests.',
    body: [
      'Financial and corporate structures can be opaque. We assemble a picture from public records, corporate filings, and other lawful sources—always within the limits of what can ethically and legally be accessed.',
      'We do not suggest unrestricted access to private financial records. Findings are communicated in clear, professional language so clients and counsel can evaluate risk and next steps.',
    ],
    imageKey: 'solvency',
  },
]
