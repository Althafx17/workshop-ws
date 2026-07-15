// --- CORE JS APPLICATION LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initCountdown();
  initInteractiveCard();
  initCalendarTabs();
  initFaqAccordion();
  initModalController();
  initParticles();
});

// --- NAVBAR SCROLL TOGGLE ---
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// --- MOBILE MENU TOGGLE ---
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });
}

// --- COUNTDOWN TIMER ---
function initCountdown() {
  // Set target date: October 15, 2026 17:00:00 GMT
  const targetDate = new Date('October 15, 2026 17:00:00 GMT').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      document.getElementById('countdown').innerHTML = `<h4 style="grid-column: span 4; text-align: center; color: var(--color-primary);">Workshop is Live!</h4>`;
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- INTERACTIVE CARD 3D TILT EFFECT ---
function initInteractiveCard() {
  const card = document.getElementById('interactive-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside element
    const y = e.clientY - rect.top;  // y position inside element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation 15 degrees
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `
      ${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 242, 254, 0.2),
      ${rotateY * 2}px ${-rotateX * 2}px 30px rgba(255, 0, 127, 0.2)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.5)';
  });
}

// --- CALENDAR TABS CONTROLLER ---
function initCalendarTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const agendaPanes = document.querySelectorAll('.agenda-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Deactivate current tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      agendaPanes.forEach(pane => pane.classList.remove('active'));

      // Activate clicked tab
      button.classList.add('active');
      const activePane = document.getElementById(`${targetTab}-pane`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

// --- FAQ ACCORDION CONTROLLER ---
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.faq-body');
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-body').style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

// --- REGISTRATION MODAL CONTROLLER ---
function initModalController() {
  const modal = document.getElementById('registration-modal');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const closeButton = document.getElementById('modal-close');
  const successCloseButton = document.getElementById('success-close-btn');
  const registrationForm = document.getElementById('registration-form');
  const formArea = document.getElementById('modal-form-area');
  const successArea = document.getElementById('modal-success-area');

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto'; // Restore scroll
    // Reset view state with delay to prevent jump during fade transition
    setTimeout(() => {
      formArea.style.display = 'block';
      successArea.style.display = 'none';
      registrationForm.reset();
    }, 400);
  }

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  closeButton.addEventListener('click', closeModal);
  successCloseButton.addEventListener('click', closeModal);

  // Close modal when clicking on dark overlay
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle Form Submission
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Extract info to simulate registration action
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    
    console.log(`Registered user: ${name} (${email})`);

    // Animate display from form to success message
    formArea.style.display = 'none';
    successArea.style.display = 'block';
  });

  // Handle newsletter form too
  const subscribeForm = document.getElementById('subscribe-form');
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('sub-email').value;
    console.log(`Subscribed: ${email}`);
    alert(`Success! ${email} has been registered to updates.`);
    subscribeForm.reset();
  });
}

// --- CANVAS INTERACTIVE PARTICLES SYSTEM ---
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particlesArray = [];
  let w, h;

  // Set sizing
  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Mouse vector tracking
  const mouse = {
    x: null,
    y: null,
    radius: 150 // Proximity interaction boundary
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Blueprint
  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 1; // 1px to 3px
      
      // Speed vectors
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      
      // Subtle variations in color
      this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.4)' : 'rgba(255, 0, 127, 0.3)';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off borders
      if (this.x < 0 || this.x > w) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > h) this.speedY = -this.speedY;

      // Mouse interactive repelling/pulling vector
      if (mouse.x != null && mouse.y != null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          // Push particles slightly away
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * 0.8;
          const directionY = forceDirectionY * force * 0.8;
          
          this.x += directionX;
          this.y += directionY;
        }
      }
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Create array
  function populate() {
    particlesArray = [];
    // Adjust density based on resolution
    const numParticles = Math.floor((w * h) / 11000);
    for (let i = 0; i < Math.min(numParticles, 120); i++) {
      particlesArray.push(new Particle());
    }
  }
  populate();

  // Draw connector lines
  function drawLines() {
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i; j < particlesArray.length; j++) {
        let dx = particlesArray[i].x - particlesArray[j].x;
        let dy = particlesArray[i].y - particlesArray[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Standard proximity connections
        if (distance < 110) {
          let alpha = (110 - distance) / 110 * 0.15;
          ctx.strokeStyle = `rgba(155, 81, 224, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }

      // Draw connection lines to mouse pointer
      if (mouse.x != null && mouse.y != null) {
        let dx = particlesArray[i].x - mouse.x;
        let dy = particlesArray[i].y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let alpha = (mouse.radius - distance) / mouse.radius * 0.25;
          // Gradient stroke between cyan and pink based on mouse position
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  // Loop
  function animate() {
    ctx.clearRect(0, 0, w, h);
    
    // Draw background subtle gradient mesh (static layer inside canvas)
    let gradient = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, Math.max(w, h));
    gradient.addColorStop(0, '#0c0e1e');
    gradient.addColorStop(1, '#06070e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    
    drawLines();
    requestAnimationFrame(animate);
  }
  
  animate();

  // Re-populate on resize
  window.addEventListener('resize', () => {
    populate();
  });
}
