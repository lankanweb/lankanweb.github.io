/**
 * Interactive UI Components Controller (Vanilla ES6+)
 * Preserves 100% functional parity with the original React components.
 */
import { siteConfig, sampleProjects, enquiryServiceOptions } from './data.js';
import { trackEvent } from './analytics.js';
import { scrollToSection, refreshScrollTargets } from './smoothScroll.js';

function selectServiceAndScroll(serviceName) {
  const selectEl = document.getElementById('service');
  if (selectEl && serviceName) {
    const match = enquiryServiceOptions.find(
      (opt) => opt.toLowerCase() === serviceName.toLowerCase()
    );
    if (match) {
      selectEl.value = match;
    }
  }
  scrollToSection('#contact');
}

export function initNavbar() {
  const header = document.getElementById('site-header');
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (!header) return;

  const updateHeaderStyle = () => {
    if (window.scrollY > 20) {
      header.classList.add(
        'bg-white/95',
        'backdrop-blur-md',
        'shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
      );
      header.classList.remove('bg-white');
    } else {
      header.classList.remove(
        'bg-white/95',
        'backdrop-blur-md',
        'shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
      );
      header.classList.add('bg-white');
    }
  };

  window.addEventListener('scroll', updateHeaderStyle, { passive: true });
  updateHeaderStyle();

  const setMobileMenuState = (isOpen) => {
    if (!mobileDrawer || !mobileToggleBtn) return;
    if (isOpen) {
      mobileDrawer.classList.remove('hidden');
      mobileDrawer.classList.add('mobile-drawer-open');
      mobileToggleBtn.setAttribute('aria-label', 'Close Menu');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
      iconOpen?.classList.add('hidden');
      iconClose?.classList.remove('hidden');
    } else {
      mobileDrawer.classList.add('hidden');
      mobileDrawer.classList.remove('mobile-drawer-open');
      mobileToggleBtn.setAttribute('aria-label', 'Open Menu');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
      iconOpen?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
    }
  };

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      const isCurrentlyOpen = !mobileDrawer.classList.contains('hidden');
      setMobileMenuState(!isCurrentlyOpen);
    });
  }

  // Smooth scroll anchor links
  document.querySelectorAll('[data-scroll-to]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('data-scroll-to') || link.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        setMobileMenuState(false);
        scrollToSection(target);
      }
    });
  });

  // Navbar & Hero Start a Project CTA buttons
  document.querySelectorAll('[data-cta-start]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const location = btn.getAttribute('data-cta-start') || 'navbar';
      setMobileMenuState(false);
      trackEvent('main_cta_click', { location });
      scrollToSection('#contact');
    });
  });

  // Hero Explore Work CTA
  document.querySelectorAll('[data-cta-explore]').forEach((btn) => {
    btn.addEventListener('click', () => {
      trackEvent('main_cta_click', { location: 'hero_secondary' });
      scrollToSection('#work');
    });
  });
}

export function initHeroImage() {
  const heroImg = document.getElementById('hero-showcase-img');
  const heroPlaceholder = document.getElementById('hero-image-loading');
  if (!heroImg) return;

  const markLoaded = () => {
    heroImg.classList.remove('opacity-0');
    heroImg.classList.add('opacity-100');
    if (heroPlaceholder) {
      heroPlaceholder.classList.add('hidden');
    }
  };

  if (heroImg.complete && heroImg.naturalWidth > 0) {
    markLoaded();
  } else {
    heroImg.addEventListener('load', markLoaded, { once: true });
    heroImg.addEventListener('error', markLoaded, { once: true });
  }
}

