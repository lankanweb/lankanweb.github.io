/**
 * Native Vanilla JS Smooth Scroll & Magnetic Section Alignment
 * Zero external dependencies — uses requestAnimationFrame for 60fps easing.
 */

const HEADER_OFFSET = 80; // Fixed navbar height (h-20 = 80px)
const MAGNETIC_CAPTURE_ZONE = 100; // Activation distance (px) from section top
const MAGNETIC_DURATION_MS = 320; // ~320ms transition
const RAPID_SCROLL_THRESHOLD = 1.3; // Velocity (px/ms) above which magnetic snap is bypassed

let cachedTargets = [];
let isUserInteracting = false;
let isMagnetizing = false;
let lastScrollY = 0;
let lastScrollTime = 0;
let isRapidScrolling = false;
let rapidScrollResetTimer = null;
let scrollEndTimer = null;
let interactionTimer = null;
let lastAlignedId = null;
let activeRafId = null;

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function updateCachedTargets() {
  if (typeof document === 'undefined') return;
  const sections = document.querySelectorAll('.magnetic-section');
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  cachedTargets = Array.from(sections).map((el) => {
    const rect = el.getBoundingClientRect();
    const docTop = rect.top + scrollY;
    return {
      id: el.id || el.tagName.toLowerCase(),
      targetY: Math.max(0, Math.round(docTop - HEADER_OFFSET)),
    };
  });
}

function cancelActiveScrollAnimation() {
  if (activeRafId !== null) {
    cancelAnimationFrame(activeRafId);
    activeRafId = null;
  }
  isMagnetizing = false;
}

function animateWindowScroll(targetY, durationMs, easingFn, onComplete) {
  cancelActiveScrollAnimation();

  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const change = targetY - startY;
  if (Math.abs(change) < 1) {
    if (onComplete) onComplete();
    return;
  }

  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    const eased = easingFn(progress);
    window.scrollTo(0, startY + change * eased);

    if (progress < 1) {
      activeRafId = requestAnimationFrame(step);
    } else {
      activeRafId = null;
      if (onComplete) onComplete();
    }
  };

  activeRafId = requestAnimationFrame(step);
}

function evaluateMagneticAlignment() {
  if (prefersReducedMotion()) return;
  if (isUserInteracting || isRapidScrolling || isMagnetizing) return;

  if (cachedTargets.length === 0) {
    updateCachedTargets();
  }

  const currentY = window.pageYOffset || document.documentElement.scrollTop;

  let closest = null;
  let minDistance = Infinity;

  for (const target of cachedTargets) {
    const distance = Math.abs(currentY - target.targetY);
    if (distance < minDistance) {
      minDistance = distance;
      closest = target;
    }
  }

  if (!closest) return;

  if (lastAlignedId && minDistance > MAGNETIC_CAPTURE_ZONE + 20) {
    lastAlignedId = null;
  }

  if (
    minDistance <= MAGNETIC_CAPTURE_ZONE &&
    minDistance >= 4 &&
    lastAlignedId !== closest.id
  ) {
    isMagnetizing = true;
    lastAlignedId = closest.id;

    // Natural cubic deceleration
    animateWindowScroll(
      closest.targetY,
      MAGNETIC_DURATION_MS,
      (t) => 1 - Math.pow(1 - t, 3),
      () => {
        isMagnetizing = false;
      }
    );
  }
}

export function initSmoothScroll() {
  updateCachedTargets();

  if (prefersReducedMotion()) {
    window.addEventListener('resize', updateCachedTargets, { passive: true });
    return;
  }

  const onScroll = () => {
    const now = performance.now();
    const dt = now - lastScrollTime;
    const currentY = window.pageYOffset || document.documentElement.scrollTop;

    if (dt > 12) {
      const dy = Math.abs(currentY - lastScrollY);
      const velocity = dy / dt;
      lastScrollY = currentY;
      lastScrollTime = now;

      if (velocity > RAPID_SCROLL_THRESHOLD) {
        isRapidScrolling = true;
        if (rapidScrollResetTimer) clearTimeout(rapidScrollResetTimer);
        rapidScrollResetTimer = setTimeout(() => {
          isRapidScrolling = false;
        }, 300);
      }
    }

    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      evaluateMagneticAlignment();
    }, 110);
  };

  const onUserInput = () => {
    cancelActiveScrollAnimation();
    isUserInteracting = true;

    if (interactionTimer) clearTimeout(interactionTimer);
    interactionTimer = setTimeout(() => {
      isUserInteracting = false;
    }, 90);
  };

  const onKeyDown = (e) => {
    if (
      ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'Home', 'End'].includes(
        e.code
      )
    ) {
      onUserInput();
    }
  };

  let resizeRafId = null;
  const onResize = () => {
    if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
    resizeRafId = requestAnimationFrame(() => {
      updateCachedTargets();
      resizeRafId = null;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('wheel', onUserInput, { passive: true });
  window.addEventListener('touchstart', onUserInput, { passive: true });
  window.addEventListener('touchmove', onUserInput, { passive: true });
  window.addEventListener('touchend', onUserInput, { passive: true });
  window.addEventListener('keydown', onKeyDown, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  setTimeout(updateCachedTargets, 400);
}

export function refreshScrollTargets() {
  updateCachedTargets();
}

export function scrollToSection(target, options = {}) {
  cancelActiveScrollAnimation();

  const headerOffset = options.offset ?? -HEADER_OFFSET;
  const elem =
    typeof target === 'string'
      ? target.startsWith('#')
        ? document.querySelector(target)
        : document.getElementById(target)
      : target;

  if (!elem) return;

  const targetY = Math.max(
    0,
    Math.round(elem.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) + headerOffset)
  );

  if (prefersReducedMotion()) {
    window.scrollTo(0, targetY);
    return;
  }

  const durationMs = (options.duration ?? 0.85) * 1000;
  animateWindowScroll(
    targetY,
    durationMs,
    (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  );
}
