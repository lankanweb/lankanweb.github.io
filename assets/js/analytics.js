/**
 * Analytics & Conversion Event Tracker (Vanilla ES6+)
 * Prepared for Google Analytics 4, Google Tag Manager, and Meta Pixel.
 */
import { siteConfig } from './data.js';

export function trackEvent(eventName, payload = {}) {
  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocal) {
    console.info(`[Analytics Event] ${eventName}`, payload);
  }

  // 1. Google Analytics 4 / gtag
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...payload,
      agency: siteConfig.brand.fullName,
    });
  }

  // 2. Google Tag Manager DataLayer
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...payload,
    });
  }

  // 3. Meta Pixel (fbq)
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, payload);
  }
}
