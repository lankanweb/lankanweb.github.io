/**
 * LankanWeb Application Entry Point (Vanilla ES6+)
 * Pure static HTML5, CSS3 & Vanilla JavaScript — zero build tools or frameworks.
 */
import { initSmoothScroll } from './smoothScroll.js';
import { initAnimations } from './animations.js';
import {
  initNavbar,
  initHeroImage,
  initProjectModal,
  initServices,
  initFAQ,
  initContactForm,
  initTrackingAndMeta,
} from './components.js';

function bootstrap() {
  initNavbar();
  initHeroImage();
  initProjectModal();
  initServices();
  initFAQ();
  initContactForm();
  initTrackingAndMeta();
  initAnimations();
  initSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
