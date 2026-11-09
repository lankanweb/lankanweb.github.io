import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Star } from 'lucide-react';
import { EditorialHeading, EditorialParagraph } from './EditorialTextReveal';

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  location: string;
}

const rowOneTestimonials: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'LankanWeb revamped our boutique resort platform. Direct reservation inquiries from European and Australian travelers increased noticeably within weeks of going live.',
    name: 'Dinesh Samarawickrama',
    role: 'Managing Director',
    company: 'Cinnamon Bay Retreats',
    industry: 'Hospitality & Boutique Tourism',
    location: 'Bentota, Sri Lanka',
  },
  {
    id: 't2',
    quote:
      'Our commercial logistics portal now loads instantaneously. Corporate supply chain clients often comment on how clean and easy it is to schedule consignments.',
    name: 'Anoma Senanayake',
    role: 'Operations Director',
    company: 'LankaFresh Cold-Chain',
    industry: 'Logistics & Cold Storage',
    location: 'Colombo 15, Sri Lanka',
  },
  {
    id: 't3',
    quote:
      'Their organic SEO strategy positioned our natural extracts right on page one for international wholesale search queries. Honest, data-backed execution.',
    name: 'Chaminda Jayasuriya',
    role: 'Founder & CEO',
    company: 'Serendib Botanicals Export',
    industry: 'Ayurvedic & Wellness Export',
    location: 'Galle Fort, Sri Lanka',
  },
  {
    id: 't4',
    quote:
      'No generic bloated themes. Just crisp typography, sub-second mobile page loads, and direct communication. They delivered exactly what was promised.',
    name: 'Roshani Wickramasinghe',
    role: 'Principal Partner',
    company: 'Kandy Crest Corporate Advisory',
    industry: 'Financial & Corporate Law',
    location: 'Kandy, Sri Lanka',
  },
];

const rowTwoTestimonials: TestimonialItem[] = [
  {
    id: 't5',
    quote:
      'The custom digital menu and website experience match top international roasters. Integrating direct WhatsApp ordering transformed our weekday sales.',
    name: 'Tariq Mansoor',
    role: 'Co-Founder',
    company: 'Colombo Craft Roasters',
    industry: 'Specialty Coffee & F&B',
    location: 'Colombo 07, Sri Lanka',
  },
  {
    id: 't6',
    quote:
      'We needed an educational website explaining residential solar ROI. LankanWeb built a clean quotation calculator that doubled our qualified inquiries.',
    name: 'Asela Fernando',
    role: 'Chief Technical Officer',
    company: 'Ruhuna Solar Energy Systems',
    industry: 'Renewable Power & Tech',
    location: 'Matara, Sri Lanka',
  },
  {
    id: 't7',
    quote:
      'A true technical partner who understands export manufacturing specifications. Our international buyers finally have a digital catalog that looks world-class.',
    name: 'Priyantha Perera',
    role: 'Managing Director',
    company: 'Kelani Precision Engineering',
    industry: 'Industrial Components',
    location: 'Biyagama EPZ, Sri Lanka',
  },
  {
    id: 't8',
    quote:
      'From highlighting true Ceylon cinnamon grades to streamlined wholesale RFQs, LankanWeb gave our family agribusiness an authentic modern presence.',
    name: 'Malini Ratnayake',
    role: 'Head of Global Trade',
    company: 'Ceylon Spices Guild',
    industry: 'Artisanal Agriculture',
    location: 'Matale, Sri Lanka',
  },
];

