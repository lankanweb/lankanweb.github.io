import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = 80; // Fixed navbar height (h-20 = 80px)
const MAGNETIC_CAPTURE_ZONE = 100; // Activation distance (px) from section top
const MAGNETIC_DURATION = 0.32; // Fast, natural transition (~320ms, within 250-400ms range)
const RAPID_SCROLL_THRESHOLD = 1.3; // Velocity (px/ms) above which magnetic snap is bypassed

interface SectionTarget {
  id: string;
  targetY: number;
}

let lenisInstance: Lenis | null = null;
let cachedTargets: SectionTarget[] = [];
let isUserInteracting = false;
let isMagnetizing = false;
let lastScrollY = 0;
let lastScrollTime = 0;
let scrollVelocity = 0;
let isRapidScrolling = false;
let rapidScrollResetTimer: ReturnType<typeof setTimeout> | null = null;
let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
let interactionTimer: ReturnType<typeof setTimeout> | null = null;
let lastAlignedId: string | null = null;
let fallbackRafId: number | null = null;

/**
 * Calculates and caches target scroll positions for all magnetic sections.
 * Called on init, window resize, and layout changes — NEVER during scroll ticks.
 */
function updateCachedTargets(): void {
  if (typeof document === 'undefined') return;

  const sections = document.querySelectorAll<HTMLElement>('.magnetic-section');
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

/**
 * Immediately cancels any in-flight magnetic alignment when the user provides input.
 */
function cancelMagneticAlignment(): void {
  if (!isMagnetizing) return;
  isMagnetizing = false;

  if (lenisInstance) {
    // Stop the programmatic scroll animation and immediately re-enable user wheel
    lenisInstance.stop();
    lenisInstance.start();
  }

  if (fallbackRafId !== null) {
    cancelAnimationFrame(fallbackRafId);
    fallbackRafId = null;
  }
}

/**
 * Checks if the current viewport is within the magnetic capture zone of a section
 * and smoothly aligns it if conditions are met.
 */
function evaluateMagneticAlignment(): void {
  // Respect reduced motion preference
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  // Do not align if the user is still actively scrolling or flicking rapidly
  if (isUserInteracting || isRapidScrolling || isMagnetizing) {
    return;
  }

  if (cachedTargets.length === 0) {
    updateCachedTargets();
  }

  const currentY = lenisInstance ? lenisInstance.scroll : window.scrollY;

  let closest: SectionTarget | null = null;
  let minDistance = Infinity;

  for (const target of cachedTargets) {
    const distance = Math.abs(currentY - target.targetY);
    if (distance < minDistance) {
      minDistance = distance;
      closest = target;
    }
  }

  if (!closest) return;

  // Reset lastAlignedId if the user has moved sufficiently far away (>120px)
  if (lastAlignedId && minDistance > MAGNETIC_CAPTURE_ZONE + 20) {
    lastAlignedId = null;
  }

  // Check if within magnetic activation zone (e.g. <= 100px) and not already aligned (>= 4px)
  if (
    minDistance <= MAGNETIC_CAPTURE_ZONE &&
    minDistance >= 4 &&
    lastAlignedId !== closest.id
  ) {
    isMagnetizing = true;
    lastAlignedId = closest.id;

    if (lenisInstance) {
      lenisInstance.scrollTo(closest.targetY, {
        duration: MAGNETIC_DURATION,
        // Natural cubic deceleration for smooth, effortless settling
        easing: (t) => 1 - Math.pow(1 - t, 3),
        lock: false,
        onComplete: () => {
          isMagnetizing = false;
        },
      });
    } else {
      // Fallback for native environment
      const startY = window.scrollY;
      const targetY = closest.targetY;
      const change = targetY - startY;
      const startTime = performance.now();
      const durationMs = MAGNETIC_DURATION * 1000;

      const animateScroll = (now: number) => {
        if (!isMagnetizing) return;
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startY + change * ease);

        if (progress < 1) {
          fallbackRafId = requestAnimationFrame(animateScroll);
        } else {
          isMagnetizing = false;
          fallbackRafId = null;
        }
      };

      fallbackRafId = requestAnimationFrame(animateScroll);
    }
  }
}

/**
 * Initializes single coordinated momentum scrolling and magnetic section alignment.
 */
