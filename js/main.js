/* ============================================
   DARCI & KRIS | FOREVER
   Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // ==================== CONFIG ====================
  const CONFIG = {
    password: 'marketplace',
    // Set your proposal/countdown date here (YYYY, M-1, D, H, M)
    countdownDate: new Date(2026, 7, 1, 18, 0), // Aug 1, 2026 6pm — CHANGE THIS
    mapLocations: [
      { lat: 40.7608, lng: -111.8910, label: 'Salt Lake City', desc: 'Facebook Dating brought us together — but we tell people Marketplace 😏', color: '#B76E79', type: 'origin' },
      { lat: 40.7488, lng: -111.8713, label: 'Oasis & The Pearl', desc: 'Feb 28, 2025 — First date. First kiss. The night everything changed.', color: '#B76E79', type: 'origin' },
      { lat: 40.6461, lng: -111.4980, label: 'Park City', desc: 'Snowfall walks, wine festival, hot tub, Bridge Cafe brunch. A perfect weekend.', color: '#C9A96E', type: 'adventure' },
      { lat: 43.1614, lng: -111.0193, label: 'Alpine, Wyoming', desc: 'River rafting — screaming, laughing, and never letting go.', color: '#C9A96E', type: 'adventure' },
      { lat: 50.8503, lng: 4.3517, label: 'Belgium', desc: 'Waffles, chocolate, cobblestones, and us. Our love went international.', color: '#C9A96E', type: 'adventure' },
      { lat: 36.1699, lng: -115.1398, label: 'Las Vegas', desc: 'Concerts under neon lights. We hit the jackpot long before we got here.', color: '#C9A96E', type: 'adventure' },
      { lat: 40.7608, lng: -111.8510, label: 'Home', desc: 'From two homes to one. This is where our forever lives.', color: '#722F37', type: 'home' },
    ]
  };

  // ==================== PASSWORD GATE ====================
  const gate = document.getElementById('password-gate');
  const pwInput = document.getElementById('password-input');
  const pwSubmit = document.getElementById('password-submit');
  const pwError = document.getElementById('password-error');
  const mainContent = document.getElementById('main-content');
  const mainNav = document.getElementById('main-nav');
  const musicPlayer = document.getElementById('music-player');

  function checkPassword() {
    const val = pwInput.value.trim().toLowerCase();
    if (val === CONFIG.password) {
      gate.style.transition = 'opacity 1s ease';
      gate.style.opacity = '0';
      setTimeout(() => {
        gate.classList.add('hidden');
        mainContent.classList.remove('hidden');
        musicPlayer.classList.remove('hidden');
        initSite();
      }, 1000);
    } else {
      pwError.hidden = false;
      pwInput.value = '';
      pwInput.focus();
      pwInput.style.animation = 'none';
      pwInput.offsetHeight; // reflow
      pwInput.style.animation = 'shake 0.4s ease';
    }
  }

  pwSubmit.addEventListener('click', checkPassword);
  pwInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') checkPassword();
  });

  // Add shake animation
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  // ==================== INIT SITE ====================
  function initSite() {
    initScrollAnimations();
    initNavigation();
    initGallery();
    initMap();
    initEnvelope();
    initCountdown();
    initProposal();
    initPetals();
    initMusic();
  }

  // ==================== SCROLL ANIMATIONS ====================
  function initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
  }

  // ==================== NAVIGATION ====================
  function initNavigation() {
    const nav = document.getElementById('main-nav');
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > window.innerHeight * 0.7) {
        nav.classList.remove('hidden');
        nav.classList.add('visible');
      } else {
        nav.classList.remove('visible');
      }
      lastScroll = currentScroll;
    });

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ==================== GALLERY & LIGHTBOX ====================
  function initGallery() {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    let currentIndex = 0;
    const validItems = [];

    items.forEach((item, i) => {
      const img = item.querySelector('img');
      if (img) {
        item.addEventListener('click', () => {
          if (item.classList.contains('placeholder')) return;
          currentIndex = validItems.indexOf(item);
          if (currentIndex === -1) return;
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        });
        validItems.push(item);
      }
    });

    function closeLightbox() {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + validItems.length) % validItems.length;
      const img = validItems[currentIndex].querySelector('img');
      lightboxImg.src = img.src;
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % validItems.length;
      const img = validItems[currentIndex].querySelector('img');
      lightboxImg.src = img.src;
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  // ==================== MAP ====================
  function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;

    const map = L.map('map', {
      scrollWheelZoom: false,
      zoomControl: true,
    }).setView([42, -40], 3);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    const bounds = [];

    CONFIG.mapLocations.forEach((loc) => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 16px;
          height: 16px;
          background: ${loc.color};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);
      marker.bindPopup(`<strong>${loc.label}</strong>${loc.desc}`);
      bounds.push([loc.lat, loc.lng]);
    });

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Draw connecting line
    const line = L.polyline(bounds, {
      color: '#C9A96E',
      weight: 2,
      opacity: 0.4,
      dashArray: '8, 8',
    }).addTo(map);
  }

  // ==================== ENVELOPE / LOVE LETTER ====================
  function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');

    envelope.addEventListener('click', () => {
      envelope.classList.add('opened');
      setTimeout(() => {
        envelope.style.maxHeight = '0';
        envelope.style.overflow = 'hidden';
        envelope.style.opacity = '0';
        envelope.style.transition = 'all 0.6s ease';
        letter.classList.add('visible');
      }, 800);
    });
  }

  // ==================== COUNTDOWN ====================
  function initCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    function update() {
      const now = new Date();
      const diff = CONFIG.countdownDate - now;

      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // ==================== PROPOSAL ====================
  function initProposal() {
    const openBtn = document.getElementById('open-heart-btn');
    const reveal = document.getElementById('proposal-reveal');
    const celebration = document.getElementById('celebration');
    const celebTitle = document.getElementById('celebration-title');
    const yesBtn = document.getElementById('btn-yes');
    const foreverBtn = document.getElementById('btn-forever');

    openBtn.addEventListener('click', () => {
      reveal.classList.remove('hidden');
      reveal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      // Create sparkles in the reveal
      createSparkles(document.querySelector('.reveal-sparkles'), 30);
    });

    function celebrate(message) {
      reveal.style.display = 'none';
      celebration.classList.remove('hidden');
      celebration.style.display = 'flex';
      celebTitle.textContent = message;

      // Hearts
      const heartsContainer = celebration.querySelector('.celebration-hearts');
      heartsContainer.textContent = '❤️ 💕 💖 💗 💝 💘 💕 ❤️';

      // Confetti explosion
      fireConfetti();
      setTimeout(fireConfetti, 700);
      setTimeout(fireConfetti, 1400);
      setTimeout(fireConfetti, 2100);

      // Floating hearts
      createFloatingHearts();
    }

    yesBtn.addEventListener('click', () => celebrate('She Said Yes!'));
    foreverBtn.addEventListener('click', () => celebrate('Forever & Always'));
  }

  // ==================== CONFETTI ====================
  function fireConfetti() {
    if (typeof confetti === 'undefined') return;

    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#B76E79', '#C9A96E', '#722F37', '#E8C4C4', '#916572', '#E8D5A3'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#B76E79', '#C9A96E', '#722F37', '#E8C4C4', '#916572', '#E8D5A3'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Big burst in the center
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#B76E79', '#C9A96E', '#722F37', '#E8C4C4', '#E8D5A3'],
    });
  }

  // ==================== FLOATING HEARTS ====================
  function createFloatingHearts() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '🤍', '💘'];
    const container = document.getElementById('celebration');

    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}vw;
          bottom: -50px;
          font-size: ${1.5 + Math.random() * 2}rem;
          z-index: 10005;
          pointer-events: none;
          animation: floatUp ${4 + Math.random() * 4}s ease-out forwards;
          opacity: 0.9;
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
      }, i * 200);
    }

    // Add float animation if not already added
    if (!document.getElementById('float-hearts-style')) {
      const style = document.createElement('style');
      style.id = 'float-hearts-style';
      style.textContent = `
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.9; }
          100% { transform: translateY(-110vh) rotate(${360}deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ==================== SPARKLES ====================
  function createSparkles(container, count) {
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 3 + 's';
      sparkle.style.animationDuration = 1.5 + Math.random() * 2 + 's';
      container.appendChild(sparkle);
    }
  }

  // ==================== FALLING PETALS ====================
  function initPetals() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let petals = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = 8 + Math.random() * 12;
        this.speedY = 0.5 + Math.random() * 1.5;
        this.speedX = -0.5 + Math.random() * 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = -0.02 + Math.random() * 0.04;
        this.opacity = 0.2 + Math.random() * 0.4;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
        // Colors from our palette
        const colors = [
          [232, 196, 196], // blush
          [183, 110, 121], // rose
          [212, 160, 168], // rose-light
          [201, 169, 110], // gold
          [232, 213, 163], // gold-light
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.wobble += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobble) * 0.5;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // Draw petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          this.size * 0.3, -this.size * 0.4,
          this.size * 0.7, -this.size * 0.2,
          this.size, 0
        );
        ctx.bezierCurveTo(
          this.size * 0.7, this.size * 0.2,
          this.size * 0.3, this.size * 0.4,
          0, 0
        );

        const [r, g, b] = this.color;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fill();
        ctx.restore();
      }
    }

    // Create initial petals
    for (let i = 0; i < 20; i++) {
      const p = new Petal();
      p.y = Math.random() * canvas.height;
      petals.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    }

    animate();
  }

  // ==================== MUSIC ====================
  function initMusic() {
    const audio = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    const iconOff = toggle.querySelector('.music-off');
    const iconOn = toggle.querySelector('.music-on');
    let playing = false;

    // Try autoplay
    if (audio.canPlayType('audio/mpeg')) {
      audio.play().then(() => {
        playing = true;
        iconOff.classList.add('hidden');
        iconOn.classList.remove('hidden');
      }).catch(() => {
        // Autoplay blocked — user can click to play
      });
    }

    toggle.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        playing = false;
        iconOff.classList.remove('hidden');
        iconOn.classList.add('hidden');
      } else {
        audio.play();
        playing = true;
        iconOff.classList.add('hidden');
        iconOn.classList.remove('hidden');
      }
    });
  }

})();
