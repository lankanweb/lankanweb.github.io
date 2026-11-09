/**
 * Analytics & Conversion Event Tracker
 * Prepared for Google Analytics 4, Google Tag Manager, and Meta Pixel.
 */
import { siteConfig } from '../data/siteConfig';

export type ConversionEvent =
  | 'whatsapp_click'
  | 'project_enquiry_submitted'
  | 'email_click'
  | 'main_cta_click'
  | 'service_discussed'
  | 'case_study_viewed';

export function trackEvent(eventName: ConversionEvent, payload?: Record<string, unknown>) {
  // Console logging for verification
  if (import.meta.env.DEV) {
    console.info(`[Analytics Event] ${eventName}`, payload || {});
  }

  // 1. Google Analytics 4 / gtag
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag('event', eventName, {
      ...payload,
      agency: siteConfig.brand.fullName,
    });
  }

  // 2. Google Tag Manager DataLayer
  if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
      event: eventName,
      ...payload,
    });
  }

  // 3. Meta Pixel (fbq)
  if (typeof window !== 'undefined' && (window as unknown as { fbq?: Function }).fbq) {
    (window as unknown as { fbq: Function }).fbq('trackCustom', eventName, payload);
  }
}
