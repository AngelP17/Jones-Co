// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  
  // Create overlay if it doesn't exist
  let overlay = document.querySelector('.mobile-menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
  }

  function openMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', openMenu);
  }

  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', closeMenu);
  }

  // Close menu when clicking overlay
  overlay.addEventListener('click', closeMenu);

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // FAQ Accordion with smooth animations
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        
        // Track FAQ interaction (for analytics)
        if (!isActive && typeof gtag !== 'undefined') {
          const questionText = question.textContent.trim();
          gtag('event', 'faq_expand', {
            'question': questionText
          });
        }
      });
    }
  });

  // Tab functionality with animation
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetId = this.getAttribute('data-tab');
      
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all tab contents with fade out
      tabContents.forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        setTimeout(() => {
          content.classList.remove('active');
        }, 200);
      });
      
      // Show target tab content with fade in
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        setTimeout(() => {
          targetContent.classList.add('active');
          // Trigger reflow
          targetContent.offsetHeight;
          targetContent.style.opacity = '1';
          targetContent.style.transform = 'translateY(0)';
        }, 250);
      }
      
      // Track tab click (for analytics)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'tab_click', {
          'tab_name': targetId
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      // Add scrolled class when scrolling down
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Back to Top Button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Dynamic year in footer
  const yearEls = document.querySelectorAll('[data-year]');
  if (yearEls.length > 0) {
    const currentYear = new Date().getFullYear();
    yearEls.forEach(el => {
      el.textContent = currentYear;
    });
  }

  // Form submission with validation and spam protection
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Check honeypot (spam protection)
      const honeypot = contactForm.querySelector('.honeypot');
      if (honeypot && honeypot.value) {
        console.log('Spam detected');
        return;
      }
      
      // Basic validation
      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');
      
      let isValid = true;
      
      if (!name || !name.value.trim()) {
        name.classList.add('error');
        isValid = false;
      } else {
        name.classList.remove('error');
      }
      
      if (!email || !email.value.trim() || !isValidEmail(email.value)) {
        email.classList.add('error');
        isValid = false;
      } else {
        email.classList.remove('error');
      }
      
      if (!message || !message.value.trim()) {
        message.classList.add('error');
        isValid = false;
      } else {
        message.classList.remove('error');
      }
      
      if (!isValid) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="btn-loading"></span> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        const formContent = document.getElementById('formContent');
        const successMessage = document.getElementById('successMessage');
        
        if (formContent && successMessage) {
          formContent.style.display = 'none';
          successMessage.style.display = 'block';
          
          // Track form submission (for analytics)
          if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
              'form_name': 'contact'
            });
          }
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 5rem;
      right: 1rem;
      padding: 1rem 1.5rem;
      background: ${type === 'error' ? '#ef4444' : 'var(--primary)'};
      color: white;
      border-radius: var(--radius);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Intersection Observer for fade-in animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with fade-in class
  document.querySelectorAll('.service-card, .card, .testimonial-card, .value-card, .hero-feature-card').forEach((el) => {
    if (prefersReducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      return;
    }

    el.style.opacity = '0';
    el.style.transform = 'translateY(3px)';
    el.style.transition = 'opacity 300ms ease, transform 300ms ease';
    observer.observe(el);
  });

  document.querySelectorAll('.service-card').forEach((el, index) => {
    el.style.transitionDelay = `${index * 40}ms`;
  });

  document.querySelectorAll('.hero-feature-card').forEach((el, index) => {
    el.style.transitionDelay = `${index * 40}ms`;
  });

  // Add CSS for fade-in-visible
  const style = document.createElement('style');
  style.textContent = `
    .fade-in-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    .form-input.error,
    .form-textarea.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  `;
  document.head.appendChild(style);

  // Lazy load images
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Track page views (for analytics)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      'page_title': document.title,
      'page_location': window.location.href
    });
  }

  // Console welcome message
  console.log('%cWelcome to Jones & Co. Media!', 'font-size: 20px; font-weight: bold; color: #e07a5f;');
  console.log('%cProfessional marketing solutions for Arkansas businesses.', 'font-size: 14px; color: #64748b;');
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}
