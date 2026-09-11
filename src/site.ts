/**
 * Single source of truth for site-wide constants.
 * Change TALLY_FORM_URL here and every CTA on the site follows.
 */

export const TALLY_FORM_URL = 'https://tally.so/r/rjejao';

/** Where a "Donate" button should point once a donation link exists. */
export const DONATE_URL: string | null = null;

export const SITE = {
  name: 'Songtales',
  url: 'https://songtales.emmastephensonmusic.com',
  tagline:
    'Personal songs, written in partnership with a real human songwriter. Create unforgettable dedications for the people you love.',
  neverAi: 'Handmade by a person. Never AI.',
  footer: 'Songtales · Personal songs for the people you love · Never AI',
  description:
    'Songtales — original, personal songs written by Emma Stephenson, an award-winning pianist and songwriter. Unforgettable dedications for the people you love. Handmade by a person. Never AI.',
} as const;

export const NAV_LINKS = [
  { href: '#the-idea', label: 'The idea' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#about', label: 'About' },
  { href: '#support', label: 'Support the work' },
] as const;

/**
 * Image paths, in one place so swapping a placeholder for a real photo is a
 * one-line change here. Drop the real files into `public/images/`.
 */
export const IMAGES = {
  /** Lace dress / flowers portrait. Cropped `top center` so the head is never cut. */
  hero: '/images/hero-portrait.jpg',
  /** Emma at the piano, navy studio. */
  aboutCraft: '/images/about-piano.jpg',
  /** Emma with toddler at the piano. */
  aboutLife: '/images/about-family.jpg',
  /** Circular piano + quill emblem. */
  logo: '/images/logo.jpg',
} as const;

export const IMAGE_ALT = {
  hero: 'Emma standing among flowering greenery in a white lace dress, holding a sprig of blossom.',
  aboutCraft: 'Emma seated at an upright piano in a navy-toned studio.',
  aboutLife: 'Emma sitting on top of an upright piano with her feet on the keys, while her toddler kneels on the stool below, reaching for the keyboard.',
} as const;
