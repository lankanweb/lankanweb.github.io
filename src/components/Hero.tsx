import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowDown, Globe } from 'lucide-react';
import { siteConfig, siteImages } from '../data/siteConfig';
import { trackEvent } from '../utils/analytics';
import { EditorialHeading, EditorialParagraph } from './EditorialTextReveal';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleStart = () => {
    trackEvent('main_cta_click', { location: 'hero_primary' });
    onStartProject();
  };

  const handleExplore = () => {
    trackEvent('main_cta_click', { location: 'hero_secondary' });
    onExploreWork();
  };

  return (
    <section id="hero" className="magnetic-section pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-36 bg-white overflow-hidden">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1240px] mx-auto px-6 lg:px-8"
      >
        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Editorial Headline & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Credibility statement */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#666666] tracking-wide mb-6 uppercase"
            >
              <Globe className="w-4 h-4 text-[#0C92FF]" />
              <span>{siteConfig.brand.credibilityKicker}</span>
            </motion.div>

            {/* Main Editorial Headline with Staggered Word Reveal */}
            <EditorialHeading
              as="h1"
              delay={0.1}
              className="text-4xl sm:text-6xl lg:text-[70px] font-bold text-[#111111] leading-[1.08] tracking-tight font-heading mb-8"
            >
              <span className="editorial-word">Your</span>{' '}
              <span className="editorial-word">next</span>{' '}
              <span className="editorial-word">website</span>{' '}
              <span className="editorial-word">should</span>{' '}
              <span className="editorial-word text-[#0C92FF]">do</span>{' '}
              <span className="editorial-word text-[#0C92FF]">more</span>{' '}
              <span className="editorial-word text-[#0C92FF]">than</span>{' '}
              <span className="editorial-word text-[#0C92FF]">look</span>{' '}
              <span className="editorial-word text-[#0C92FF]">good.</span>
            </EditorialHeading>

            {/* Supporting Editorial Paragraph */}
            <EditorialParagraph
              delay={0.25}
              className="text-lg sm:text-xl text-[#666666] leading-relaxed max-w-xl mb-10 font-normal"
            >
              {siteConfig.brand.supportingMessage}
            </EditorialParagraph>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 mb-12 sm:mb-16"
            >
              <button
                onClick={handleStart}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 text-base font-semibold text-white bg-[#0C92FF] hover:bg-[#004E8D] rounded transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleExplore}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-[#111111] bg-white hover:bg-[#F5F6F7] border border-[#D9DDE2] rounded transition-all duration-200 cursor-pointer"
              >
                <span>Explore Our Work</span>
                <ArrowDown className="w-4 h-4 text-[#666666] transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            </motion.div>

            {/* Restrained Sri Lanka Context Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-t border-[#D9DDE2] pt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#666666]"
            >
              <span className="font-medium text-[#111111]">Colombo Studio</span>
              <span aria-hidden="true" className="text-[#D9DDE2]">·</span>
              <span>Serving businesses in Sri Lanka & internationally</span>
              <span aria-hidden="true" className="text-[#D9DDE2]">·</span>
              <span className="text-[#0C92FF] font-medium">Bespoke Code & Growth Architecture</span>
            </motion.div>
          </div>

          {/* Right Column: Clean Premium Image Showcase (No Window Frame) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-xl border border-[#D9DDE2] bg-[#F5F6F7] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] group"
            >
              <div className="relative aspect-[16/10] bg-[#F5F6F7] overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#F5F6F7] text-xs text-[#666666] font-medium">
                    Loading showcase visual...
                  </div>
                )}
                <img
                  src={siteImages.heroImage}
                  alt="High-end digital experience and website showcase engineered by LankanWeb"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.015] ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
