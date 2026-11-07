// ───── NAVBAR SCROLL ─────
const navbar = document.getElementById('navbar');
var _navTick = false;
window.addEventListener('scroll', () => {
  if (_navTick) return;
  _navTick = true;
  requestAnimationFrame(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    _navTick = false;
  });
}, { passive: true });

// ───── REVEAL ANIMATIONS ─────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// Also trigger hero elements on load
setTimeout(() => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
}, 100);

// ───── COUNTDOWN ─────
// Event: 16 Nov 2026, 09:00 Algeria time (Africa/Algiers = UTC+01:00)
// We use an explicit UTC timestamp to avoid visitor timezone confusion.
// UTC equivalent: 2026-11-16T08:00:00Z
var _cdTarget = new Date('2026-11-16T08:00:00Z');
var _cdTimer = null;

function _pad(n) { return String(n).padStart(2, '0'); }

function _setCountdownUI(days, hours, mins, secs) {
  // Hero countdown (new)
  var hDays  = document.getElementById('hcd-days');
  var hHours = document.getElementById('hcd-hours');
  var hMins  = document.getElementById('hcd-mins');
  var hSecs  = document.getElementById('hcd-secs');
  if (hDays)  hDays.textContent  = _pad(days);
  if (hHours) hHours.textContent = _pad(hours);
  if (hMins)  hMins.textContent  = _pad(mins);
  if (hSecs)  hSecs.textContent  = _pad(secs);
}

function _showEventMessage() {
  // Hero
  var heroCountdown = document.querySelector('.hero-countdown');
  var heroMsg = document.getElementById('hcd-event-msg');
  if (heroCountdown) heroCountdown.hidden = true;
  if (heroMsg) { heroMsg.hidden = false; }
}

function updateCountdown() {
  var now  = new Date();
  var diff = _cdTarget - now;

  if (diff <= 0) {
    _showEventMessage();
    if (_cdTimer) { clearInterval(_cdTimer); _cdTimer = null; }
    return;
  }

  var days  = Math.floor(diff / 86400000);
  var hours = Math.floor((diff % 86400000) / 3600000);
  var mins  = Math.floor((diff % 3600000)  / 60000);
  var secs  = Math.floor((diff % 60000)    / 1000);

  _setCountdownUI(days, hours, mins, secs);
}

updateCountdown();
if (_cdTarget - new Date() > 0) _cdTimer = setInterval(updateCountdown, 1000);

// ───── PAUSE HERO ANIMATIONS WHEN OFF-SCREEN ─────
(function() {
  var hero = document.querySelector('.hero');
  if (!hero || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function(entries) {
    hero.classList.toggle('hero-offscreen', !entries[0].isIntersecting);
  }).observe(hero);
})();

// ───── SMOOTH SCROLL ─────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ───── HAMBURGER MENU ─────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ───── FLOATING CODE BACKGROUND ─────
(function() {
  const container = document.getElementById('floatingCode');
  if (!container) return;

  const items = [
    { text: 'GDG',           color: [66,133,244]  },
    { text: 'Ghardaia',      color: [52,168,83]   },
    { text: 'DevFest',       color: [168,85,247]  },
    { text: 'AI',            color: [0,200,255]   },
    { text: 'Web',           color: [66,133,244]  },
    { text: 'Cloud',         color: [52,168,83]   },
    { text: 'Mobile',        color: [168,85,247]  },
    { text: 'Cybersecurity', color: [234,67,53]   },
    { text: 'Python',        color: [251,188,4]   },
    { text: 'Flutter',       color: [66,133,244]  },
    { text: 'React',         color: [0,200,255]   },
    { text: 'ML',            color: [168,85,247]  },
    { text: '</>',           color: [52,168,83]   },
    { text: '{ }',           color: [66,133,244]  },
    { text: 'Node.js',       color: [52,168,83]   },
    { text: 'DevOps',        color: [168,85,247]  },
    { text: 'Data',          color: [251,188,4]   },
    { text: 'API',           color: [66,133,244]  },
    { text: 'Linux',         color: [52,168,83]   },
    { text: '&&',            color: [168,85,247]  },
    { text: '=>',            color: [0,200,255]   },
    { text: 'npm',           color: [234,67,53]   },
    { text: 'JSON',          color: [66,133,244]  },
    { text: 'Git',           color: [251,188,4]   },
    { text: 'IoT',           color: [52,168,83]   },
    { text: 'HTTPS',         color: [168,85,247]  },
    { text: 'SQL',           color: [0,200,255]   },
    { text: '[ ]',           color: [66,133,244]  },
  ];

  function rnd(a, b) { return Math.random() * (b - a) + a; }

  items.forEach((item) => {
    const instances = Math.random() > 0.5 ? 2 : 1;
    for (let k = 0; k < instances; k++) {
      const el = document.createElement('span');
      el.className = 'code-word';
      el.textContent = item.text;
      const opacity = rnd(0.06, 0.16);
      const [r,g,b] = item.color;
      el.style.color = `rgba(${r},${g},${b},${opacity.toFixed(2)})`;
      el.style.textShadow = `0 0 10px rgba(${r},${g},${b},${(opacity*0.7).toFixed(2)})`;
      el.style.fontSize = rnd(11, 18).toFixed(0) + 'px';
      el.style.fontWeight = item.text.length <= 3 ? '700' : '400';
      el.style.left = rnd(1, 90) + '%';
      const dur = rnd(18, 38).toFixed(1);
      const delay = rnd(-35, 0).toFixed(1);
      el.style.animation = `floatUp ${dur}s ${delay}s linear infinite`;
      container.appendChild(el);
    }
  });
})();



