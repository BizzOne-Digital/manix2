/** Local assets in public/images/ — replace files keeping the same filenames. */
function img(src, alt, width = 1600, height = 1067) {
  return {
    src: `/images/${src}`,
    alt,
    width,
    height,
  }
}

export const siteImages = {
  hero: img(
    'hero-courthouse.jpg',
    'Classical courthouse columns at golden hour',
    2400,
    1350,
  ),
  intro: img(
    'desk-envelope-courthouse.jpg',
    'Legal correspondence on a desk with courthouse columns in the background',
  ),
  aboutHero: img(
    'marble-staircase.jpg',
    'Marble staircase leading toward warm light and city views',
    2000,
    1333,
  ),
  aboutStory: img(
    'documents-magnifying.jpg',
    'Investigation documents reviewed with a magnifying glass',
  ),
  aboutValues: img(
    'gold-hallway.jpg',
    'Architectural hallway with gold pillars and warm light',
  ),
  servicesHero: img(
    'towers-sunset.jpg',
    'Modern towers reflecting golden sunset light',
    2400,
    1350,
  ),
  testimonialsHero: img(
    'leather-portfolio.jpg',
    'Black leather portfolio on a marble desk',
  ),
  contact: img(
    'office-night-city.jpg',
    'Executive desk overlooking a city skyline at night',
  ),
  partners: img(
    'executive-desk-flatlay.jpg',
    'Executive desk with folders, notepad, and brass accents',
  ),
  approach: img(
    'library-desk.jpg',
    'Library desk with open book, lamp, and research materials',
  ),
  whoWeHelp: img(
    'boardroom-skyline.jpg',
    'Boardroom with panoramic city view at dusk',
    2000,
    1333,
  ),
  processServing: img(
    'columns-golden-hour.jpg',
    'Classical stone columns in golden sunlight',
  ),
  skipTracing: img(
    'research-map.jpg',
    'Map research with magnifying glass on a desk',
  ),
  background: img(
    'property-key.jpg',
    'Gold key at a property entrance—symbolizing tenant and applicant verification',
  ),
  solvency: img(
    'corporate-skyline-model.jpg',
    'Architectural model and keys with city skyline at sunset',
  ),
  archive: img(
    'archive-shelves.jpg',
    'Archive shelves with professional binders and warm lighting',
  ),
  property: img(
    'property-key.jpg',
    'Gold house key at the entrance of a luxury property',
  ),
}
