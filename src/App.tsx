/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from './data/siteConfig';
import { trackEvent } from './utils/analytics';
import { initSmoothScroll, scrollToSection } from './utils/smoothScroll';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Website Development');

  // Initialize Lenis smooth momentum scrolling synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  const scrollToContact = () => {
    scrollToSection('#contact');
  };

  const scrollToWork = () => {
    scrollToSection('#work');
  };

  const handleSelectService = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    scrollToContact();
  };

  const handleFloatingWhatsApp = () => {
    trackEvent('whatsapp_click', { location: 'floating_button' });
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-body selection:bg-[#0C92FF]/15 selection:text-[#004E8D]">
      {/* SECTION 01 — Sticky Minimal Navigation */}
      <Navbar onStartProject={scrollToContact} />

      <main className="flex-1">
        {/* SECTION 02 — Hero with Asymmetric Editorial Layout & Clean Image */}
        <Hero onStartProject={scrollToContact} onExploreWork={scrollToWork} />

        {/* SECTION 03 — Selected Work (with Project Detail Modal) */}
        <SelectedWork onDiscussProject={handleSelectService} />

        {/* SECTION 04 — Services (3 Major Categories) */}
        <Services onSelectService={handleSelectService} />

        {/* SECTION 05 — Testimonials (Minimal, Yellow Stars, 3 Horizontally Moving Looping Rows) */}
        <Testimonials />

        {/* SECTION 07 — About LankanWeb */}
        <About />

        {/* SECTION 08 — FAQ Section (Interactive Accordion for Sri Lankan Clients) */}
        <FAQ />

        {/* SECTION 09 — Final Conversion Section (Black Background & Form) */}
        <ContactSection preselectedService={selectedService} />
      </main>

      {/* Quiet Footer */}
      <Footer />

      {/* Floating Instant WhatsApp Button with Updated Number (+94 76 546 6217) */}
      <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
        <a
          href={siteConfig.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleFloatingWhatsApp}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#111111] hover:bg-[#0C92FF] text-white rounded-full shadow-lg border border-neutral-700 hover:border-[#0C92FF] transition-all duration-200 text-xs font-semibold"
          title="Direct message on WhatsApp (+94 76 546 6217)"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] transition-transform duration-200 group-hover:scale-110" />
          <span className="hidden sm:inline">WhatsApp us</span>
        </a>
      </aside>
    </div>
  );
}
