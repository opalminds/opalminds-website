/* ═══════════════════════════════════════════════════════════════════════
   OPALMINDS — main.js
   ═══════════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── NEURAL CANVAS ANIMATION ───────────────────────────────────────── */
(function NeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, raf;
  let nodes = [];
  const mouse = { x: -2000, y: -2000 };

  const CFG = {
    count:       60,
    connectDist: 160,
    repelDist:   110,
    repelForce:  1.8,
    speed:       0.22,
    minRadius:   0.5,
    maxRadius:   2.0,
  };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }

  function spawnNodes() {
    nodes = Array.from({ length: CFG.count }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * CFG.speed,
      vy:    (Math.random() - 0.5) * CFG.speed,
      r:     CFG.minRadius + Math.random() * (CFG.maxRadius - CFG.minRadius),
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    /* update */
    nodes.forEach(n => {
      n.x     += n.vx;
      n.y     += n.vy;
      n.phase += 0.018;

      /* wrap around edges */
      if (n.x < -12)   n.x = W + 12;
      if (n.x > W + 12) n.x = -12;
      if (n.y < -12)   n.y = H + 12;
      if (n.y > H + 12) n.y = -12;

      /* mouse repulsion */
      const dx = n.x - mouse.x;
      const dy = n.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      const rd = CFG.repelDist;
      if (d2 < rd * rd && d2 > 0.1) {
        const d    = Math.sqrt(d2);
        const f    = (1 - d / rd) * CFG.repelForce;
        n.x += (dx / d) * f;
        n.y += (dy / d) * f;
      }
    });

    /* draw edges */
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        const cd = CFG.connectDist;
        if (d2 < cd * cd) {
          const t     = 1 - Math.sqrt(d2) / cd;
          const alpha = Math.pow(t, 1.6) * 0.38;
          const g     = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          g.addColorStop(0, `rgba(3,152,248,${alpha})`);
          g.addColorStop(1, `rgba(15,223,227,${alpha})`);
          ctx.beginPath();
          ctx.strokeStyle = g;
          ctx.lineWidth   = 0.65;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    /* draw nodes */
    nodes.forEach(n => {
      const glow = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(n.phase));

      /* soft outer glow */
      const rg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
      rg.addColorStop(0, `rgba(3,152,248,${0.1 * glow})`);
      rg.addColorStop(1, 'rgba(3,152,248,0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = rg;
      ctx.fill();

      /* core dot — shifts between blue and cyan with phase */
      const blend  = 0.5 + 0.5 * Math.sin(n.phase * 0.7);
      const r      = Math.round(3   + (15 - 3)   * blend);
      const g_ch   = Math.round(152 + (223 - 152) * blend);
      const b_ch   = Math.round(248 + (227 - 248) * blend);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g_ch},${b_ch},${0.65 + glow * 0.35})`;
      ctx.fill();
    });

    raf = requestAnimationFrame(tick);
  }

  function init() {
    resize();
    spawnNodes();
    tick();
  }

  const onResize = debounce(() => { resize(); spawnNodes(); }, 180);
  window.addEventListener('resize', onResize, { passive: true });

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  // When cursor leaves the viewport, push mouse far off-screen
  document.addEventListener('mouseleave', () => {
    mouse.x = -2000;
    mouse.y = -2000;
  });

  requestAnimationFrame(init);
})();


/* ─── NAV SCROLL GLASS ──────────────────────────────────────────────── */
(function NavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let ticking = false;
  function update() {
    nav.classList.toggle('scrolled', window.scrollY > 24);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();


/* ─── MOBILE NAV ────────────────────────────────────────────────────── */
(function MobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;

  // Build drawer from nav links
  const links  = document.querySelector('.nav-links');
  const drawer = document.createElement('div');
  drawer.className = 'nav-drawer';
  drawer.setAttribute('aria-label', 'Mobile navigation');

  if (links) {
    links.querySelectorAll('a').forEach(a => {
      const clone = a.cloneNode(true);
      drawer.appendChild(clone);
    });
  }
  // Add CTA
  const cta = document.createElement('a');
  cta.href = '#contact';
  cta.textContent = 'Talk to Us';
  cta.style.cssText = 'color: #0398F8; font-weight: 600;';
  drawer.appendChild(cta);

  document.getElementById('nav').after(drawer);

  function close() {
    drawer.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();


/* ─── SCROLL REVEAL ─────────────────────────────────────────────────── */
(function ScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Stagger siblings within same parent
      const parent   = entry.target.parentElement;
      const siblings = parent.querySelectorAll('.reveal');
      let idx = 0;
      siblings.forEach((s, i) => { if (s === entry.target) idx = i; });

      setTimeout(() => {
        entry.target.classList.add('in-view');
      }, idx * 90);

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ─── PROCESS CONNECTOR LINE ────────────────────────────────────────── */
(function ProcessLine() {
  const fill    = document.querySelector('.process-connector-fill');
  const section = document.getElementById('process');
  if (!fill || !section) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => fill.classList.add('active'), 350);
      observer.disconnect();
    }
  }, { threshold: 0.25 });

  observer.observe(section);
})();



/* ─── SMOOTH ANCHOR SCROLL ──────────────────────────────────────────── */
(function AnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id     = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '70',
        10
      );
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
    });
  });
})();


/* ─── UTILITY ───────────────────────────────────────────────────────── */
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
