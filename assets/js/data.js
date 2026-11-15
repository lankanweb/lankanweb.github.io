/**
 * LankanWeb Central Data & Configuration (ES6+)
 */

export const siteImages = {
  heroImage: 'assets/images/hero_digital_mockup_1794209221426.jpg',
  heroImageWebp: 'assets/images/hero_digital_mockup_1794209221426.webp',
  projectOneImage: 'assets/images/project_ceylon_tea_1794209221493.jpg',
  projectOneImageWebp: 'assets/images/project_ceylon_tea_1794209221493.webp',
  projectTwoImage: 'assets/images/project_colombo_living_1794209222814.jpg',
  projectTwoImageWebp: 'assets/images/project_colombo_living_1794209222814.webp',
  projectThreeImage: 'assets/images/project_island_roots_1794209222882.jpg',
  projectThreeImageWebp: 'assets/images/project_island_roots_1794209222882.webp',
  aboutImage: 'assets/images/about_studio_workspace_1794209223244.jpg',
  aboutImageWebp: 'assets/images/about_studio_workspace_1794209223244.webp',
};

export const siteConfig = {
  brand: {
    name: 'LANKANWEB',
    fullName: 'LankanWeb',
    logoUrl: 'assets/aistudio/LankanWeb_Website_Logo_6297b932.png',
    logoDarkUrl: 'assets/aistudio/LankanWeb_Website_Logo_drk_3146c7b3.png',
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
    whatsapp:
      'https://wa.me/94765466217?text=Hi%20LankanWeb%2C%20I%20would%20like%20to%20discuss%20a%20digital%20project%20for%20my%20business.',
  },
};

export const sampleProjects = [
  {
    id: 'ceylon-tea-direct',
    name: 'Sarava Single-Origin',
    category: 'E-commerce & Global Export',
    services: ['E-commerce Development', 'Custom Web Design', 'Technical SEO', 'Performance Tuning'],
    description:
      'A high-performance digital storefront engineered for a premium single-origin Ceylon tea exporter, delivering sub-second checkout speeds for international buyers.',
    image: siteImages.projectOneImage,
    imageWebp: siteImages.projectOneImageWebp,
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
    imageWebp: siteImages.projectTwoImageWebp,
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
    imageWebp: siteImages.projectThreeImageWebp,
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

export const enquiryServiceOptions = [
  'Website Development',
  'Digital Marketing',
  'SEO',
  'Social Media Management',
  'Paid Advertising',
  'Multiple Services',
  'Other',
];
