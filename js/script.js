
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize loading animation
  const loadingAnimation = document.getElementById('loading-animation');
  
  // Simulate loading time
  setTimeout(function() {
    loadingAnimation.classList.add('hidden');
    setTimeout(function() {
      loadingAnimation.style.display = 'none';
    }, 500);
  }, 2000);
  
  // Initialize Header Scroll Effect
  const header = document.getElementById('site-header');
  const scrollThreshold = 10;
  
  function handleHeaderScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileNav = document.getElementById('mobile-nav');
  
  mobileMenuButton.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });
  
  // Navigation Links - Active State & Single Page Navigation
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const pageContents = document.querySelectorAll('.page-content');
  
  // Helper function to set active page
  function setActivePage(pageId) {
    // Update navigation links
    navLinks.forEach(link => {
      if (link.getAttribute('href') === '#' + pageId || 
          (pageId === 'home' && link.getAttribute('href') === '#')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // Show active page content
    pageContents.forEach(page => {
      if (page.id === pageId + '-content') {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
    
    // Close mobile menu if open
    mobileMenuButton.classList.remove('active');
    mobileNav.classList.remove('active');
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      let pageId = href.replace('#', '');
      
      // Default to home if no hash
      if (!pageId) pageId = 'home';
      
      setActivePage(pageId);
      
      // Update browser URL without page reload
      history.pushState(null, null, href);
    });
  });
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', function() {
    let pageId = window.location.hash.replace('#', '') || 'home';
    setActivePage(pageId);
  });
  
  // Initialize correct page based on URL hash
  function initPage() {
    let pageId = window.location.hash.replace('#', '') || 'home';
    
    // Special handling for blog posts
    if (pageId.startsWith('blog/')) {
      // In a real implementation, you would load the specific blog post
      pageId = 'blog';
    }
    
    // Check if page exists, otherwise show 404
    let pageExists = false;
    pageContents.forEach(page => {
      if (page.id === pageId + '-content') {
        pageExists = true;
      }
    });
    
    if (!pageExists) {
      pageId = 'not-found';
    }
    
    setActivePage(pageId);
  }
  
  // Initialize page on load
  initPage();
  
  // Scroll to Top Button
  const scrollToTopButton = document.getElementById('scroll-to-top');
  
  function toggleScrollToTopButton() {
    if (window.scrollY > 500) {
      scrollToTopButton.classList.add('visible');
    } else {
      scrollToTopButton.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', toggleScrollToTopButton);
  
  scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Update Current Year in Footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Handle Animations on Scroll using Intersection Observer
  const animatedElements = document.querySelectorAll('.feature-card, .step-item, .blog-card, .faq-item, .fade-in-element, .cta-content, .about-text, .about-image, .mission-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add delay based on data-delay attribute or index
        const target = entry.target;
        const delay = target.dataset.delay || 0;
        
        setTimeout(() => {
          target.classList.add('visible');
        }, delay);
        
        // Unobserve after animation
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Initialize FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isOpen = this.classList.contains('active');
      
      // Close all FAQ items
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
      });
      
      // Open clicked item if it was closed
      if (!isOpen) {
        this.classList.add('active');
        answer.classList.add('active');
      }
    });
  });
  
  // Initialize Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let testimonialInterval;
  let currentTestimonialIndex = 0;
  
  function showTestimonial(index) {
    testimonialSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    testimonialDots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    currentTestimonialIndex = index;
  }
  
  function nextTestimonial() {
    let nextIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
    showTestimonial(nextIndex);
  }
  
  function startTestimonialSlider() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }
  
  function stopTestimonialSlider() {
    clearInterval(testimonialInterval);
  }
  
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showTestimonial(index);
      stopTestimonialSlider();
      startTestimonialSlider();
    });
  });
  
  // Handle mouse hover pause on testimonials
  const testimonialSlider = document.querySelector('.testimonials-slider');
  
  testimonialSlider.addEventListener('mouseenter', stopTestimonialSlider);
  testimonialSlider.addEventListener('mouseleave', startTestimonialSlider);
  
  // Start the testimonial slider
  startTestimonialSlider();
  
  // Initialize Icon Elements
  function initializeIcons() {
    // Heart Icon
    const heartIcons = document.querySelectorAll('.icon-heart');
    heartIcons.forEach(icon => {
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>`;
    });
    
    // Message Icon
    const messageIcons = document.querySelectorAll('.icon-message');
    messageIcons.forEach(icon => {
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
    });
    
    // Users Icon
    const usersIcons = document.querySelectorAll('.icon-users');
    usersIcons.forEach(icon => {
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    });
    
    // Facebook Icon
    const facebookIcons = document.querySelectorAll('.icon-facebook');
    facebookIcons.forEach(icon => {
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`;
    });
    
    // Twitter Icon
    const twitterIcons = document.querySelectorAll('.icon-twitter');
    twitterIcons.forEach(icon => {
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>`;
    });
    
    // Instagram Icon
    const instagramIcons = document.querySelectorAll('.icon-instagram');
    instagramIcons.forEach(icon => {
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
    });
  }
  
  // Initialize all icons
  initializeIcons();
  
  // Make all cards and animations visible initially so they're not hidden on page load
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
});
