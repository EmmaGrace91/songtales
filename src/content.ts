/** All page copy, kept out of the markup so wording is easy to edit. */

export const IDEA_INTRO = [
  'If there is a relationship in your life that you would like to celebrate or commemorate, an original song is a special and unforgettable way to mark the occasion.',
  "I'm Emma, an award-winning pianist and songwriter, with whom you can partner to create your dream dedication to a person or group of people that you love. You can share as much or as little as you like: the person, the occasion, the feelings, even your own lyrics or lyric ideas. I’ll take it from there.",
] as const;

export const IDEA_LIST_LEAD =
  'I can write songs for any occasion or cause, including (but not limited to):';

export const OCCASIONS = [
  'Baby arrivals',
  'Birthdays, engagements, weddings, and anniversaries',
  'Commemoration songs for funerals',
  'School songs and anthems for organisations',
  'Baptisms, christenings, and other faith milestones',
  'Graduations and retirements',
  'Adoption days',
  'Pet memorials',
  'Recovery or “new chapter” milestones',
  '“Just because” — no occasion required',
] as const;

export const IDEA_CLOSE = 'Secular or Christian, whatever fits the story.';

export const STEPS = [
  {
    number: '1',
    title: 'Share the story',
    body: 'Who it’s for, what matters, and when you need it by. You’re welcome to send lyrics, snippets, or ideas for me to bounce off — or just the subject matter.',
  },
  {
    number: '2',
    title: 'I write the song',
    body: 'Original lyrics and melody, written by me — a real human songwriter — around that person and that moment.',
  },
  {
    number: '3',
    title: 'Receive your dedication',
    body: 'A piano-and-voice recording (performed by me) as a WAV, plus a lyric sheet. Optional: chord chart with lyrics, sheet music, lyric video (can include photos/videos you send), extra instrumentation and/or a different vocalist. Keep it private, or let me share it on streaming platforms (e.g. Spotify, Apple Music) and YouTube if you’d like the world to hear it.',
  },
] as const;

export const ABOUT_PARAGRAPHS = [
  "I'm Emma — an award-winning pianist and songwriter, and a stay-at-home mum of three. I write personal dedications for people and the moments that matter. Living in the thick of family life is part of what I bring to songs about love, loss, celebration, and everyday devotion. At this stage, every Songtales song is written by me.",
] as const;

export const SUPPORT_INTRO = 'No fixed price — contributions welcome. Suggested:';

export const SUPPORT_TIERS = [
  {
    id: 'base',
    label: 'Basic dedication',
    detail: 'Piano & voice WAV + lyric sheet',
    amount: 200,
    base: true,
  },
  {
    id: 'chord',
    label: 'Chord chart with lyrics',
    detail: null,
    amount: 50,
    base: false,
    match: ['chord'],
  },
  {
    id: 'sheet',
    label: 'Sheet music',
    detail: null,
    amount: 100,
    base: false,
    // Not bare 'sheet': the base tier's own description says 'lyric sheet'.
    match: ['sheet music'],
  },
  {
    id: 'video',
    label: 'Lyric video',
    detail: null,
    amount: 200,
    base: false,
    match: ['video'],
  },
  {
    id: 'band',
    label: 'Extra instrumentation and/or different vocalist',
    detail: null,
    amount: 500,
    base: false,
    match: ['instrumentation', 'vocalist'],
  },
] as const;

export type SupportTier = (typeof SUPPORT_TIERS)[number];

/**
 * Keywords used to recognise an extra in whatever the request form sends back.
 * Matching is done against the whole `extras` string rather than splitting it,
 * so the form's separator — comma, comma-space, anything — never matters, and
 * option labels can be reworded (or carry prices) without breaking the match.
 * Keywords must stay mutually exclusive across tiers.
 */
export const tierMatchers = (tier: SupportTier): readonly string[] =>
  'match' in tier ? tier.match : [tier.id];

/** The base tier is a floor, not a fixed price; the extras are add-ons. */
export const formatTierAmount = (tier: SupportTier): string =>
  tier.base ? `from $${tier.amount}` : `+$${tier.amount}`;

/** GST is 1/11th of a GST-inclusive total. */
export const gstOf = (total: number): number => total / 11;

export const formatMoney = (amount: number): string =>
  `$${amount.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const SUPPORT_GST_NOTE =
  'All amounts include GST. You’ll receive a tax invoice showing the GST.';

export const SUPPORT_NOTES = [
  'Tick extras on the request form to see a suggested total. A contribution isn’t required to submit — we’ll sort that out once I know what you’re after.',
  'I prioritise by urgency first, then by contribution.',
  'If I can’t fulfil in the agreed time, your contribution is refunded in full.',
] as const;