// ───── RIPPLE EFFECT ON BUTTONS ─────
document.querySelectorAll('.btn-primary, .btn-hero, .nav-cta').forEach(btn => {
  // Add pulse class to main CTA buttons
  if (btn.classList.contains('btn-primary') || btn.classList.contains('btn-hero')) {
    btn.classList.add('pulse-btn');
  }
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('btn-ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top  = (e.clientY - rect.top  - size/2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// ───── THEME TOGGLE (DARK / LIGHT) ─────
(function() {
  const root = document.documentElement;
  const btn  = document.getElementById('theme-toggle');

  // Follow system preference unless user manually overrode.
  // We store override in localStorage but always re-check system on load.
  const systemDark     = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const systemTheme    = systemDark ? 'dark' : 'light';
  const manualOverride = localStorage.getItem('devfest-theme-override');
  // If user's system changed since last visit, clear old override
  const lastSystem     = localStorage.getItem('devfest-last-system');
  if (lastSystem && lastSystem !== systemTheme) {
    localStorage.removeItem('devfest-theme-override');
  }
  localStorage.setItem('devfest-last-system', systemTheme);
  const initialTheme   = manualOverride || systemTheme;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    btn.textContent = theme === 'dark' ? '\u2600\ufe0f' : '\uD83C\uDF19';
    btn.title = theme === 'dark' ? '\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062a\u062d' : '\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062f\u0627\u0643\u0646';
    // Swap logos
    var logoDark  = document.getElementById('logo-dark');
    var logoLight = document.getElementById('logo-light');
    if (logoDark && logoLight) {
      logoDark.style.display  = (theme === 'dark')  ? 'block' : 'none';
      logoLight.style.display = (theme === 'light') ? 'block' : 'none';
    }
  }

  applyTheme(initialTheme);

  btn.addEventListener('click', function() {
    var current = root.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('devfest-theme-override', next);
    applyTheme(next);
  });

  // Live-follow system changes unless user manually overrode in this session
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('devfest-theme-override')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

// ───── LOGO → SCROLL TO TOP ─────
document.getElementById('nav-logo-btn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



/* ===== NEXT ORIGINAL SCRIPT SECTION ===== */


/* ───── SPEAKERS CAROUSEL (self-contained) ───── */
(function () {
  var root = document.getElementById('speakers-section');
  if (!root) return;
  var stage = root.querySelector('.speakers-stage');
  var carousel = root.querySelector('.speakers-carousel');
  var cards = [].slice.call(root.querySelectorAll('.speakers-card'));
  var dots = [].slice.call(root.querySelectorAll('.speakers-dot'));
  var prevBtn = root.querySelector('.speakers-prev');
  var nextBtn = root.querySelector('.speakers-next');
  var modal = document.getElementById('speakers-modal');
  var n = cards.length, cur = 0, INTERVAL = 4000;

  /* Verified biographies go here, keyed by data-id. Empty = no details dialog.
     (Taleb Bakir is intentionally excluded: name + LinkedIn only.) */
  var BIOS = {
    'belgacem-haba': "بلقاسم حبة عالم ومخترع جزائري متخصص في الإلكترونيات الدقيقة وتقنيات أشباه الموصلات. حاصل على الدكتوراه من جامعة ستانفورد، وساهم في تطوير تقنيات إلكترونية متقدمة، وارتبط اسمه بمئات براءات الاختراع خلال مسيرته البحثية والتكنولوجية.",
    'abderrahmane-saoudi': "عبد الرحمن السعودي مصمم مهتم بتصميم واجهات المستخدم وتجربة المستخدم والمنتجات الرقمية. يعمل أيضا في تطوير تطبيقات Flutter، وله مساهمات في قيادة وتنظيم أنشطة مجتمع GDG Ghardaia، ويهتم بتحويل الأفكار إلى تجارب رقمية عملية.",
    'ali-mokrani': "علي مقراني رائد أعمال تقني جزائري، ومؤسس مشارك ومدير تنفيذي لمنصة Ayor.ai المتخصصة في حلول التجارة الإلكترونية باستخدام الذكاء الاصطناعي. يمتلك خبرة في تطوير البرمجيات والتسويق الرقمي وإدارة المشاريع، ويعمل على توظيف التكنولوجيا لمساعدة رواد الأعمال على تطوير مشاريعهم.",
    'zoubir-ouaret': "زبير أوعارت خبير جزائري في هندسة الأنظمة المؤسسية وحوكمة تقنية المعلومات، حاصل على الدكتوراه في الإعلام الآلي من المدرسة الوطنية العليا للإعلام الآلي. شغل منصب مدير نظم المعلومات بمجموعة BIOPHARM، وله خبرة تتجاوز عشرين سنة في إدارة المشاريع التقنية وتطوير الأنظمة المؤسسية.",
    'aimen-bouzana': "أيمن بوزانة أستاذ جامعي وباحث جزائري متخصص في الإدارة المالية والتكنولوجيا المالية والتحول الرقمي. تشمل اهتماماته البحثية الشمول المالي والابتكار المصرفي والتقنيات المالية الحديثة، وله مساهمات أكاديمية في ريادة الأعمال وتطوير المشاريع.",
    'ibtissem-hattab': "ابتسام حطاب مهندسة متخصصة في DevOps وMLOps من تونس، وخبيرة Google Developer Expert في مجال الحوسبة السحابية. قدمت جلسات تقنية حول بناء وكلاء الذكاء الاصطناعي باستخدام ADK وA2A وMCP، إلى جانب موضوعات Kubernetes وGoogle Cloud."
  };
  delete BIOS['hadj-mahammed-taleb-bakir'];

  var mq = window.matchMedia('(max-width: 767px)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var userPlaying = !reduce.matches, hover = false, focused = false, touching = false;
  var modalOpen = false, inView = false, tabVisible = !document.hidden, timer = null;

  function offset(i) { var h = Math.floor(n / 2); return ((i - cur + n + h) % n) - h; }

  function layout() {
    var mobile = mq.matches;
    var cw = cards[0].offsetWidth, g = mobile ? 10 : 24, s1 = mobile ? 0.88 : 0.86, s2 = 0.72;
    var maxVis = mobile ? 1 : 2;
    cards.forEach(function (c, i) {
      var d = offset(i), ad = Math.abs(d);
      var sc = ad === 0 ? 1 : ad === 1 ? s1 : s2, x = 0;
      if (ad >= 1) x = cw / 2 + g + cw * s1 / 2;
      if (ad >= 2) x += cw * s1 / 2 + g + cw * s2 / 2;
      if (ad >= 3) x += cw * s2 + g;
      if (d > 0) x = -x;
      var y = ad === 0 ? 0 : ad === 1 ? 16 : 28;
      var vis = ad <= maxVis;
      c.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + sc + ')';
      c.style.opacity = !vis ? 0 : ad === 0 ? 1 : ad === 1 ? 0.78 : 0.4;
      c.style.zIndex = 10 - ad;
      c.style.pointerEvents = vis ? '' : 'none';
      c.classList.toggle('is-active', ad === 0);
      c.inert = !vis;
      c.setAttribute('aria-hidden', vis ? 'false' : 'true');
    });
    dots.forEach(function (dt, i) { dt.setAttribute('aria-current', i === cur ? 'true' : 'false'); });
    var h = 0;
    cards.forEach(function (c) { h = Math.max(h, c.offsetHeight); });
    stage.style.height = (h + 40) + 'px';
  }

  function canRun() { return userPlaying && !touching && !modalOpen && inView && tabVisible; }
  function schedule() {
    clearTimeout(timer); timer = null;
    if (canRun()) timer = setTimeout(function () { go(cur + 1); }, INTERVAL);
  }
  function go(to) { cur = ((to % n) + n) % n; layout(); refreshBioA11y(); schedule(); }

  prevBtn.addEventListener('click', function () { go(cur - 1); });
  nextBtn.addEventListener('click', function () { go(cur + 1); });
  dots.forEach(function (dt, i) { dt.addEventListener('click', function () { go(i); }); });

  if (reduce.addEventListener) reduce.addEventListener('change', function () { if (reduce.matches) { userPlaying = false; schedule(); } });

  /* autoplay is NOT paused by hover or focus; only by drag, details dialog, hidden tab, off-screen, reduced motion */
  var hoverSection = false;   /* used only to decide whether arrow keys are meant for this slider */
  root.addEventListener('mouseenter', function () { hoverSection = true; });
  root.addEventListener('mouseleave', function () { hoverSection = false; });
  carousel.addEventListener('focusin', function (e) {
    var card = e.target.closest && e.target.closest('.speakers-card');
    if (card && !card.classList.contains('is-active')) go(cards.indexOf(card));
  });
  document.addEventListener('visibilitychange', function () { tabVisible = !document.hidden; schedule(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { inView = es[0].isIntersecting; schedule(); }, { threshold: 0.2 }).observe(root);
  } else { inView = true; }

  /* swipe / drag (autoplay is held while a pointer is down, resumed on release/cancel) */
  var sx = 0, sy = 0, lx = 0, ly = 0, tracking = false, suppress = false;
  stage.addEventListener('pointerdown', function (e) {
    if (e.target.closest('a')) return;
    tracking = true; sx = lx = e.clientX; sy = ly = e.clientY; suppress = false;
    touching = true; schedule();
  });
  document.addEventListener('pointermove', function (e) { if (tracking) { lx = e.clientX; ly = e.clientY; } });
  function endPointer(e, cancelled) {
    if (!tracking) return;
    var ex = cancelled ? lx : e.clientX, ey = cancelled ? ly : e.clientY;
    var dx = ex - sx, dy = ey - sy;
    tracking = false; touching = false;
    if (Math.abs(dx) > 10) suppress = true;
    /* RTL: swipe left -> cards move left (previous card enters from the right); swipe right -> next */
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) { go(dx < 0 ? cur - 1 : cur + 1); return; }
    schedule();
  }
  document.addEventListener('pointerup', function (e) { endPointer(e, false); });
  document.addEventListener('pointercancel', function (e) { endPointer(e, true); });
  window.addEventListener('blur', function () { if (tracking) { tracking = false; touching = false; schedule(); } });
  stage.addEventListener('dragstart', function (e) { e.preventDefault(); });

  /* keyboard: ArrowLeft moves the cards visually left, ArrowRight visually right (same mapping as swipe).
     Only active when focus is inside the slider, or the pointer is over the visible section. */
  var lastKeyNav = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || modalOpen || document.documentElement.classList.contains('gm-locked')) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) ||
        (t.closest && t.closest('[role="listbox"],[role="menu"],[role="slider"],[role="tablist"],[role="textbox"]')))) return;
    var inside = root.contains(document.activeElement) || (t && root.contains(t));
    if (!(inside || (hoverSection && inView))) return;
    e.preventDefault();
    var now = Date.now();
    if (e.repeat || now - lastKeyNav < 260) return;   /* one card per press, no stacked transitions */
    lastKeyNav = now;
    go(e.key === 'ArrowLeft' ? cur - 1 : cur + 1);
  });

  /* card click: side card -> centre it; active card with bio -> details dialog */
  cards.forEach(function (c, i) {
    var id = c.getAttribute('data-id');
    var hasBio = !!BIOS[id];
    if (hasBio) { c.classList.add('has-bio'); }
    c.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      if (suppress) { suppress = false; return; }
      if (i !== cur) { go(i); return; }
      if (hasBio) openModal(i);
    });
    c.addEventListener('keydown', function (e) {
      if (hasBio && i === cur && (e.key === 'Enter' || e.key === ' ') && e.target === c) { e.preventDefault(); openModal(i); }
    });
  });
  function refreshBioA11y() {
    cards.forEach(function (c, i) {
      var on = c.classList.contains('has-bio') && i === cur;
      if (on) { c.setAttribute('tabindex', '0'); c.setAttribute('role', 'button'); }
      else { c.removeAttribute('tabindex'); c.removeAttribute('role'); }
    });
  }

  /* details dialog */
  var lastFocus = null;
  function openModal(i) {
    var c = cards[i], id = c.getAttribute('data-id');
    if (!BIOS[id] || !modal) return;
    modal.querySelector('.speakers-modal-img').src = c.querySelector('img').getAttribute('src');
    modal.querySelector('.speakers-modal-img').alt = '';
    modal.querySelector('#speakers-modal-name').textContent = c.querySelector('.speakers-name').firstChild.textContent.trim();
    modal.querySelector('.speakers-modal-role').textContent = (c.querySelector('.speakers-role') || {}).textContent || '';
    modal.querySelector('.speakers-modal-bio').textContent = BIOS[id];
    modal.querySelector('.speakers-modal-li').href = c.querySelector('.speakers-li').href;
    lastFocus = document.activeElement; modal.hidden = false; modalOpen = true;
    document.body.style.overflow = 'hidden'; schedule();
    modal.querySelector('.speakers-modal-close').focus();
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true; modalOpen = false; document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus(); schedule();
  }
  if (modal) {
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key === 'Tab') {
        var f = [].slice.call(modal.querySelectorAll('button, a[href]'));
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });
  }

  window.addEventListener('resize', layout);
  window.addEventListener('load', layout);
  if (mq.addEventListener) mq.addEventListener('change', layout);
  layout(); refreshBioA11y();
})();


