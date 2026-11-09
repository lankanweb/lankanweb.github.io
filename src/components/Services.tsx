import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Globe,
  Layout,
  MousePointerClick,
  ShoppingBag,
  RefreshCw,
  Wrench,
  Code,
  Share2,
  Compass,
  PenTool,
  Smartphone,
  Target,
  Zap,
  DollarSign,
  Layers,
  TrendingUp,
  Cpu,
  FileCode2,
  Link2,
  MapPin,
  Key,
  FileText,
  CheckCircle2,
  LineChart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { EditorialHeading, EditorialParagraph } from './EditorialTextReveal';

interface ServiceItemDetail {
  name: string;
  tag: string;
  icon: React.ElementType;
}

interface ServiceCategoryDetail {
  number: string;
  title: string;
  tagline: string;
  description: string;
  formServiceKey: string;
  badge: string;
  items: ServiceItemDetail[];
}

const modernServicesData: ServiceCategoryDetail[] = [
  {
    number: '01',
    title: 'Web Design & Development',
    tagline: 'High-performance engineering that turns traffic into revenue.',
    description:
      'Professional, responsive websites built with clean code, sub-second speeds, and conversion-focused architectures.',
    formServiceKey: 'Website Development',
    badge: 'Core Web Vitals < 1.2s',
    items: [
      { name: 'Business Website Development', tag: 'Corporate & Enterprise', icon: Globe },
      { name: 'Custom Website Design', tag: 'Bespoke Art-Directed UI', icon: Layout },
      { name: 'Landing Page Development', tag: 'High-Intent Conversion', icon: MousePointerClick },
      { name: 'E-commerce Websites', tag: 'Fast Global Checkout', icon: ShoppingBag },
      { name: 'Website Redesign', tag: 'Modernize & Speed Up', icon: RefreshCw },
      { name: 'Website Maintenance', tag: 'Security & Edge Updates', icon: Wrench },
      { name: 'Web Application Development', tag: 'Scalable Cloud Portals', icon: Code },
    ],
  },
  {
    number: '02',
    title: 'Digital Marketing & Growth',
    tagline: 'Reach the right audience, generate qualified leads, and scale.',
    description:
      'Build stronger brand trust, acquire paying customers across Meta and Google, and turn attention into measurable business opportunities.',
    formServiceKey: 'Digital Marketing',
    badge: 'Data-Driven Multi-Channel ROI',
    items: [
      { name: 'Social Media Management', tag: 'Brand Voice & Curation', icon: Share2 },
      { name: 'Social Media Strategy', tag: 'Audience Targeting', icon: Compass },
      { name: 'Content Creation', tag: 'High-Fidelity Assets', icon: PenTool },
      { name: 'Facebook & Instagram Marketing', tag: 'Community & Organic Reach', icon: Smartphone },
      { name: 'Meta Ads', tag: 'Precision Retargeting', icon: Target },
      { name: 'Google Ads', tag: 'High-Intent Search Ads', icon: Zap },
      { name: 'Media Buying', tag: 'Cost-Effective Ad Spend', icon: DollarSign },
      { name: 'Campaign Management', tag: 'Full-Funnel Tracking', icon: Layers },
      { name: 'Lead Generation', tag: 'B2B & B2C Inbound Sales', icon: TrendingUp },
    ],
  },
  {
    number: '03',
    title: 'SEO & Search Visibility',
    tagline: 'Make your business discoverable when customers search in Sri Lanka & abroad.',
    description:
      'Dominate commercial search rankings with white-hat technical foundations, localized schema, and authority-building content strategies.',
    formServiceKey: 'SEO',
    badge: 'Page 1 Google Dominance',
    items: [
      { name: 'Technical SEO', tag: 'Crawlability & Web Speed', icon: Cpu },
      { name: 'On-page SEO', tag: 'Semantic HTML & Headings', icon: FileCode2 },
      { name: 'Off-page SEO', tag: 'Authority & Backlinks', icon: Link2 },
      { name: 'Local SEO (Sri Lanka & Regional)', tag: 'Google Maps & Reviews', icon: MapPin },
      { name: 'Keyword Research', tag: 'Search Intent Mapping', icon: Key },
      { name: 'Content SEO', tag: 'Editorial High-Value Copy', icon: FileText },
      { name: 'Website SEO Audits', tag: 'Comprehensive Health Diagnostic', icon: CheckCircle2 },
      { name: 'Search Performance Tracking', tag: 'Live GA4 & GSC Metrics', icon: LineChart },
    ],
  },
];

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const handleDiscuss = (serviceKey: string, categoryTitle: string) => {
    trackEvent('service_discussed', { service: categoryTitle });
    onSelectService(serviceKey);
  };

  const handleCapabilityClick = (serviceKey: string, capabilityName: string) => {
    trackEvent('service_discussed', { capability: capabilityName, category: serviceKey });
    onSelectService(serviceKey);
  };

  const filteredCategories =
    activeCategoryFilter === 'all'
      ? modernServicesData
      : modernServicesData.filter((cat) => cat.formServiceKey === activeCategoryFilter);

  return (
    <section
      id="services"
      className="magnetic-section py-24 sm:py-32 lg:py-36 bg-gradient-to-b from-[#F5F6F7]/70 via-white to-[#F5F6F7]/60 border-t border-[#D9DDE2] relative overflow-hidden"
    >
      {/* Subtle background accent glow for modern atmosphere */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0C92FF]/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Heading Container */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 lg:mb-20">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C92FF]/10 border border-[#0C92FF]/20 text-xs font-bold text-[#0C92FF] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Capabilities & Solutions</span>
            </div>
            <EditorialHeading
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] font-heading tracking-tight mb-4"
            >
              <span className="editorial-word">Everything</span>{' '}
              <span className="editorial-word">your</span>{' '}
              <span className="editorial-word">business</span>{' '}
              <span className="editorial-word">needs</span>{' '}
              <span className="editorial-word">to</span>{' '}
              <span className="editorial-word">grow</span>{' '}
              <span className="editorial-word">online.</span>
            </EditorialHeading>
            <EditorialParagraph className="text-base sm:text-lg text-[#666666] leading-relaxed">
              From high-converting web engineering to multi-channel paid acquisition, we unite every component of your modern digital presence.
            </EditorialParagraph>
          </motion.div>

          {/* Interactive Category Filter Pills */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#D9DDE2] rounded-xl shadow-xs shrink-0 self-start md:self-auto"
          >
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeCategoryFilter === 'all'
                  ? 'bg-[#0C92FF] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#111111] hover:bg-[#F5F6F7]'
              }`}
            >
              All Capabilities
            </button>
            <button
              onClick={() => setActiveCategoryFilter('Website Development')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeCategoryFilter === 'Website Development'
                  ? 'bg-[#0C92FF] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#111111] hover:bg-[#F5F6F7]'
              }`}
            >
              Web Development
            </button>
            <button
              onClick={() => setActiveCategoryFilter('Digital Marketing')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeCategoryFilter === 'Digital Marketing'
                  ? 'bg-[#0C92FF] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#111111] hover:bg-[#F5F6F7]'
              }`}
            >
              Digital Marketing
            </button>
            <button
              onClick={() => setActiveCategoryFilter('SEO')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeCategoryFilter === 'SEO'
                  ? 'bg-[#0C92FF] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#111111] hover:bg-[#F5F6F7]'
              }`}
            >
              SEO & Visibility
            </button>
          </motion.div>
        </div>

        {/* Dynamic Category Cards */}
        <div className="space-y-10 lg:space-y-12">
          <AnimatePresence mode="wait">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.number}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group/card rounded-2xl border border-[#D9DDE2] bg-white p-7 sm:p-10 lg:p-12 shadow-sm hover:shadow-[0_20px_45px_rgba(12,146,255,0.08)] hover:border-[#0C92FF]/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle top accent highlight stripe on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#0C92FF] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Number, Title, Tagline & CTA */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full">
                    <div>
                      {/* Category Header Row */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-9 h-9 rounded-lg bg-[#0C92FF]/10 border border-[#0C92FF]/20 text-xs font-mono font-bold text-[#0C92FF] flex items-center justify-center shrink-0">
                          {category.number}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold text-[#004E8D] bg-[#0C92FF]/10 border border-[#0C92FF]/20">
                          {category.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#111111] tracking-tight mb-2 group-hover/card:text-[#0C92FF] transition-colors">
                        {category.title}
                      </h3>

                      <p className="text-sm font-semibold text-[#111111] mb-3">
                        {category.tagline}
                      </p>

                      <p className="text-sm text-[#666666] leading-relaxed mb-6 font-normal">
                        {category.description}
                      </p>
                    </div>

                    {/* Action Button with micro-interaction */}
                    <div className="pt-2">
                      <button
                        onClick={() => handleDiscuss(category.formServiceKey, category.title)}
                        className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#0C92FF]/10 hover:bg-[#0C92FF] text-xs font-semibold text-[#0C92FF] hover:text-white transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm"
                      >
                        <span>Discuss {category.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Interactive Capability Cards Grid with Icons */}
                  <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      {category.items.map((item, itemIdx) => {
                        const IconComponent = item.icon;

                        return (
                          <div
                            key={item.name}
                            onClick={() => handleCapabilityClick(category.formServiceKey, item.name)}
                            className="group/item flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border border-[#D9DDE2]/80 bg-[#FAFBFC] hover:bg-white hover:border-[#0C92FF] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                            title={`Click to discuss ${item.name}`}
                          >
                            {/* Animated Icon Avatar */}
                            <div className="w-9 h-9 rounded-lg bg-[#0C92FF]/10 text-[#0C92FF] group-hover/item:bg-[#0C92FF] group-hover/item:text-white flex items-center justify-center shrink-0 transition-all duration-200 shadow-2xs group-hover/item:scale-105 mt-0.5">
                              <IconComponent className="w-4 h-4 transition-transform duration-200 group-hover/item:rotate-3" />
                            </div>

                            {/* Text & Micro-tag */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-semibold text-[#111111] group-hover/item:text-[#0C92FF] transition-colors leading-snug">
                                  {item.name}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-neutral-300 opacity-0 group-hover/item:opacity-100 group-hover/item:text-[#0C92FF] transition-all duration-200 group-hover/item:translate-x-0.5 shrink-0" />
                              </div>
                              <span className="text-[11px] font-medium text-[#777777] block mt-0.5 truncate">
                                {item.tag}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Helper Bar with Quick Inquiry Trigger */}
        <div className="mt-14 p-6 rounded-xl bg-white border border-[#D9DDE2] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0C92FF]/15 text-[#0C92FF] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#111111] block">
                Looking for a combined digital solution?
              </span>
              <span className="text-xs text-[#666666]">
                We package custom web development, local SEO, and Meta ads into integrated growth contracts.
              </span>
            </div>
          </div>
          <button
            onClick={() => onSelectService('Multiple Services')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#0C92FF] text-white text-xs font-semibold transition-colors duration-200 cursor-pointer shrink-0"
          >
            <span>Request Combined Proposal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
