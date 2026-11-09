import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { trackEvent } from '../utils/analytics';
import { EditorialHeading, EditorialParagraph } from './EditorialTextReveal';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How long does it take to design and launch a new business website?',
    answer:
      'A bespoke business website typically takes between 2 to 4 weeks from initial discovery to deployment. More complex e-commerce platforms or web applications with custom integrations usually require 4 to 6 weeks. We work with defined milestones and clear timelines so you always know what stage your project is at.',
  },
  {
    question: 'How much does a website development project cost in Sri Lanka?',
    answer:
      'Every project is scoped individually based on your requirements, desired functionality, and business objectives. We do not use one-size-fits-all pricing because an artisanal exporter requires different architecture than a local medical clinic. Contact us for a transparent, itemized quotation with zero hidden fees.',
  },
  {
    question: 'Do you use pre-made templates or do you build custom websites?',
    answer:
      'We design and build bespoke, tailored digital solutions. Off-the-shelf templates and bloated theme builders come with unnecessary plugins, slow load times, and poor mobile responsiveness. By writing clean, modern code, your website will be significantly faster, more secure, and distinctly unique to your brand.',
  },
  {
    question: 'Can LankanWeb help our website rank on Google search in Sri Lanka and abroad?',
    answer:
      'Yes. Search Engine Optimization (SEO) is built into every website we develop from day one. We implement semantic HTML5, fast Core Web Vitals, mobile-first responsiveness, local business schema markup, and metadata tailored for both Sri Lankan queries and global target markets.',
  },
  {
    question: 'Will our website load quickly on local Sri Lankan mobile connections?',
    answer:
      'Yes. Over 75% of web traffic in Sri Lanka occurs on mobile networks (Dialog, SLT-Mobitel, Airtel). We optimize every image asset, minimize JavaScript bundles, and utilize modern edge caching so your website loads within 1 to 2 seconds even on standard 4G connections.',
  },
  {
    question: 'Can you integrate local Sri Lankan payment gateways and WhatsApp chat?',
    answer:
      'Absolutely. We have extensive experience integrating leading Sri Lankan payment gateways (such as PayHere, WebXPay, Commercial Bank, Sampath Vishwa) along with international options like Stripe. We also configure instant WhatsApp direct chat triggers so potential customers can reach you with one tap.',
  },
  {
    question: 'What happens after our website is launched? Do you provide maintenance?',
    answer:
      'Yes. We provide comprehensive post-launch support and monthly maintenance packages covering technical health checks, security patches, regular backups, speed monitoring, and content updates to ensure your digital presence continues to run smoothly.',
  },
  {
    question: 'How do we get started on a project with LankanWeb?',
    answer:
      'Getting started is straightforward. Send us a message through our project enquiry form below or chat with us on WhatsApp at +94 76 546 6217. We will schedule a brief discovery call to understand your goals and deliver a detailed scope of work.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleWhatsAppHelp = () => {
    trackEvent('whatsapp_click', { location: 'faq_section' });
  };

  return (
    <section
      id="faq"
      className="magnetic-section py-24 sm:py-32 lg:py-36 bg-gradient-to-br from-[#0C92FF] via-[#007AE6] to-[#005DB8] text-white relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Quick WhatsApp Prompt Container */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/80 mb-3 block">
                Frequently Asked Questions
              </span>
              <EditorialHeading
                as="h2"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading tracking-tight mb-4"
              >
                <span className="editorial-word">Clear</span>{' '}
                <span className="editorial-word">answers</span>{' '}
                <span className="editorial-word">for</span>{' '}
                <span className="editorial-word">your</span>{' '}
                <span className="editorial-word">project.</span>
              </EditorialHeading>
              <EditorialParagraph className="text-base sm:text-lg text-white/90 leading-relaxed mb-8">
                Everything you need to know about our web development, SEO, and growth marketing process in Sri Lanka.
              </EditorialParagraph>
            </div>

            {/* Quick WhatsApp Support Box */}
            <div className="p-6 sm:p-7 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 shadow-lg">
              <div className="flex items-center gap-2 text-base font-bold text-white mb-2 font-heading">
                <MessageCircle className="w-5 h-5 text-white shrink-0" />
                <span>Have a specific question?</span>
              </div>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed mb-5">
                We are always available to discuss technical requirements, timelines, or custom scopes directly.
              </p>
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppHelp}
                className="inline-flex items-center justify-between w-full sm:w-auto gap-3 px-5 py-3 rounded-lg bg-white text-[#005DB8] hover:bg-neutral-100 font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm group"
              >
                <span>Chat on WhatsApp ({siteConfig.contact.whatsappDisplay})</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Accordion Container */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7"
          >
            <div className="divide-y divide-white/20 border-y border-white/20">
              {faqData.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="py-5 sm:py-6"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between text-left gap-4 focus:outline-none group cursor-pointer"
                    >
                      <span className="text-base sm:text-lg font-bold text-white group-hover:text-white/85 transition-colors font-heading leading-snug">
                        {faq.question}
                      </span>
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-[#0C92FF] transition-all">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-sm sm:text-base text-white/95 leading-relaxed font-normal">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
