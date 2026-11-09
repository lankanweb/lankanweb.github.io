import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Send,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { siteConfig, enquiryServiceOptions } from '../data/siteConfig';
import { trackEvent } from '../utils/analytics';
import { EditorialHeading, EditorialParagraph } from './EditorialTextReveal';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    whatsappNumber: '',
    service: enquiryServiceOptions[0],
    projectDescription: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    enquiryId: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync preselectedService prop when changed from parent
  useEffect(() => {
    if (preselectedService) {
      const match = enquiryServiceOptions.find(
        (opt) => opt.toLowerCase() === preselectedService.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({ ...prev, service: match }));
      }
    }
  }, [preselectedService]);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.businessName.trim()) {
      errors.businessName = 'Please enter your business or company name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.whatsappNumber.trim()) {
      errors.whatsappNumber = 'Please enter your WhatsApp contact number.';
    } else if (formData.whatsappNumber.trim().length < 6) {
      errors.whatsappNumber = 'Please enter a valid phone number with country code.';
    }

    if (!formData.projectDescription.trim()) {
      errors.projectDescription = 'Please briefly outline your project goals.';
    } else if (formData.projectDescription.trim().length < 10) {
      errors.projectDescription = 'Description should be at least 10 characters.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionSuccess({
          enquiryId: result.enquiryId || `LW-${Date.now().toString(36).toUpperCase()}`,
          message: result.message || 'Thank you. We will contact you within 2–4 hours.',
        });
        trackEvent('project_enquiry_submitted', {
          service: formData.service,
          business: formData.businessName,
        });
      } else {
        setErrorMessage(
          result.error || 'Failed to submit enquiry. Please try again or message us on WhatsApp.'
        );
      }
    } catch (err) {
      console.warn('Backend unavailable, fallback to direct WhatsApp submission option', err);
      // Helpful fallback state if network error occurs
      setErrorMessage(
        'Connection error. You can reach us directly on WhatsApp or try submitting again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { location: 'contact_section' });
  };

  const handleEmailClick = () => {
    trackEvent('email_click', { location: 'contact_section' });
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      businessName: '',
      email: '',
      whatsappNumber: '',
      service: enquiryServiceOptions[0],
      projectDescription: '',
    });
    setFormErrors({});
    setSubmissionSuccess(null);
    setErrorMessage(null);
  };

  return (
    <section id="contact" className="magnetic-section py-24 sm:py-32 lg:py-36 bg-[#0D0E11] text-white relative">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1240px] mx-auto px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Agency Information & Secondary CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0C92FF] mb-3 block">
                Start a Conversation
              </span>

              <EditorialHeading
                as="h2"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-white mb-6"
              >
                <span className="editorial-word">Have</span>{' '}
                <span className="editorial-word">a</span>{' '}
                <span className="editorial-word">business</span>{' '}
                <span className="editorial-word">to</span>{' '}
                <span className="editorial-word">grow?</span>{' '}
                <span className="editorial-word">Let's</span>{' '}
                <span className="editorial-word">build</span>{' '}
                <span className="editorial-word">something</span>{' '}
                <span className="editorial-word">that</span>{' '}
                <span className="editorial-word">works.</span>
              </EditorialHeading>

              <EditorialParagraph className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed mb-10 font-normal">
                Tell us about your business, your goals and what you want to achieve. Let's find the right digital solution.
              </EditorialParagraph>

              {/* Direct Secondary Action: WhatsApp Button */}
              <div className="mb-12">
                <a
                  href={siteConfig.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-[#16181D] hover:bg-[#1E2128] border border-[#2A2F38] text-white font-semibold text-sm transition-all duration-200 shadow-sm group"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] transition-transform duration-200 group-hover:scale-110" />
                  <span>Chat on WhatsApp</span>
                  <span className="text-xs text-[#9CA3AF] ml-2">({siteConfig.contact.whatsappDisplay})</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Metadata */}
            <div className="space-y-6 pt-8 border-t border-[#2A2F38] text-sm text-[#9CA3AF]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0C92FF] shrink-0 mt-1" />
                <div>
                  <span className="text-xs text-[#6B7280] uppercase tracking-wider block">Direct Email</span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    onClick={handleEmailClick}
                    className="text-white hover:text-[#0C92FF] font-medium transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0C92FF] shrink-0 mt-1" />
                <div>
                  <span className="text-xs text-[#6B7280] uppercase tracking-wider block">Telephone & WhatsApp</span>
                  <span className="text-white font-medium">{siteConfig.contact.displayPhone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0C92FF] shrink-0 mt-1" />
                <div>
                  <span className="text-xs text-[#6B7280] uppercase tracking-wider block">Location</span>
                  <span className="text-white font-medium">{siteConfig.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#0C92FF] shrink-0 mt-1" />
                <div>
                  <span className="text-xs text-[#6B7280] uppercase tracking-wider block">Business Hours & Response</span>
                  <span className="text-white block font-medium">{siteConfig.contact.businessHours}</span>
                  <span className="text-xs text-[#9CA3AF] mt-0.5 block">{siteConfig.contact.responseCommitment}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#14161C] border border-[#2A2F38] rounded-xl p-6 sm:p-8 lg:p-10 shadow-2xl">
              {submissionSuccess ? (
                /* Success Confirmation State */
                <div className="py-8 text-center animate-in fade-in duration-200">
                  <div className="w-14 h-14 bg-[#0C92FF]/15 text-[#0C92FF] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0C92FF]/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-2">
                    Enquiry Received
                  </h3>
                  <div className="inline-block bg-[#1B1E26] px-3.5 py-1 rounded text-xs font-mono text-[#0C92FF] mb-4 border border-[#2A2F38]">
                    Reference: {submissionSuccess.enquiryId}
                  </div>
                  <p className="text-sm text-[#9CA3AF] max-w-md mx-auto leading-relaxed mb-8">
                    {submissionSuccess.message}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleResetForm}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2A2F38] hover:bg-[#374151] rounded transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                    <a
                      href={siteConfig.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-200 rounded transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Speed up via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* Interactive Project Brief Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#2A2F38]">
                    <span className="text-sm font-semibold text-white font-heading">
                      Project Enquiry Details
                    </span>
                    <span className="text-xs text-[#9CA3AF]">* All fields required</span>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Full Name & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-medium text-[#D1D5DB] mb-1.5">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                        }}
                        placeholder="Kasun Perera"
                        className={`w-full bg-[#0D0E11] border ${
                          formErrors.fullName ? 'border-red-500' : 'border-[#2A2F38]'
                        } rounded px-3.5 py-2.5 text-sm text-white placeholder-[#4B5563] focus:border-[#0C92FF] focus:outline-none transition-colors`}
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-xs text-red-400">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="businessName" className="block text-xs font-medium text-[#D1D5DB] mb-1.5">
                        Business / Company Name
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => {
                          setFormData({ ...formData, businessName: e.target.value });
                          if (formErrors.businessName) setFormErrors({ ...formErrors, businessName: '' });
                        }}
                        placeholder="Ceylon Artisan Holdings"
                        className={`w-full bg-[#0D0E11] border ${
                          formErrors.businessName ? 'border-red-500' : 'border-[#2A2F38]'
                        } rounded px-3.5 py-2.5 text-sm text-white placeholder-[#4B5563] focus:border-[#0C92FF] focus:outline-none transition-colors`}
                      />
                      {formErrors.businessName && (
                        <p className="mt-1 text-xs text-red-400">{formErrors.businessName}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email Address & WhatsApp Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-[#D1D5DB] mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        placeholder="kasun@ceylonartisan.lk"
                        className={`w-full bg-[#0D0E11] border ${
                          formErrors.email ? 'border-red-500' : 'border-[#2A2F38]'
                        } rounded px-3.5 py-2.5 text-sm text-white placeholder-[#4B5563] focus:border-[#0C92FF] focus:outline-none transition-colors`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-400">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="whatsappNumber" className="block text-xs font-medium text-[#D1D5DB] mb-1.5">
                        WhatsApp Number
                      </label>
                      <input
                        id="whatsappNumber"
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, whatsappNumber: e.target.value });
                          if (formErrors.whatsappNumber) setFormErrors({ ...formErrors, whatsappNumber: '' });
                        }}
                        placeholder="+94 77 000 0000"
                        className={`w-full bg-[#0D0E11] border ${
                          formErrors.whatsappNumber ? 'border-red-500' : 'border-[#2A2F38]'
                        } rounded px-3.5 py-2.5 text-sm text-white placeholder-[#4B5563] focus:border-[#0C92FF] focus:outline-none transition-colors`}
                      />
                      {formErrors.whatsappNumber && (
                        <p className="mt-1 text-xs text-red-400">{formErrors.whatsappNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Service Interested In */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-medium text-[#D1D5DB] mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#0D0E11] border border-[#2A2F38] rounded px-3.5 py-2.5 text-sm text-white focus:border-[#0C92FF] focus:outline-none transition-colors cursor-pointer"
                    >
                      {enquiryServiceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#14161C] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Brief Project Description */}
                  <div>
                    <label htmlFor="projectDescription" className="block text-xs font-medium text-[#D1D5DB] mb-1.5">
                      Brief Project Description
                    </label>
                    <textarea
                      id="projectDescription"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) => {
                        setFormData({ ...formData, projectDescription: e.target.value });
                        if (formErrors.projectDescription) setFormErrors({ ...formErrors, projectDescription: '' });
                      }}
                      placeholder="Share your current challenges, desired timeline, target audience, or specific requirements..."
                      className={`w-full bg-[#0D0E11] border ${
                        formErrors.projectDescription ? 'border-red-500' : 'border-[#2A2F38]'
                      } rounded px-3.5 py-2.5 text-sm text-white placeholder-[#4B5563] focus:border-[#0C92FF] focus:outline-none transition-colors resize-none`}
                    />
                    {formErrors.projectDescription && (
                      <p className="mt-1 text-xs text-red-400">{formErrors.projectDescription}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-semibold text-white bg-[#0C92FF] hover:bg-[#004E8D] rounded transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Project Details...</span>
                        </>
                      ) : (
                        <>
                          <span>Start Your Project</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-[#6B7280] pt-1">
                    Strict privacy. Your details will only be used to respond to your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
