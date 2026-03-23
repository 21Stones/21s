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

async function doSubmit() {
  const btn1 = document.querySelector('#s1 .ob.sel span:not(.oc)');
  const btn2 = document.querySelector('#s2 .ob.sel span:not(.oc)');
  const rev = btn1 ? btn1.getAttribute('data-en') || btn1.textContent : '';
  const chal = btn2 ? btn2.getAttribute('data-en') || btn2.textContent : '';
  const goals = document.getElementById('gtxt').value;

  const url = 'https://bgnnoliwvahvhdpftmzw.supabase.co/rest/v1/contacts';
  const key = 'sb_publishable_kZSqsUnygVIed6TBdoyHLg_NaOOnr31';

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ revenue: rev, challenge: chal, goals: goals })
    });
  } catch(e) {
    console.error('Supabase error:', e);
  }

  document.getElementById('main').style.display = 'none';
  const c = document.getElementById('conf');
  if (c) c.style.display = 'block';
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
