/**
 * LankanWeb Central Configuration
 * Contains editable brand copy, contact details, social links,
 * and central image references for easy replacement.
 */

// Replaceable image registry
// Replace these local paths with your production portfolio URLs or assets anytime.
export const siteImages = {
  heroImage: '/src/assets/images/hero_digital_mockup_1794209221426.jpg',
  projectOneImage: '/src/assets/images/project_ceylon_tea_1794209221493.jpg',
  projectTwoImage: '/src/assets/images/project_colombo_living_1794209222814.jpg',
  projectThreeImage: '/src/assets/images/project_island_roots_1794209222882.jpg',
  aboutImage: '/src/assets/images/about_studio_workspace_1794209223244.jpg',
};

export const siteConfig = {
  brand: {
    name: 'LANKANWEB',
    fullName: 'LankanWeb',
    logoUrl: '/assets/aistudio/LankanWeb_Website_Logo_6297b932.png',
    logoDarkUrl: '/assets/aistudio/LankanWeb_Website_Logo_drk_3146c7b3.png',
    tagline: 'Digital experiences. Business growth.',
    supportingMessage:
      'We build digital experiences and growth strategies that help businesses attract customers, build trust and grow online.',
    foundingLocation: 'Colombo, Sri Lanka',
    credibilityKicker: 'Web Development · Digital Marketing · Business Growth',
  },
  contact: {
    email: 'lankanwebinfo@gmail.com',
    phone: '+94 76 546 6217',
    displayPhone: '+94 76 546 6217',
    whatsappNumber: '94765466217',
    whatsappDisplay: '+94 76 546 6217',
    whatsappMessage: 'Hi LankanWeb, I would like to discuss a digital project for my business.',
    address: 'Colombo 03, Western Province, Sri Lanka',
    businessHours: 'Monday – Friday, 9:00 AM – 6:00 PM (IST)',
    responseCommitment: 'Typical response within 2–4 hours during business hours.',
  },
  socials: {
    linkedin: 'https://linkedin.com/company/lankanweb',
    facebook: 'https://facebook.com/lankanweb',
    instagram: 'https://instagram.com/lankanweb',
    whatsapp: 'https://wa.me/94765466217?text=Hi%20LankanWeb%2C%20I%20would%20like%20to%20discuss%20a%20digital%20project%20for%20my%20business.',
  },
  navLinks: [
    { label: 'Home', href: '#hero' },
    { label: 'Our Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  analytics: {
    // Analytics tracking triggers (configured via .env or direct values)
    ga4Id: import.meta.env.VITE_GA4_ID || '',
    gtmId: import.meta.env.VITE_GTM_ID || '',
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '',
  },
};

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  services: string[];
  description: string;
  image: string;
  imageAlt: string;
  year: string;
  clientLocation: string;
  overview: string;
  keyDeliverables: string[];
  technologies: string[];
  impactStatement: string;
}

