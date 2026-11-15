/**
 * IntersectionObserver-driven Editorial Text & Section Reveal Animations
 * Replaces GSAP ScrollTrigger + Framer Motion with zero-dependency CSS3 transitions.
 */

export function initAnimations() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animatedElements = document.querySelectorAll(
    '.reveal-block, .reveal-scale, .editorial-heading, .editorial-paragraph'
  );

  if (prefersReduced || !('IntersectionObserver' in window)) {
    animatedElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Configure staggered transition delays on editorial headings & paragraphs
  document.querySelectorAll('.editorial-heading').forEach((heading) => {
    const baseDelay = parseFloat(heading.getAttribute('data-delay') || '0');
    const words = heading.querySelectorAll('.editorial-word');
    words.forEach((word, index) => {
      word.style.transitionDelay = `${(baseDelay + index * 0.03).toFixed(3)}s`;
    });
  });

  document.querySelectorAll('.editorial-paragraph').forEach((para) => {
    const delay = parseFloat(para.getAttribute('data-delay') || '0.1');
    para.style.transitionDelay = `${delay}s`;
  });

  document.querySelectorAll('[data-reveal-delay]').forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0');
    el.style.transitionDelay = `${delay}s`;
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -45px 0px',
      threshold: 0.05,
    }
  );

  animatedElements.forEach((el) => observer.observe(el));

  // Immediately reveal elements already in viewport on first paint
  requestAnimationFrame(() => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    animatedElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.95 && rect.bottom > 0) {
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    });
  });
}