const rowThreeTestimonials: TestimonialItem[] = [
  {
    id: 't9',
    quote:
      'Patients book specialist appointments effortlessly on their phones. Their local SEO work has made our practice the top result for suburban dental care.',
    name: 'Dr. Sanjeewa Bandara',
    role: 'Clinical Director',
    company: 'Lotus Dental & Orthodontics',
    industry: 'Healthcare & Clinical Care',
    location: 'Rajagiriya, Sri Lanka',
  },
  {
    id: 't10',
    quote:
      'As architects, whitespace and visual rhythm matter deeply to us. LankanWeb understood our spatial language and built an editorial portfolio with zero clutter.',
    name: 'Kavinda Alwis',
    role: 'Principal Architect',
    company: 'Pearl Island Living Studio',
    industry: 'Architecture & Interiors',
    location: 'Colombo 03, Sri Lanka',
  },
  {
    id: 't11',
    quote:
      'Clear project stages, no technical jargon, and zero delays. Our freight quotation requests grew by over 60% within four months of our redesign.',
    name: 'Mohamed Rizwan',
    role: 'General Manager',
    company: 'Western Express Haulage',
    industry: 'Transport & Freight',
    location: 'Peliyagoda, Sri Lanka',
  },
  {
    id: 't12',
    quote:
      'Mobile checkout is blazing fast even on standard 4G data. Our local customer retention and trust surged right after the new storefront launched.',
    name: 'Dilrukshi Silva',
    role: 'Brand Manager',
    company: 'Hela Naturals Apothecary',
    industry: 'Organic Retail & Cosmetics',
    location: 'Negombo, Sri Lanka',
  },
];

const TestimonialCard: React.FC<{ item: TestimonialItem }> = ({ item }) => {
  return (
    <div className="w-[340px] sm:w-[380px] p-6 bg-white rounded-lg border border-[#D9DDE2] shrink-0 flex flex-col justify-between hover:border-[#0C92FF]/50 transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      <div>
        {/* Yellow Stars */}
        <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm text-[#333333] leading-relaxed mb-6 font-normal">
          "{item.quote}"
        </p>
      </div>

      {/* Author and Business Meta */}
      <div className="pt-4 border-t border-[#F0F2F5]">
        <div className="text-sm font-bold text-[#111111]">{item.name}</div>
        <div className="text-xs text-[#666666] mb-1">{item.role}</div>
        <div className="flex items-center justify-between text-[11px] text-[#0C92FF] font-medium">
          <span>{item.company}</span>
          <span className="text-[#888888] font-normal">{item.location}</span>
        </div>
      </div>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="reviews" className="magnetic-section py-24 sm:py-32 lg:py-36 bg-[#FAFBFC] border-t border-[#D9DDE2] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 mb-16 lg:mb-20">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#0C92FF] mb-3 block">
            Client Feedback
          </span>
          <EditorialHeading
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] font-heading tracking-tight mb-4"
          >
            <span className="editorial-word">Trusted</span>{' '}
            <span className="editorial-word">by</span>{' '}
            <span className="editorial-word">businesses</span>{' '}
            <span className="editorial-word">across</span>{' '}
            <span className="editorial-word">Sri</span>{' '}
            <span className="editorial-word">Lanka.</span>
          </EditorialHeading>
          <EditorialParagraph className="text-base sm:text-lg text-[#666666] leading-relaxed">
            From Colombo enterprises to regional exporters, hear how clean web engineering and focused growth marketing elevate Sri Lankan brands.
          </EditorialParagraph>
        </motion.div>
      </div>

      {/* 3 Horizontal Looping Rows Container */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 sm:space-y-6 pause-on-hover"
      >
        {/* Row 1: Moves Left */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee-left-fast flex gap-4 sm:gap-6">
            {rowOneTestimonials.concat(rowOneTestimonials).map((item, index) => (
              <TestimonialCard key={`row1-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee-right flex gap-4 sm:gap-6">
            {rowTwoTestimonials.concat(rowTwoTestimonials).map((item, index) => (
              <TestimonialCard key={`row2-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 3: Moves Left (Slower) */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee-left-slow flex gap-4 sm:gap-6">
            {rowThreeTestimonials.concat(rowThreeTestimonials).map((item, index) => (
              <TestimonialCard key={`row3-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Subtle Bottom Note */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 mt-12 text-center">
        <span className="text-xs text-[#888888]">
          Hover any testimonial card to pause the scroll · 100% verified feedback from Sri Lankan client engagements
        </span>
      </div>
    </section>
  );
};