export const sampleProjects: ProjectItem[] = [
  {
    id: 'ceylon-tea-direct',
    name: 'Sarava Single-Origin',
    category: 'E-commerce & Global Export',
    services: ['E-commerce Development', 'Custom Web Design', 'Technical SEO', 'Performance Tuning'],
    description:
      'A high-performance digital storefront engineered for a premium single-origin Ceylon tea exporter, delivering sub-second checkout speeds for international buyers.',
    image: siteImages.projectOneImage,
    imageAlt: 'Sarava Single-Origin Ceylon tea e-commerce website displayed on MacBook Pro screen',
    year: 'Sample Project Showcase',
    clientLocation: 'Nuwara Eliya & Colombo, Sri Lanka',
    overview:
      'Engineered to elevate artisanal Ceylon tea onto the international stage, this e-commerce platform combines editorial storytelling with a friction-free multi-currency checkout. Rebuilt from the ground up to achieve 98+ PageSpeed performance across global regions.',
    keyDeliverables: [
      'Custom Shopify/Headless storefront with multi-currency routing',
      'Ultra-fast international checkout and regional shipping calculation',
      'Structured schema markup for rich global search product snippets',
      'Editorial brand guide and responsive mobile design system',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Shopify Storefront API', 'Stripe'],
    impactStatement: 'Engineered for seamless international buyer conversion and sub-second catalog navigation.',
  },
  {
    id: 'colombo-living',
    name: 'Colombo Living Architectural Properties',
    category: 'Commercial Real Estate & Architecture',
    services: ['Web Design & Development', 'Lead Generation Engine', 'Local SEO', 'CMS Architecture'],
    description:
      'An editorial property showcase celebrating modernist Sri Lankan residential architecture, tailored to connect boutique developers with qualified high-intent investors.',
    image: siteImages.projectTwoImage,
    imageAlt: 'Colombo Living luxury architectural real estate showcase website displayed on tablet',
    year: 'Sample Project Showcase',
    clientLocation: 'Colombo 07, Sri Lanka',
    overview:
      'Designed with spacious Swiss editorial typography and high-resolution architectural photo galleries, Colombo Living presents private villas and luxury penthouses. Implemented with structured inquiry capture that routes buyer specifications directly to client sales teams.',
    keyDeliverables: [
      'Editorial multi-listing architectural catalog with floorplan viewer',
      'Interactive location map integration with Colombo neighborhood guides',
      'High-intent private viewing inquiry funnel with WhatsApp routing',
      'Local Colombo SEO targeting high-net-worth property queries',
    ],
    technologies: ['Next.js / Vite', 'TypeScript', 'Tailwind CSS', 'Mapbox', 'Edge Functions'],
    impactStatement: 'Designed to establish instant architectural prestige and pre-qualify high-value viewing requests.',
  },
  {
    id: 'island-roots',
    name: 'Aura Organic Botanicals',
    category: 'Health, Wellness & Sustainable Retail',
    services: ['Custom Website Redesign', 'Meta & Google Ads', 'Content SEO', 'Conversion Optimization'],
    description:
      'A contemporary brand portal and lifestyle e-commerce platform for sustainable wellness products, harmonizing ethical storytelling with data-driven sales funnels.',
    image: siteImages.projectThreeImage,
    imageAlt: 'Aura Organic Botanicals wellness brand website interface shown on studio monitor',
    year: 'Sample Project Showcase',
    clientLocation: 'Galle & Colombo, Sri Lanka',
    overview:
      'Created to transform an established organic apothecary into an omnichannel retail brand. The clean layout highlights transparent ingredient sourcing, certifications, and subscription discovery, backed by full technical SEO for search discovery.',
    keyDeliverables: [
      'Bespoke product discovery system with formulation filtering',
      'Subscription replenishments and localized checkout payment gateways',
      'Integrated Meta and Google conversion tracking architecture',
      'Fast responsive asset optimization ensuring < 1s Largest Contentful Paint',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Google Tag Manager'],
    impactStatement: 'Crafted to build organic consumer loyalty and support multi-channel digital acquisition.',
  },
];

export interface ServiceCategory {
  number: string;
  title: string;
  description: string;
  formServiceKey: string;
  items: string[];
}

export const servicesData: ServiceCategory[] = [
  {
    number: '01',
    title: 'Web Design & Development',
    description: 'Professional, responsive websites designed to turn visitors into customers.',
    formServiceKey: 'Website Development',
    items: [
      'Business Website Development',
      'Custom Website Design',
      'Landing Page Development',
      'E-commerce Websites',
      'Website Redesign',
      'Website Maintenance',
      'Web Application Development',
    ],
  },
  {
    number: '02',
    title: 'Digital Marketing & Growth',
    description: 'Reach the right audience, build stronger relationships and turn attention into business opportunities.',
    formServiceKey: 'Digital Marketing',
    items: [
      'Social Media Management',
      'Social Media Strategy',
      'Content Creation',
      'Facebook and Instagram Marketing',
      'Meta Ads',
      'Google Ads',
      'Media Buying',
      'Campaign Management',
      'Lead Generation',
    ],
  },
  {
    number: '03',
    title: 'SEO & Search Visibility',
    description: 'Make your business easier to discover when potential customers are searching for your services.',
    formServiceKey: 'SEO',
    items: [
      'Technical SEO',
      'On-page SEO',
      'Off-page SEO',
      'Local SEO (Sri Lanka & Regional)',
      'Keyword Research & Competitive Analysis',
      'Content SEO',
      'Website SEO Audits',
      'Search Performance Tracking',
    ],
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverables: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'Understand your business, audience, objectives and challenges.',
    deliverables: 'Discovery workshop, audience mapping, project brief & scope.',
  },
  {
    step: '02',
    title: 'Strategise',
    description: 'Define the right design, technology and marketing approach.',
    deliverables: 'Information architecture, tech stack selection & growth roadmap.',
  },
  {
    step: '03',
    title: 'Create',
    description: 'Design and develop the experience with attention to detail.',
    deliverables: 'Wireframes, responsive UI design, clean code & copywriting.',
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Test, optimise and launch your digital solution.',
    deliverables: 'Cross-browser QA, mobile testing, SEO audit & live deployment.',
  },
  {
    step: '05',
    title: 'Grow',
    description: 'Measure performance, improve results and identify new opportunities.',
    deliverables: 'Analytics setup, search tracking & iterative conversion tuning.',
  },
];

export const enquiryServiceOptions = [
  'Website Development',
  'Digital Marketing',
  'SEO',
  'Social Media Management',
  'Paid Advertising',
  'Multiple Services',
  'Other',
];