export function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalDialog = document.getElementById('project-modal-dialog');
  const closeBtn = document.getElementById('modal-close-btn');
  const discussBtn = document.getElementById('modal-discuss-btn');

  if (!modal || !modalDialog) return;

  let activeProject = null;
  let lastFocusedEl = null;

  const modalCategory = document.getElementById('modal-category');
  const modalLocation = document.getElementById('modal-location');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-image');
  const modalImgWebp = document.getElementById('modal-image-webp');
  const modalOverview = document.getElementById('modal-overview');
  const modalDeliverables = document.getElementById('modal-deliverables');
  const modalServices = document.getElementById('modal-services');
  const modalTechnologies = document.getElementById('modal-technologies');
  const modalImpact = document.getElementById('modal-impact');

  const checkSvgMarkup =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-[#0C92FF] shrink-0 mt-0.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';

  const openModal = (project) => {
    activeProject = project;
    lastFocusedEl = document.activeElement;

    if (modalCategory) modalCategory.textContent = project.category;
    if (modalLocation) modalLocation.textContent = project.clientLocation;
    if (modalTitle) modalTitle.textContent = project.name;

    if (modalImgWebp) modalImgWebp.srcset = project.imageWebp;
    if (modalImg) {
      modalImg.src = project.image;
      modalImg.alt = project.imageAlt;
    }

    if (modalOverview) modalOverview.textContent = project.overview;
    if (modalImpact) modalImpact.textContent = project.impactStatement;

    if (modalDeliverables) {
      modalDeliverables.innerHTML = '';
      project.keyDeliverables.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2.5 text-sm text-[#111111]';
        li.innerHTML = checkSvgMarkup;
        const span = document.createElement('span');
        span.textContent = item;
        li.appendChild(span);
        modalDeliverables.appendChild(li);
      });
    }

    if (modalServices) {
      modalServices.innerHTML = '';
      project.services.forEach((svc, i) => {
        const span = document.createElement('span');
        span.textContent = svc;
        if (i < project.services.length - 1) {
          const sep = document.createElement('span');
          sep.className = 'ml-2 text-[#D9DDE2]';
          sep.textContent = '·';
          span.appendChild(sep);
        }
        modalServices.appendChild(span);
      });
    }

    if (modalTechnologies) {
      modalTechnologies.innerHTML = '';
      project.technologies.forEach((tech, i) => {
        const span = document.createElement('span');
        span.textContent = tech;
        if (i < project.technologies.length - 1) {
          const sep = document.createElement('span');
          sep.className = 'ml-2 text-[#D9DDE2]';
          sep.textContent = '/';
          span.appendChild(sep);
        }
        modalTechnologies.appendChild(span);
      });
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    activeProject = null;
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  };

  document.querySelectorAll('[data-project-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const projectId = trigger.getAttribute('data-project-trigger');
      const project = sampleProjects.find((p) => p.id === projectId);
      if (project) {
        trackEvent('case_study_viewed', { projectName: project.name });
        openModal(project);
      }
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  modalDialog.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  discussBtn?.addEventListener('click', () => {
    if (!activeProject) return;
    const projectName = activeProject.name;
    const primaryService = activeProject.services[0] || 'Website Development';
    trackEvent('service_discussed', { project: projectName });
    closeModal();
    selectServiceAndScroll(primaryService);
  });
}

export function initServices() {
  const filterButtons = document.querySelectorAll('[data-service-filter]');
  const categoryCards = document.querySelectorAll('.service-category-card');

  const activeClasses = ['bg-[#0C92FF]', 'text-white', 'shadow-xs'];
  const inactiveClasses = ['text-white/75', 'hover:text-white', 'hover:bg-white/10'];

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-service-filter') || 'all';

      filterButtons.forEach((b) => {
        const isActive = b === btn;
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        if (isActive) {
          b.classList.remove(...inactiveClasses);
          b.classList.add(...activeClasses);
        } else {
          b.classList.remove(...activeClasses);
          b.classList.add(...inactiveClasses);
        }
      });

      categoryCards.forEach((card) => {
        const cardKey = card.getAttribute('data-category-key');
        if (selectedFilter === 'all' || cardKey === selectedFilter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });

      refreshScrollTargets();
    });
  });

  document.querySelectorAll('[data-discuss-service]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const serviceKey = btn.getAttribute('data-discuss-service');
      const categoryTitle = btn.getAttribute('data-category-title') || '';
      trackEvent('service_discussed', { service: categoryTitle });
      selectServiceAndScroll(serviceKey);
    });
  });

  document.querySelectorAll('[data-capability-item]').forEach((card) => {
    const activateCard = () => {
      const capabilityName = card.getAttribute('data-capability-item') || '';
      const serviceKey = card.getAttribute('data-service-key') || 'Website Development';
      trackEvent('service_discussed', { capability: capabilityName, category: serviceKey });
      selectServiceAndScroll(serviceKey);
    };
    card.addEventListener('click', activateCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateCard();
      }
    });
  });

  document.querySelectorAll('[data-request-combined]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectServiceAndScroll('Multiple Services');
    });
  });
}

