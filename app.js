(() => {
 'use strict';
 document.documentElement.classList.add('js');
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 const hero = document.querySelector('.hero');
 const progress = document.querySelector('.read-progress');
 const menu = document.querySelector('.menu-toggle');
 const nav = document.querySelector('#navigation');
 const chapters = [...document.querySelectorAll('.chapter')];
 const railLinks = [...document.querySelectorAll('.chapter-rail a')];
 const navLinks = [...nav.querySelectorAll('a')];
 let ticking = false;
 function updateScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  if (!reduced.matches) {
   const distance = hero.offsetHeight - document.querySelector('.hero-stage').offsetHeight;
   hero.style.setProperty('--hero-p', Math.min(1, Math.max(0, scrollY / Math.max(1, distance))));
  }
  let current = chapters[0].id;
  for (const section of chapters) if (section.getBoundingClientRect().top <= innerHeight * .4) current = section.id;
  [...railLinks, ...navLinks].forEach(link => {
   const active = link.hash === `#${current}`;
   link.classList.toggle('active', active);
   if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  ticking = false;
 }
 function requestScroll() { if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); } }
 addEventListener('scroll', requestScroll, {passive:true});
 addEventListener('resize', requestScroll);
 reduced.addEventListener('change', requestScroll);
 updateScroll();
 const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
 }, {threshold:.08});
 document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
 function closeMenu() { menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open navigation'); nav.classList.remove('open'); }
 menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open?'Close navigation':'Open navigation'); nav.classList.toggle('open',open); });
 navLinks.forEach(link => link.addEventListener('click', closeMenu));
 document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  closeMenu();
  const top = target.id === 'home' ? 0 : target.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight - 18;
  history.replaceState(null, '', link.hash);
  window.scrollTo({top, behavior: reduced.matches ? 'instant' : 'smooth'});
 }));
 document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
 const scene = document.querySelector('.mask-transform');
 document.querySelector('.hero-stage').addEventListener('pointermove', e => {
  if (reduced.matches || e.pointerType !== 'mouse') return;
  scene.style.setProperty('--mx', `${(e.clientX / innerWidth - .5) * 14}px`);
  scene.style.setProperty('--my', `${(e.clientY / innerHeight - .5) * 10}px`);
 });
 const dialog = document.querySelector('#inquiry-dialog');
 const cursorEligible = matchMedia('(hover: hover) and (pointer: fine)');
 const cursorDot = document.querySelector('.cursor-dot');
 const cursorRing = document.querySelector('.cursor-ring');
 let cursorFrame = 0, pointerX = 0, pointerY = 0, ringX = 0, ringY = 0;
 function stopCursor() {
  document.documentElement.classList.remove('custom-cursor','cursor-active','cursor-hover');
  cancelAnimationFrame(cursorFrame); cursorFrame = 0;
 }
 function moveRing() {
  ringX += (pointerX - ringX) * .22; ringY += (pointerY - ringY) * .22;
  cursorRing.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
  if (Math.abs(pointerX-ringX) + Math.abs(pointerY-ringY) > .15) cursorFrame = requestAnimationFrame(moveRing);
  else cursorFrame = 0;
 }
 document.addEventListener('pointermove', e => {
  if (!cursorEligible.matches || reduced.matches || e.pointerType !== 'mouse') { stopCursor(); return; }
  const native = e.target.closest('input,textarea,select,dialog');
  if (native) { stopCursor(); return; }
  const root = document.documentElement;
  if (!root.classList.contains('cursor-active')) { ringX=e.clientX; ringY=e.clientY; }
  pointerX=e.clientX; pointerY=e.clientY;
  root.classList.add('custom-cursor','cursor-active');
  root.classList.toggle('cursor-hover', Boolean(e.target.closest('a,button,summary')));
  cursorDot.style.transform=`translate3d(${pointerX}px,${pointerY}px,0)`;
  if (!cursorFrame) moveRing();
 }, {passive:true});
 document.documentElement.addEventListener('pointerleave', stopCursor);
 window.addEventListener('blur', stopCursor);
 document.addEventListener('keydown', e => { if(e.key==='Tab') stopCursor(); });
 cursorEligible.addEventListener('change', stopCursor);
 reduced.addEventListener('change', stopCursor);
 const email = document.querySelector('#inquiry-email');
 document.querySelectorAll('.inquiry-open').forEach(button => button.addEventListener('click', () => {
  const interest = button.dataset.tier || 'General inquiry';
  email.href = 'mailto:ironmask@gmail.com?subject=' + encodeURIComponent('The Iron Mask — ' + interest) + '&body=' + encodeURIComponent('Hello The Iron Mask,\n\nI would like to learn more about ' + interest.toLowerCase() + ' for FTC Team #38460.\n\n');
  dialog.showModal();
  stopCursor();
 }));
 document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', e => { const rect = dialog.getBoundingClientRect(); if(e.target === dialog && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) dialog.close(); });
})();
