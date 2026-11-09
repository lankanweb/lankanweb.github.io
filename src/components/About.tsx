import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { siteConfig, siteImages } from '../data/siteConfig';
import { EditorialHeading, EditorialParagraph } from './EditorialTextReveal';

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="magnetic-section py-24 sm:py-32 lg:py-36 bg-white border-t border-[#D9DDE2]">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1240px] mx-auto px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Statement & Principles */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0C92FF] mb-3 block">
              About LankanWeb
            </span>

            <EditorialHeading
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] font-heading tracking-tight mb-6"
            >
              <span className="editorial-word">Technology</span>{' '}
              <span className="editorial-word">meets</span>{' '}
              <span className="editorial-word">creativity.</span>{' '}
              <span className="editorial-word">Strategy</span>{' '}
              <span className="editorial-word">meets</span>{' '}
              <span className="editorial-word">execution.</span>
            </EditorialHeading>

            <EditorialParagraph className="text-base sm:text-lg text-[#666666] leading-relaxed mb-8">
              At LankanWeb, we believe a successful digital presence is about more than having a beautiful website. It is about creating meaningful experiences, connecting with customers and building opportunities for business growth.
            </EditorialParagraph>

            {/* Core Statement Banner */}
            <div className="border-l-2 border-[#0C92FF] pl-5 py-1 mb-10">
              <p className="text-xl sm:text-2xl font-bold font-heading text-[#111111] tracking-tight">
                Designed with purpose. Built for growth.
              </p>
              <span className="text-xs text-[#888888] tracking-wide uppercase mt-1 block">
                The LankanWeb Principle
              </span>
            </div>

            {/* 3 Grounded Pillars */}
            <div className="space-y-6 pt-4 border-t border-[#D9DDE2]">
              <div>
                <h3 className="text-base font-bold font-heading text-[#111111] mb-1">
                  Clean Technical Engineering
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  We write clean, semantic code that loads quickly, ranks organically in search engines, and works reliably across all mobile and desktop devices.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold font-heading text-[#111111] mb-1">
                  Conversion & Growth Focus
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  We look at your website as a sales and communication engine. Every interface is structured to guide visitors toward taking real action.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold font-heading text-[#111111] mb-1">
                  Direct Sri Lankan Partnership
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  Based in Colombo, we combine an understanding of the local business landscape with global design standards and transparent communication.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Studio Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg border border-[#D9DDE2] bg-[#F5F6F7] p-3 shadow-lg overflow-hidden group">
              <div className="relative aspect-[4/3] rounded overflow-hidden bg-[#E5E7EB]">
                <img
                  src={siteImages.aboutImage}
                  alt="LankanWeb design studio workspace in Colombo Sri Lanka"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="p-4 bg-white mt-3 rounded border border-[#D9DDE2] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#666666]">
                <span className="font-medium text-[#111111]">Studio Workspace & Strategy Desk</span>
                <span className="text-[#0C92FF]">{siteConfig.contact.address}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
