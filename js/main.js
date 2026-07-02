/* ============================================
   DARCI & KRIS | FOREVER
   Main JavaScript - Multi-page
   ============================================ */

(function () {
  'use strict';

  var CONFIG = {
    password: 'marketplace',
    togetherSince: new Date(2025, 2, 18),
    mapLocations: [
      { lat: 40.7608, lng: -111.8910, label: 'Salt Lake City', desc: 'Facebook Dating brought us together, but we tell people Marketplace 😏', color: '#B76E79', type: 'origin' },
      { lat: 40.6461, lng: -111.4980, label: 'Park City', desc: 'Snowfall walks, wine festival, hot tub, Bridge Cafe brunch. A perfect weekend.', color: '#C9A96E', type: 'adventure' },
      { lat: 42.5558, lng: -114.4601, label: 'Twin Falls, Idaho', desc: 'Another adventure in the books.', color: '#C9A96E', type: 'adventure' },
      { lat: 43.1614, lng: -111.0193, label: 'Alpine, Wyoming', desc: 'River rafting. She rode the bull and didn\'t fall in. Legend.', color: '#C9A96E', type: 'adventure' },
      { lat: 52.3676, lng: 4.9041, label: 'Amsterdam', desc: 'Canals, bikes, and us exploring it all together.', color: '#C9A96E', type: 'adventure' },
      { lat: 50.1109, lng: 8.6821, label: 'Germany', desc: 'Part of our European adventure.', color: '#C9A96E', type: 'adventure' },
      { lat: 49.6116, lng: 6.1319, label: 'Luxembourg', desc: 'Another stamp on our love story.', color: '#C9A96E', type: 'adventure' },
      { lat: 51.2194, lng: 4.4025, label: 'Antwerp', desc: 'Diamonds, fashion, and falling deeper in love.', color: '#C9A96E', type: 'adventure' },
      { lat: 50.8503, lng: 4.3517, label: 'Brussels', desc: 'Waffles, chocolate, and us.', color: '#C9A96E', type: 'adventure' },
      { lat: 51.0543, lng: 3.7174, label: 'Ghent', desc: 'Medieval charm and modern love.', color: '#C9A96E', type: 'adventure' },
      { lat: 51.2093, lng: 3.2247, label: 'Bruges', desc: 'Cobblestones and fairy tale streets.', color: '#C9A96E', type: 'adventure' },
      { lat: 36.1699, lng: -115.1398, label: 'Las Vegas', desc: 'Concerts under neon lights. We hit the jackpot long before we got here.', color: '#C9A96E', type: 'adventure' },
      { lat: 37.0965, lng: -113.5684, label: 'St. George, Utah', desc: 'Red rocks and good times.', color: '#C9A96E', type: 'adventure' },
      { lat: 40.7608, lng: -111.8510, label: 'Home', desc: 'From two homes to one. This is where our forever lives.', color: '#722F37', type: 'home' },
    ]
  };

  // ==================== PAGE DETECTION ====================
  var isIndexPage = !!document.getElementById('password-gate');
  var isChapterPage = !!document.getElementById('chapter-content');

  // ==================== AUTH CHECK ====================
  if (isChapterPage) {
    if (localStorage.getItem('forever-auth') !== 'true') {
      window.location.href = 'index.html';
      return;
    }
    initChapterPage();
  } else if (isIndexPage) {
    if (localStorage.getItem('forever-auth') === 'true') {
      document.getElementById('password-gate').classList.add('hidden');
      runLoadingSequence();
    } else {
      initPasswordGate();
    }
  }

  // ==================== PASSWORD GATE ====================
  function initPasswordGate() {
    var pwInput = document.getElementById('password-input');
    var pwSubmit = document.getElementById('password-submit');
    var pwError = document.getElementById('password-error');
    var gate = document.getElementById('password-gate');

    function checkPassword() {
      var val = pwInput.value.trim().toLowerCase();
      if (val === CONFIG.password) {
        localStorage.setItem('forever-auth', 'true');
        gate.style.transition = 'opacity 1s ease';
        gate.style.opacity = '0';
        setTimeout(function () {
          gate.classList.add('hidden');
          runLoadingSequence();
        }, 1000);
      } else {
        pwError.hidden = false;
        pwInput.value = '';
        pwInput.focus();
        pwInput.style.animation = 'none';
        pwInput.offsetHeight;
        pwInput.style.animation = 'shake 0.4s ease';
      }
    }

    pwSubmit.addEventListener('click', checkPassword);
    pwInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') checkPassword();
    });

    var shakeStyle = document.createElement('style');
    shakeStyle.textContent = '@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }';
    document.head.appendChild(shakeStyle);
  }

  // ==================== LOADING SEQUENCE ====================
  function runLoadingSequence() {
    var loader = document.getElementById('loading-sequence');
    loader.classList.remove('hidden');
    loader.style.display = 'block';

    var screens = loader.querySelectorAll('.load-screen');
    var currentScreen = 0;

    screens[0].classList.add('active');
    setTimeout(function () { advanceScreen(); }, 3000);

    function advanceScreen() {
      screens[currentScreen].classList.remove('active');
      currentScreen++;
      if (currentScreen < screens.length) {
        screens[currentScreen].classList.add('active');
      }
    }

    loader.addEventListener('click', function handleTap() {
      if (currentScreen === 0) return;
      if (currentScreen < screens.length - 1) {
        advanceScreen();
      } else {
        loader.removeEventListener('click', handleTap);
        window.location.href = 'chapter1.html';
      }
    });
  }

  // ==================== CHAPTER PAGE INIT ====================
  function initChapterPage() {
    var mp = document.getElementById('music-player');
    if (mp) mp.classList.remove('hidden');

    initScrollAnimations();
    initNavigation();
    initPetals();
    initMusic();

    if (document.querySelector('.gallery-grid')) initGallery();
    if (document.getElementById('map')) initMap();
    if (document.getElementById('envelope')) initEnvelope();
    if (document.getElementById('countdown-timer')) initCountdown();
    if (document.getElementById('open-heart-btn')) initProposal();
  }

  // ==================== SCROLL ANIMATIONS ====================
  function initScrollAnimations() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ==================== NAVIGATION ====================
  function initNavigation() {
    var hamburger = document.getElementById('nav-hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ==================== GALLERY & LIGHTBOX ====================
  function initGallery() {
    var items = document.querySelectorAll('.gallery-item');
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var closeBtn = document.getElementById('lightbox-close');
    var prevBtn = document.getElementById('lightbox-prev');
    var nextBtn = document.getElementById('lightbox-next');
    if (!lightbox) return;

    var currentIndex = 0;
    var validItems = [];

    items.forEach(function (item) {
      var img = item.querySelector('img');
      if (img) {
        item.addEventListener('click', function () {
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
      lightboxImg.src = validItems[currentIndex].querySelector('img').src;
    }
    function showNext() {
      currentIndex = (currentIndex + 1) % validItems.length;
      lightboxImg.src = validItems[currentIndex].querySelector('img').src;
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (lightbox.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  // ==================== MAP ====================
  function initMap() {
    var mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;

    var map = L.map('map', { scrollWheelZoom: false, zoomControl: true }).setView([42, -40], 3);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    var bounds = [];
    CONFIG.mapLocations.forEach(function (loc) {
      var icon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="width:16px;height:16px;background:' + loc.color + ';border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      var marker = L.marker([loc.lat, loc.lng], { icon: icon }).addTo(map);
      marker.bindPopup('<strong>' + loc.label + '</strong>' + loc.desc);
      bounds.push([loc.lat, loc.lng]);
    });
    if (bounds.length > 1) map.fitBounds(bounds, { padding: [50, 50] });
    L.polyline(bounds, { color: '#C9A96E', weight: 2, opacity: 0.4, dashArray: '8, 8' }).addTo(map);
  }

  // ==================== ENVELOPE ====================
  function initEnvelope() {
    var envelope = document.getElementById('envelope');
    var letter = document.getElementById('letter');
    if (!envelope) return;

    envelope.addEventListener('click', function () {
      envelope.classList.add('opened');
      setTimeout(function () {
        envelope.style.maxHeight = '0';
        envelope.style.overflow = 'hidden';
        envelope.style.opacity = '0';
        envelope.style.transition = 'all 0.6s ease';
        letter.classList.add('visible');
      }, 800);
    });
  }

  // ==================== COUNT UP ====================
  function initCountdown() {
    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minutesEl = document.getElementById('cd-minutes');
    var secondsEl = document.getElementById('cd-seconds');
    if (!daysEl) return;

    function update() {
      var now = new Date();
      var diff = now - CONFIG.togetherSince;
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var minutes = Math.floor((diff / (1000 * 60)) % 60);
      var seconds = Math.floor((diff / 1000) % 60);
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
    var openBtn = document.getElementById('open-heart-btn');
    var reveal = document.getElementById('proposal-reveal');
    var celebration = document.getElementById('celebration');
    var celebTitle = document.getElementById('celebration-title');
    var yesBtn = document.getElementById('btn-yes');
    var foreverBtn = document.getElementById('btn-forever');
    if (!openBtn) return;

    openBtn.addEventListener('click', function () {
      reveal.classList.remove('hidden');
      reveal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      createSparkles(document.querySelector('.reveal-sparkles'), 30);
    });

    function celebrate(message) {
      reveal.style.display = 'none';
      celebration.classList.remove('hidden');
      celebration.style.display = 'flex';
      celebTitle.textContent = message;
      fireConfetti();
      setTimeout(fireConfetti, 700);
      setTimeout(fireConfetti, 1400);
      setTimeout(fireConfetti, 2100);
      createFloatingHearts();
    }

    yesBtn.addEventListener('click', function () { celebrate('She Said Yes!'); });
    foreverBtn.addEventListener('click', function () { celebrate('Forever & Always'); });
  }

  // ==================== CONFETTI ====================
  function fireConfetti() {
    if (typeof confetti === 'undefined') return;
    var end = Date.now() + 3000;
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: ['#B76E79', '#C9A96E', '#722F37', '#E8C4C4', '#916572', '#E8D5A3'] });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: ['#B76E79', '#C9A96E', '#722F37', '#E8C4C4', '#916572', '#E8D5A3'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 }, colors: ['#B76E79', '#C9A96E', '#722F37', '#E8C4C4', '#E8D5A3'] });
  }

  // ==================== FLOATING HEARTS ====================
  function createFloatingHearts() {
    if (!document.getElementById('float-hearts-style')) {
      var style = document.createElement('style');
      style.id = 'float-hearts-style';
      style.textContent = '@keyframes floatUp { 0% { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0; } 10% { opacity: 1; transform: translateY(-10vh) rotate(15deg) scale(1); } 100% { transform: translateY(-110vh) rotate(45deg) scale(0.8); opacity: 0; } } .float-heart { position: fixed; z-index: 10005; pointer-events: none; bottom: -30px; } .float-heart svg { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.15)); }';
      document.head.appendChild(style);
    }
    var colors = ['#C9A96E', '#E8D5A3', '#B76E79', '#D4A0A8', '#E8C4C4', '#916572'];
    for (var i = 0; i < 20; i++) {
      (function (idx) {
        setTimeout(function () {
          var el = document.createElement('div');
          el.className = 'float-heart';
          var color = colors[Math.floor(Math.random() * colors.length)];
          var size = 18 + Math.random() * 24;
          el.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + color + '"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
          el.style.left = Math.random() * 100 + 'vw';
          el.style.animation = 'floatUp ' + (5 + Math.random() * 5) + 's ease-out forwards';
          document.body.appendChild(el);
          setTimeout(function () { el.remove(); }, 10000);
        }, idx * 250);
      })(i);
    }
  }

  // ==================== SPARKLES ====================
  function createSparkles(container, count) {
    if (!container) return;
    for (var i = 0; i < count; i++) {
      var sparkle = document.createElement('div');
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
    var canvas = document.getElementById('petals-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var petals = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function Petal() { this.reset(); }
    Petal.prototype.reset = function () {
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
      var colors = [[232,196,196],[183,110,121],[212,160,168],[201,169,110],[232,213,163]];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    };
    Petal.prototype.update = function () {
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.5;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
      if (this.y > canvas.height + 20) this.reset();
    };
    Petal.prototype.draw = function () {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size * 0.3, -this.size * 0.4, this.size * 0.7, -this.size * 0.2, this.size, 0);
      ctx.bezierCurveTo(this.size * 0.7, this.size * 0.2, this.size * 0.3, this.size * 0.4, 0, 0);
      ctx.fillStyle = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')';
      ctx.fill();
      ctx.restore();
    };

    for (var i = 0; i < 20; i++) {
      var p = new Petal();
      p.y = Math.random() * canvas.height;
      petals.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(function (p) { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ==================== MUSIC ====================
  function initMusic() {
    var audio = document.getElementById('bg-music');
    var toggle = document.getElementById('music-toggle');
    if (!audio || !toggle) return;

    var iconOff = toggle.querySelector('.music-off');
    var iconOn = toggle.querySelector('.music-on');
    var playing = false;

    if (audio.canPlayType('audio/mpeg')) {
      audio.play().then(function () {
        playing = true;
        iconOff.classList.add('hidden');
        iconOn.classList.remove('hidden');
      }).catch(function () {});
    }

    toggle.addEventListener('click', function () {
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
