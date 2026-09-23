/* Small, dependency-free interactions: theme toggle, mobile menu,
   active nav highlighting, publication filters, "show more" toggles. */
(function () {
  const root = document.documentElement;

  /* ---- theme ---- */
  const themeBtn = document.getElementById('theme-toggle');
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) {}
  themeBtn && themeBtn.addEventListener('click', function () {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---- mobile menu ---- */
  const nav = document.querySelector('.nav');
  const menuBtn = document.getElementById('menu-toggle');
  menuBtn && menuBtn.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); });
  });

  /* ---- active section in nav ---- */
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---- reveal on scroll ---- */
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { ro.observe(el); });
  }

  /* ---- publication filters ---- */
  const filters = document.querySelectorAll('.filter');
  const pubs = document.querySelectorAll('.pub');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const f = btn.dataset.filter;
      pubs.forEach(function (p) {
        const show = f === 'all' || p.dataset.type === f || (f === 'award' && p.dataset.award === 'true');
        p.hidden = !show;
      });
    });
  });

  /* ---- generic "show more" ---- */
  document.querySelectorAll('[data-more-for]').forEach(function (btn) {
    const targets = document.querySelectorAll('[data-more="' + btn.dataset.moreFor + '"]');
    const labelMore = btn.textContent;
    btn.addEventListener('click', function () {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      targets.forEach(function (t) { t.hidden = expanded; });
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.textContent = expanded ? labelMore : 'Show less';
    });
  });

  /* ---- footer year ---- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