/* ===== NEXT ORIGINAL SCRIPT SECTION ===== */


/* Moments from DevFest — gallery behaviour (scoped, no dependencies) */
(function () {
  var section = document.getElementById('moments-section');
  if (!section) return;
  var toggle = document.getElementById('gm-toggle');
  var more = document.getElementById('gm-more');
  var label = toggle.querySelector('.gm-btn-label');

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    more.hidden = open;
    label.textContent = open ? 'Explore All Moments' : 'Show Fewer Moments';
    if (open) {
      var top = section.getBoundingClientRect().top;
      if (top < 0) section.scrollIntoView({ block: 'start' });
    }
  });

  /* Lightbox */
  var lb = document.getElementById('gm-lightbox');
  var img = document.getElementById('gm-lb-img');
  var cap = document.getElementById('gm-lb-cap');
  var count = document.getElementById('gm-count');
  var btnClose = document.getElementById('gm-close');
  var btnPrev = document.getElementById('gm-prev');
  var btnNext = document.getElementById('gm-next');
  var items = Array.prototype.slice.call(section.querySelectorAll('.gm-open'));
  var current = 0, lastFocus = null, token = 0;

  function show(i, instant) {
    current = (i + items.length) % items.length;
    var b = items[current], my = ++token;
    var apply = function () {
      if (my !== token) return;
      img.src = b.getAttribute('data-full');
      img.alt = b.getAttribute('data-alt');
      cap.textContent = b.getAttribute('data-alt');
      count.textContent = (current + 1) + ' / ' + items.length;
      requestAnimationFrame(function () { img.classList.remove('gm-swap'); });
    };
    if (instant) { apply(); } else { img.classList.add('gm-swap'); setTimeout(apply, 120); }
    [current + 1, current - 1].forEach(function (n) {
      var p = new Image(); p.src = items[(n + items.length) % items.length].getAttribute('data-full');
    });
  }
  function open(i) {
    lastFocus = document.activeElement;
    lb.hidden = false;
    lb.classList.add('gm-open-anim');
    document.documentElement.classList.add('gm-locked');
    show(i, true);
    btnClose.focus();
  }
  function close() {
    token++;
    lb.hidden = true;
    lb.classList.remove('gm-open-anim');
    document.documentElement.classList.remove('gm-locked');
    img.removeAttribute('src');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  items.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { show(current - 1); });
  btnNext.addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-gm-close') || e.target === document.getElementById('gm-stage')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    else if (e.key === 'Tab') {
      var f = [btnClose, btnPrev, btnNext];
      var idx = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  /* Touch swipe */
  var sx = 0, sy = 0, tracking = false;
  lb.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { tracking = false; return; }
    tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (!tracking) return; tracking = false;
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();


