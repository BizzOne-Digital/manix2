import { founderProfile } from './founder'
import { teamMembers } from './team'

export const mainNav = [
  { label: 'Home', path: '/' },
  { label: 'What we do', path: '/services' },
  { label: 'About & team', path: '/about', menu: true },
  { label: 'Contact', path: '/contact' },
]

export const aboutMenu = [
  { label: 'About the firm', hint: 'Our story & values', path: '/about', hash: '' },
  {
    label: founderProfile.fullName,
    hint: founderProfile.title,
    path: '/about#founder',
    hash: '#founder',
  },
  { label: 'Team overview', hint: 'All profiles', path: '/about#team', hash: '#team' },
  ...teamMembers.map((member) => ({
    label: member.name,
    hint: member.credentials,
    path: `/about#${member.id}`,
    hash: `#${member.id}`,
  })),
]

export const footerNav = [
  { label: 'Home', path: '/' },
  { label: 'What we do', path: '/services' },
  { label: 'About the firm', path: '/about' },
  { label: 'Founder profile', path: '/about#founder' },
  { label: 'Team profiles', path: '/about#team' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
]

export const ctaNav = {
  label: 'Discuss Your Matter',
  path: '/contact',
}