export function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  const setFaqOpen = (item, open) => {
    const btn = item.querySelector('.faq-toggle-btn');
    const plusIcon = item.querySelector('.faq-icon-plus');
    const minusIcon = item.querySelector('.faq-icon-minus');

    if (open) {
      item.classList.add('is-open');
      btn?.setAttribute('aria-expanded', 'true');
      plusIcon?.classList.add('hidden');
      minusIcon?.classList.remove('hidden');
    } else {
      item.classList.remove('is-open');
      btn?.setAttribute('aria-expanded', 'false');
      plusIcon?.classList.remove('hidden');
      minusIcon?.classList.add('hidden');
    }
  };

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-toggle-btn');
    btn?.addEventListener('click', () => {
      const isCurrentlyOpen = item.classList.contains('is-open');
      faqItems.forEach((other) => {
        if (other !== item) setFaqOpen(other, false);
      });
      setFaqOpen(item, !isCurrentlyOpen);
      setTimeout(refreshScrollTargets, 260);
    });
  });
}

export function initContactForm() {
  const form = document.getElementById('project-enquiry-form');
  const successContainer = document.getElementById('enquiry-success-state');
  const errorBanner = document.getElementById('enquiry-error-banner');
  const errorBannerText = document.getElementById('enquiry-error-banner-text');
  const submitBtn = document.getElementById('enquiry-submit-btn');
  const submitDefaultContent = document.getElementById('enquiry-submit-default');
  const submitLoadingContent = document.getElementById('enquiry-submit-loading');
  const successRefEl = document.getElementById('enquiry-success-ref');
  const successMsgEl = document.getElementById('enquiry-success-msg');
  const resetBtn = document.getElementById('enquiry-reset-btn');

  if (!form) return;

  const fields = ['fullName', 'businessName', 'email', 'whatsappNumber', 'projectDescription'];

  const setFieldError = (fieldName, message) => {
    const inputEl = document.getElementById(fieldName);
    const errorEl = document.getElementById(`${fieldName}-error`);
    if (inputEl) {
      if (message) {
        inputEl.classList.remove('border-[#2A2F38]');
        inputEl.classList.add('border-red-500');
      } else {
        inputEl.classList.remove('border-red-500');
        inputEl.classList.add('border-[#2A2F38]');
      }
    }
    if (errorEl) {
      if (message) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
      } else {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
      }
    }
  };

  fields.forEach((name) => {
    const el = document.getElementById(name);
    el?.addEventListener('input', () => setFieldError(name, ''));
  });

  const validateForm = (data) => {
    let valid = true;

    if (!data.fullName.trim()) {
      setFieldError('fullName', 'Please enter your full name.');
      valid = false;
    } else if (data.fullName.trim().length < 2) {
      setFieldError('fullName', 'Name must be at least 2 characters.');
      valid = false;
    } else {
      setFieldError('fullName', '');
    }

    if (!data.businessName.trim()) {
      setFieldError('businessName', 'Please enter your business or company name.');
      valid = false;
    } else {
      setFieldError('businessName', '');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      setFieldError('email', 'Please enter your email address.');
      valid = false;
    } else if (!emailRegex.test(data.email.trim())) {
      setFieldError('email', 'Please provide a valid email address.');
      valid = false;
    } else {
      setFieldError('email', '');
    }

    if (!data.whatsappNumber.trim()) {
      setFieldError('whatsappNumber', 'Please enter your WhatsApp contact number.');
      valid = false;
    } else if (data.whatsappNumber.trim().length < 6) {
      setFieldError('whatsappNumber', 'Please enter a valid phone number with country code.');
      valid = false;
    } else {
      setFieldError('whatsappNumber', '');
    }

    if (!data.projectDescription.trim()) {
      setFieldError('projectDescription', 'Please briefly outline your project goals.');
      valid = false;
    } else if (data.projectDescription.trim().length < 10) {
      setFieldError('projectDescription', 'Description should be at least 10 characters.');
      valid = false;
    } else {
      setFieldError('projectDescription', '');
    }

    return valid;
  };

  const setSubmitting = (loading) => {
    if (submitBtn) submitBtn.disabled = loading;
    if (loading) {
      submitDefaultContent?.classList.add('hidden');
      submitLoadingContent?.classList.remove('hidden');
    } else {
      submitLoadingContent?.classList.add('hidden');
      submitDefaultContent?.classList.remove('hidden');
    }
  };

  const showBannerError = (msg) => {
    if (!errorBanner || !errorBannerText) return;
    if (msg) {
      errorBannerText.textContent = msg;
      errorBanner.classList.remove('hidden');
    } else {
      errorBannerText.textContent = '';
      errorBanner.classList.add('hidden');
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showBannerError('');

    const payload = {
      fullName: document.getElementById('fullName')?.value || '',
      businessName: document.getElementById('businessName')?.value || '',
      email: document.getElementById('email')?.value || '',
      whatsappNumber: document.getElementById('whatsappNumber')?.value || '',
      service: document.getElementById('service')?.value || enquiryServiceOptions[0],
      projectDescription: document.getElementById('projectDescription')?.value || '',
    };

    if (!validateForm(payload)) {
      return;
    }

    setSubmitting(true);

    const showSuccess = (enquiryId, message) => {
      if (successRefEl) successRefEl.textContent = `Reference: ${enquiryId}`;
      if (successMsgEl) successMsgEl.textContent = message;

      const waLink = successContainer?.querySelector('a[href*="wa.me"]');
      if (waLink) {
        const text = [
          `Hi LankanWeb (Ref: ${enquiryId}),`,
          `Name: ${payload.fullName.trim()}`,
          `Business: ${payload.businessName.trim()}`,
          `Service: ${payload.service}`,
          `Email: ${payload.email.trim()}`,
          `WhatsApp: ${payload.whatsappNumber.trim()}`,
          `Project Brief: ${payload.projectDescription.trim()}`,
        ].join('\n');
        waLink.setAttribute(
          'href',
          `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`
        );
      }

      form.classList.add('hidden');
      successContainer?.classList.remove('hidden');

      trackEvent('project_enquiry_submitted', {
        service: payload.service,
        business: payload.businessName,
      });
    };

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 404 || response.status === 405 || response.status === 501) {
        const enquiryId = `LW-${Date.now().toString(36).toUpperCase()}`;
        showSuccess(
          enquiryId,
          'Your project brief is ready. Click below to send it directly to our senior strategist on WhatsApp for an immediate response.'
        );
        return;
      }

      const result = await response.json();

      if (response.ok && result.success) {
        showSuccess(
          result.enquiryId || `LW-${Date.now().toString(36).toUpperCase()}`,
          result.message || 'Thank you. We will contact you within 2–4 hours.'
        );
      } else {
        showBannerError(
          result.error || 'Failed to submit enquiry. Please try again or message us on WhatsApp.'
        );
      }
    } catch (_err) {
      const enquiryId = `LW-${Date.now().toString(36).toUpperCase()}`;
      showSuccess(
        enquiryId,
        'Your project brief is ready. Click below to send it directly to our senior strategist on WhatsApp for an immediate response.'
      );
    } finally {
      setSubmitting(false);
    }
  });

  resetBtn?.addEventListener('click', () => {
    form.reset();
    const serviceEl = document.getElementById('service');
    if (serviceEl) serviceEl.value = enquiryServiceOptions[0];
    fields.forEach((name) => setFieldError(name, ''));
    showBannerError('');
    successContainer?.classList.add('hidden');
    form.classList.remove('hidden');
  });
}

export function initTrackingAndMeta() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll('[data-track-whatsapp]').forEach((el) => {
    el.addEventListener('click', () => {
      const location = el.getAttribute('data-track-whatsapp') || 'unknown';
      trackEvent('whatsapp_click', { location });
    });
  });

  document.querySelectorAll('[data-track-email]').forEach((el) => {
    el.addEventListener('click', () => {
      const location = el.getAttribute('data-track-email') || 'contact_section';
      trackEvent('email_click', { location });
    });
  });
}