/* ===== NEXT ORIGINAL SCRIPT SECTION ===== */


/* Sponsors & Partners marquee + map button label (scoped, self-contained) */
(function () {
  /* map button label follows <html lang> if a language switch is ever added */
  var mapLabel = document.querySelector('#map-open-btn .map-btn-label');
  function syncMapLabel() {
    if (!mapLabel) return;
    var en = (document.documentElement.lang || 'ar').toLowerCase().indexOf('en') === 0;
    mapLabel.textContent = en ? mapLabel.getAttribute('data-en') : mapLabel.getAttribute('data-ar');
  }
  syncMapLabel();
  if (mapLabel && 'MutationObserver' in window) {
    new MutationObserver(syncMapLabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  var sec = document.getElementById('sponsors-section');
  if (!sec) return;
  var rows = Array.prototype.slice.call(sec.querySelectorAll('.sp-row'));
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var timers = new WeakMap();

  rows.forEach(function (row) {
    var track = row.querySelector('.sp-track');
    row._orig = Array.prototype.slice.call(track.children);
    row._n = 0;
  });

  /* copies needed so that (copies - 1) * sequence >= viewport width => never an empty gap */
  function build() {
    var reduce = mqReduce.matches;
    rows.forEach(function (row) {
      var track = row.querySelector('.sp-track');
      var orig = row._orig;
      var n = 1;
      if (!reduce) {
        var first = orig[0];
        var mr = parseFloat(getComputedStyle(first).marginRight) || 0;
        var seq = orig.length * (first.offsetWidth + mr);
        n = Math.max(2, Math.ceil(window.innerWidth / seq) + 1);
      }
      if (n === row._n) return;
      Array.prototype.slice.call(track.querySelectorAll('[data-clone]')).forEach(function (el) { el.remove(); });
      var frag = document.createDocumentFragment();
      for (var c = 1; c < n; c++) {
        orig.forEach(function (el) {
          var k = el.cloneNode(true);
          k.setAttribute('data-clone', '');
          k.setAttribute('aria-hidden', 'true');
          k.removeAttribute('tabindex'); k.removeAttribute('role'); k.removeAttribute('aria-label');
          var im = k.querySelector('img'); if (im) im.alt = '';
          frag.appendChild(k);
        });
      }
      track.appendChild(frag);
      track.style.setProperty('--sp-n', String(Math.max(n, 2)));
      row._n = n;
    });
  }

  /* pause only the clicked row for 3 s; another click restarts the countdown */
  function pauseRow(row) {
    if (mqReduce.matches) return;
    row.classList.add('is-paused');
    clearTimeout(timers.get(row));
    timers.set(row, setTimeout(function () { row.classList.remove('is-paused'); timers.delete(row); }, 3000));
  }
  rows.forEach(function (row) {
    row.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.sp-logo')) pauseRow(row);
    });
    row.addEventListener('keydown', function (e) {
      var card = e.target.closest && e.target.closest('.sp-logo');
      if (!card || card.hasAttribute('data-clone')) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pauseRow(row); }
    });
  });

  build();
  var lastW = window.innerWidth, rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (window.innerWidth !== lastW) { lastW = window.innerWidth; build(); } }, 150);
  });
  if (mqReduce.addEventListener) mqReduce.addEventListener('change', build);

  /* save work: pause all rows while the section is off-screen (position is kept) */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      sec.classList.toggle('sp-offscreen', !es[0].isIntersecting);
    }, { rootMargin: '120px 0px' }).observe(sec);
  }
})();
