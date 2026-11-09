import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { siteConfig } from '../data/siteConfig';
import { scrollToSection } from '../utils/smoothScroll';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer className="bg-[#08090B] text-white border-t border-[#1C1F26] py-16 sm:py-20">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1240px] mx-auto px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#1C1F26]">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <a
              href="#hero"
              onClick={(e) => handleSmoothScroll(e, '#hero')}
              className="inline-block mb-4 transition-transform hover:scale-105"
              aria-label="LankanWeb Home"
            >
              <img
                src={siteConfig.brand.logoDarkUrl}
                alt="LankanWeb Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-[#9CA3AF] max-w-sm leading-relaxed mb-6">
              {siteConfig.brand.tagline} {siteConfig.brand.supportingMessage}
            </p>
            <div className="text-xs text-[#6B7280]">
              Headquartered in {siteConfig.contact.address}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white mb-4 block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-sm text-[#9CA3AF]">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Connect Column */}
          <div className="md:col-span-4">
            <span className="text-xs font-bold uppercase tracking-wider text-white mb-4 block">
              Direct Channels
            </span>
            <ul className="space-y-2.5 text-sm text-[#9CA3AF] mb-6">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>

            <div className="p-3.5 bg-[#12141A] rounded border border-[#1C1F26] text-xs text-[#9CA3AF]">
              <span className="text-white font-medium block mb-1">Sri Lanka Business Hours</span>
              <span>Mon – Fri: 09:00 – 18:00 IST</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div>
            © {currentYear} LankanWeb. All rights reserved. Designed with purpose. Built for growth.
          </div>
          <div className="flex items-center gap-6">
            <span>Web Design Sri Lanka</span>
            <span>Digital Marketing Sri Lanka</span>
            <span>SEO Sri Lanka</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
