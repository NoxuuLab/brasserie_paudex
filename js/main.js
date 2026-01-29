/**
 * Brasserie de Paudex - Main JavaScript
 * Handles: Mobile menu, smooth scroll, header scroll effects, form validation
 */

(function() {
  'use strict';

  // ==========================================================================
  // DOM Elements
  // ==========================================================================

  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================

  /**
   * Toggle mobile menu open/closed state
   */
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  /**
   * Open mobile menu
   */
  function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close mobile menu
   */
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Event listeners for mobile menu
  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when clicking a link
  mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ==========================================================================
  // Smooth Scroll
  // ==========================================================================

  /**
   * Smooth scroll to target element
   * @param {string} targetId - The ID of the target element (with #)
   */
  function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Add smooth scroll to all anchor links
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Only handle internal anchor links
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        smoothScrollTo(href);

        // Update URL without scrolling
        history.pushState(null, null, href);
      }
    });
  });

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================

  let lastScrollTop = 0;
  let ticking = false;

  /**
   * Handle scroll event for header shadow and logo visibility
   */
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
      // Show navbar logo after scrolling past hero logo (approx 400px)
      if (scrollTop > 400) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    lastScrollTop = scrollTop;
    ticking = false;
  }

  // Throttle scroll event using requestAnimationFrame
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  // ==========================================================================
  // Newsletter Form Validation
  // ==========================================================================

  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      // Basic email validation
      if (!isValidEmail(email)) {
        showFormMessage(emailInput, 'Veuillez entrer une adresse email valide.', 'error');
        return;
      }

      // Simulate form submission (replace with actual form handling)
      showFormMessage(emailInput, 'Merci ! Vous êtes inscrit à notre newsletter.', 'success');
      emailInput.value = '';
    });
  }

  /**
   * Validate email format
   * @param {string} email - Email address to validate
   * @returns {boolean} - Whether email is valid
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Show form feedback message
   * @param {HTMLElement} input - Input element to show message near
   * @param {string} message - Message to display
   * @param {string} type - 'success' or 'error'
   */
  function showFormMessage(input, message, type) {
    // Remove existing message if any
    const existingMessage = input.parentElement.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create and insert message
    const messageElement = document.createElement('p');
    messageElement.className = 'form-message';
    messageElement.textContent = message;
    messageElement.style.cssText = `
      font-size: 14px;
      margin-top: 8px;
      color: ${type === 'success' ? '#2E7D32' : '#C62828'};
    `;

    input.parentElement.appendChild(messageElement);

    // Remove message after 5 seconds
    setTimeout(function() {
      messageElement.remove();
    }, 5000);
  }

  // ==========================================================================
  // Active Navigation Link
  // ==========================================================================

  /**
   * Update active navigation link based on scroll position
   */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(function(link) {
          link.classList.remove('active');
        });

        // Add active class to matching link
        const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Update active link on scroll (throttled)
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveNavLink, 100);
  });

  // ==========================================================================
  // Lazy Loading Images (fallback for browsers without native support)
  // ==========================================================================

  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function(img) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback for browsers without native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  }

  // ==========================================================================
  // Resize Handler
  // ==========================================================================

  let resizeTimeout;
  window.addEventListener('resize', function() {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(function() {
      // Close mobile menu if window is resized to desktop size
      if (window.innerWidth >= 992 && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    }, 250);
  });

  // ==========================================================================
  // Initialize
  // ==========================================================================

  // Run on page load
  handleScroll();
  updateActiveNavLink();

  // Log initialization
  console.log('Brasserie de Paudex - Site initialized');

})();
