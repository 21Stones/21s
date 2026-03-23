const CL = { l: 'en' };

function switchLang(l) {
  CL.l = l;
  document.documentElement.lang = l;
  document.querySelectorAll('[data-en]').forEach(el => {
    const t = el.getAttribute('data-' + l);
    if (!t) return;
    if ((el.tagName === 'H1' || el.tagName === 'H2') && t.includes('<span')) el.innerHTML = t;
    else el.textContent = t;
  });
  document.getElementById('btnEN').classList.toggle('on', l === 'en');
  document.getElementById('btnES').classList.toggle('on', l === 'es');
}

function goSec(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function closeBanner() {
  document.getElementById('lbanner').style.display = 'none';
}

function pick(btn) {
  btn.closest('.og').querySelectorAll('.ob').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
}

function goStep(n) {
  document.querySelectorAll('.fs').forEach(s => s.classList.remove('on'));
  document.getElementById('s' + n).classList.add('on');
  for (let i = 1; i <= 3; i++) {
    const d = document.getElementById('d' + i);
    if (d) d.classList.toggle('done', i <= n);
  }
}

function doSubmit() {
  document.getElementById('main').style.display = 'none';
  const c = document.getElementById('conf');
  if (c) {
    c.style.display = 'flex';
  }
  switchLang(CL.l);
  window.scrollTo(0, 0);
}

// Fixed IntersectionObserver to handle animations
const obs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('v');
      obs.unobserve(e.target);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fi, .hc, .hst, .sc, .pg, .kc, .ecard, .fw').forEach(el => {
    obs.observe(el);
  });
});
