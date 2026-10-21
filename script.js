document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Scroll Reveal Observer for subtle element entry
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.15
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Animate skill bars when skill category reveals
        const skillBars = entry.target.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) {
            setTimeout(() => {
              bar.style.width = targetWidth;
            }, 200);
          }
        });

        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  revealElements.forEach(el => revealObserver.observe(el));

  // Active Navigation Highlight on Scroll
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Contact Form with Advanced Blast Particle Animation on Submit
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const blastContainer = document.getElementById('blastContainer');

  function triggerBlastAnimation(originElement) {
    if (!blastContainer) return;
    blastContainer.innerHTML = '';

    const particleCount = 28;
    const colors = ['#00f0ff', '#c084fc', '#38bdf8', '#34d399', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.classList.add('blast-particle');

      // Random angle and distance
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 140;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);

      // Random color and size variation
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = randomColor;
      particle.style.boxShadow = `0 0 12px ${randomColor}`;

      const size = 6 + Math.random() * 6;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      blastContainer.appendChild(particle);

      // Clean up particle after animation
      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      // Trigger epic blast animation
      triggerBlastAnimation(submitBtn);

      // Simulate sending state
      submitBtn.disabled = true;
      const spanEl = submitBtn.querySelector('span');
      const originalText = spanEl.textContent;
      spanEl.textContent = 'Transmitting message...';

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        spanEl.textContent = originalText;
        formSuccess.classList.remove('hidden');

        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 6000);
      }, 1200);
    });
  }

  // Dynamic Current Year in Footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
