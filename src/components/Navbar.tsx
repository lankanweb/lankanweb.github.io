import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { trackEvent } from '../utils/analytics';
import { scrollToSection } from '../utils/smoothScroll';

interface NavbarProps {
  onStartProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(href);
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    trackEvent('main_cta_click', { location: 'navbar' });
    onStartProject();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#D9DDE2] shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
          : 'bg-white border-b border-[#D9DDE2]'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center whitespace-nowrap shrink-0"
          aria-label="LankanWeb Home"
        >
          <img
            src={siteConfig.brand.logoUrl}
            alt="LankanWeb Logo"
            className="h-12 sm:h-14 md:h-15 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#666666]">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[#111111] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#0C92FF] hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={handleCtaClick}
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0C92FF] hover:bg-[#004E8D] rounded transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-2 text-[#111111] hover:text-[#0C92FF] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#D9DDE2] px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#111111]">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2 border-b border-[#F5F6F7] hover:text-[#0C92FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <button
                onClick={handleCtaClick}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0C92FF] hover:bg-[#004E8D] rounded transition-colors cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
