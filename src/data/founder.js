import { brand } from './brand'

export const founderProfile = {
  eyebrow: "Founder's profile",
  displayName: 'Jeffrey',
  fullName: 'Jeffrey Potofsky',
  title: 'Founder & Principal Investigator',
  organization: brand.fullName,
  opening: {
    contrast: [
      'There are investigators who practice a profession—and there are investigators who build a reputation.',
      'Jeffrey belongs to the latter.',
    ],
    paragraphs: [
      `With more than four decades of investigative experience, Jeffrey has established a career distinguished by discretion, persistence, an extraordinary worldwide network of contacts and an ability to resolve matters that others have been unable to solve.`,
      `Jeffrey entered the investigative profession at an exceptionally young age, ultimately becoming the youngest person in Canada to be licensed to own and operate a private investigation agency. That distinction marked the beginning of a career that would span some of the most demanding areas of private investigation and security.`,
      `His experience is extensive and includes counter-terrorism investigations, executive and personal protection, surveillance, grand theft, hit-and-run investigations, commercial crime, financial investigations, money transfers and sophisticated fraud investigations.`,
      `Over the course of his career, Jeffrey has been involved in investigations that have attracted considerable attention and recognition.`,
    ],
    accomplishments: [
      `Among his notable accomplishments was his involvement in the seizure of a satellite. He was also credited with helping identify a fraud artist operating in Canada on behalf of a foreign criminal organization and with tracking down approximately $12 million worth of land allegedly taken from the estate of a deceased gentleman by a lawyer.`,
      `In another notable matter, Jeffrey intervened when a high-school student was confronted by a mob of violent students, helping protect the young man from what could have become a potentially dangerous situation.`,
      `His professional achievements have also received recognition beyond the investigative community, including an award from the former Pinkerton Security organization and written recognition from former Ontario Premier Mike Harris.`,
    ],
  },
  sections: [
    {
      id: 'relationships',
      title: 'A reputation built on relationships',
      paragraphs: [
        `While investigative skill has been central to Jeffrey's career, he considers another asset equally important: his network.`,
        `Over decades, Jeffrey has cultivated an extensive network of professional, investigative and personal contacts extending throughout Canada and internationally. Those relationships have become one of the most valuable resources available to the clients of ${brand.fullName}.`,
        `In Jeffrey's view, successful investigation is rarely accomplished by simply asking the obvious questions or following the obvious path.`,
        `It requires knowing whom to call, where to look, what questions to ask—and, most importantly, knowing when the information being provided is not the whole story.`,
      ],
    },
    {
      id: 'legal-support',
      title: 'From investigation to legal support',
      paragraphs: [
        `Today, Jeffrey has parlayed his decades of investigative experience into a specialized legal-support operation focused on process serving, skip tracing and solvency reporting.`,
        `${brand.fullName} combines traditional investigative discipline with Jeffrey's extensive network and decades of experience locating people, establishing facts and uncovering information.`,
        `For Jeffrey, however, the business is about more than locating an individual or serving a document. It is about giving lawyers, businesses and private clients the confidence that when an important matter cannot be left to chance, it is being handled by people who understand what is at stake.`,
      ],
      motto: 'Do the work. Find the answers. Deliver the result.',
    },
  ],
  standard: {
    title: 'The Mannix Standard',
    intro: `Jeffrey's career has been built on a simple understanding:`,
    thesis: 'Every assignment matters.',
    scenarios: [
      'A person who cannot be located.',
      'A document that must be served.',
      'An asset that needs to be identified.',
      'A financial position that requires verification.',
      'A fact that someone does not want discovered.',
    ],
    paragraphs: [
      'These are not merely administrative problems.',
      'They are investigative problems.',
      `And after more than forty years in the field, Jeffrey Potofsky knows how to approach them.`,
    ],
    pillars: [
      'Experience cannot be purchased.',
      'A worldwide network cannot be built overnight.',
      'And a reputation cannot be manufactured.',
    ],
    closing: `Jeffrey built all three the same way he built his career:`,
    mantra: 'One case. One contact. One result at a time.',
  },
  signoff: {
    name: 'Jeffrey',
    title: 'Founder & Principal Investigator',
    organization: brand.fullName,
  },
}
