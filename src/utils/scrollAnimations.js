import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Softer trigger — animates slightly before section enters view to reduce scroll jank */
const DEFAULT_START = 'top 88%'

function delay(el) {
  return Number(el.dataset.revealDelay || 0)
}

function motionForType(type, mobile) {
  switch (type) {
    case 'slide-left':
      return mobile ? { y: 20 } : { x: -28, y: 20 }
    case 'slide-right':
      return mobile ? { y: 20 } : { x: 28, y: 20 }
    case 'scale-in':
      return { y: 24, scale: 0.98 }
    case 'rotate-in':
    case 'clip-up':
    case 'blur-in':
    case 'fade-up':
    default:
      return { y: mobile ? 20 : 28 }
  }
}

function revealElement(el, type, mobile, start = DEFAULT_START) {
  const motion = motionForType(type, mobile)
  gsap.fromTo(
    el,
    { opacity: 0, ...motion, immediateRender: false },
    {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.65,
      delay: delay(el),
      ease: 'power2.out',
      overwrite: 'auto',
      scrollTrigger: {
        trigger: el,
        start: el.dataset?.revealStart || start,
        once: true,
        invalidateOnRefresh: true,
      },
    },
  )
}

export function initScrollAnimations(root, { mobile = false } = {}) {
  if (!root) return

  gsap.utils.toArray('[data-reveal]', root).forEach((el) => {
    let type = el.getAttribute('data-reveal') || 'fade-up'
    if (mobile && type === 'blur-in') type = 'fade-up'
    revealElement(el, type, mobile)
  })

  gsap.utils.toArray('[data-reveal-stagger]', root).forEach((group) => {
    const items = group.querySelectorAll('[data-reveal-item]')
    if (!items.length) return
    gsap.fromTo(
      items,
      { opacity: 0, y: mobile ? 16 : 24, immediateRender: false },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: mobile ? 0.06 : 0.09,
        ease: 'power2.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: group,
          start: group.dataset.revealStart || 'top 85%',
          once: true,
          invalidateOnRefresh: true,
        },
      },
    )
  })

  gsap.utils.toArray('[data-reveal-line]', root).forEach((line) => {
    gsap.fromTo(
      line,
      { scaleX: 0, opacity: 0.6 },
      {
        scaleX: 1,
        opacity: 1,
        transformOrigin: 'left center',
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 90%', once: true },
      },
    )
  })

  gsap.utils.toArray('[data-reveal-image]', root).forEach((wrap) => {
    const img = wrap.querySelector('img')
    gsap.fromTo(
      wrap,
      { opacity: 0, y: mobile ? 16 : 24, immediateRender: false },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrap, start: 'top 85%', once: true },
      },
    )
    if (img && !mobile) {
      gsap.fromTo(
        img,
        { scale: 1.04 },
        {
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: wrap, start: 'top 85%', once: true },
        },
      )
    }
  })

  gsap.utils.toArray('[data-headline-reveal]', root).forEach((headline) => {
    gsap.fromTo(
      headline,
      { opacity: 0, y: mobile ? 16 : 22, immediateRender: false },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: headline, start: 'top 86%', once: true },
      },
    )
  })

  gsap.utils.toArray('[data-service-card]', root).forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: mobile ? 20 : 28, immediateRender: false },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: Math.min(i * 0.05, 0.15),
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 92%', once: true },
      },
    )
  })

  requestAnimationFrame(() => ScrollTrigger.refresh())
}

export function initHeroScroll(root, { mobile = false } = {}) {
  if (!root || mobile) return
  const hero = root.querySelector('[data-hero]')
  if (!hero) return

  const image = hero.querySelector('[data-hero-image]')
  if (!image) return

  gsap.to(image, {
    yPercent: 6,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
    },
  })
}