export function initSmoothScroll(): () => void {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize cached targets
  updateCachedTargets();

  // If user prefers reduced motion, return simple resize listener
  if (prefersReduced) {
    const handleResize = () => updateCachedTargets();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }

  // 1. Initialize Lenis for responsive, high-performance momentum scrolling
  const lenis = new Lenis({
    duration: 0.85, // Fast and responsive; eliminates sluggish lag
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.0,
    autoRaf: false,
  });

  lenisInstance = lenis;

  // 2. Synchronize Lenis with GSAP ScrollTrigger
  lenis.on('scroll', (e: { scroll: number }) => {
    ScrollTrigger.update();

    // Track scroll velocity to detect fast flinging vs slow approach
    const now = performance.now();
    const dt = now - lastScrollTime;

    if (dt > 12) {
      const dy = Math.abs(e.scroll - lastScrollY);
      scrollVelocity = dy / dt;
      lastScrollY = e.scroll;
      lastScrollTime = now;

      if (scrollVelocity > RAPID_SCROLL_THRESHOLD) {
        isRapidScrolling = true;
        if (rapidScrollResetTimer) clearTimeout(rapidScrollResetTimer);
        rapidScrollResetTimer = setTimeout(() => {
          isRapidScrolling = false;
        }, 300);
      }
    }

    // Schedule magnetic evaluation after scrolling decelerates/settles
    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      evaluateMagneticAlignment();
    }, 110);
  });

  // 3. User input interception: Cancel active magnetic alignment immediately on new input
  const onUserInput = () => {
    cancelMagneticAlignment();
    isUserInteracting = true;

    if (interactionTimer) clearTimeout(interactionTimer);
    interactionTimer = setTimeout(() => {
      isUserInteracting = false;
    }, 90);
  };

  window.addEventListener('wheel', onUserInput, { passive: true });
  window.addEventListener('touchstart', onUserInput, { passive: true });
  window.addEventListener('touchmove', onUserInput, { passive: true });
  window.addEventListener('touchend', onUserInput, { passive: true });

  const onKeyDown = (e: KeyboardEvent) => {
    if (
      ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'Home', 'End'].includes(
        e.code
      )
    ) {
      onUserInput();
    }
  };
  window.addEventListener('keydown', onKeyDown, { passive: true });

  // 4. Update cached positions on window resize with requestAnimationFrame debounce
  let resizeRafId: number | null = null;
  const onResize = () => {
    if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
    resizeRafId = requestAnimationFrame(() => {
      updateCachedTargets();
      resizeRafId = null;
    });
  };
  window.addEventListener('resize', onResize, { passive: true });

  // 5. Connect Lenis to GSAP ticker for 60fps frame alignment
  const rafCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  // Recalculate positions after DOM settles
  const settleTimeout = setTimeout(() => {
    updateCachedTargets();
  }, 400);

  // Return cleanup function
  return () => {
    clearTimeout(settleTimeout);
    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    if (interactionTimer) clearTimeout(interactionTimer);
    if (rapidScrollResetTimer) clearTimeout(rapidScrollResetTimer);
    if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);

    window.removeEventListener('wheel', onUserInput);
    window.removeEventListener('touchstart', onUserInput);
    window.removeEventListener('touchmove', onUserInput);
    window.removeEventListener('touchend', onUserInput);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('resize', onResize);

    gsap.ticker.remove(rafCallback);
    lenis.destroy();
    lenisInstance = null;
  };
}

/**
 * Programmatic scroll to section (e.g. for navbar & footer links),
 * accounting for fixed navbar offset with immediate magnetic cancellation.
 */
export function scrollToSection(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number }
): void {
  cancelMagneticAlignment();

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const headerOffset = options?.offset ?? -HEADER_OFFSET;

  if (lenisInstance && !prefersReduced) {
    lenisInstance.scrollTo(target, {
      offset: headerOffset,
      duration: options?.duration ?? 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lock: false,
    });
  } else {
    const elem =
      typeof target === 'string'
        ? target.startsWith('#')
          ? document.querySelector(target)
          : document.getElementById(target)
        : target;

    if (elem) {
      const top = elem.getBoundingClientRect().top + window.pageYOffset + headerOffset;
      window.scrollTo({
        top,
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    }
  }
}
