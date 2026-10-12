(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  canvas.className = 'ambient-field';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) { canvas.remove(); return; }
  const toggle = document.createElement('button');
  toggle.className = 'ambient-toggle';
  toggle.type = 'button';
  document.body.append(toggle);
  let paused = reduced.matches, width = 0, height = 0, particles = [];
  let frame = 0, previous = 0, elapsed = 0;
  function size() {
    width = innerWidth; height = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({length: width < 700 ? 30 : 65}, () => ({
      x: Math.random() * width, y: Math.random() * height,
      speed: 6 + Math.random() * 15, radius: .7 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2
    }));
    paint(0);
  }
  function glow(x, y, radius, alpha) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(63,147,98,${alpha})`);
    gradient.addColorStop(.45, `rgba(36,107,69,${alpha * .5})`);
    gradient.addColorStop(1, 'rgba(18,61,42,0)');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
  }
  function paint(dt) {
    ctx.clearRect(0, 0, width, height);
    const t = elapsed;
    glow(width * (.22 + Math.sin(t * .09) * .23), height * (.35 + Math.cos(t * .12) * .22), Math.max(width * .42, 400), .33);
    glow(width * (.78 + Math.cos(t * .07) * .15), height * (.68 + Math.sin(t * .1) * .2), Math.max(width * .3, 300), .25);
    // Slow angular energy contours along the edges, behind the content.
    for (let j = 0; j < 3; j++) {
      const cx = width * (j % 2 ? .96 : .04) + Math.sin(t * .06 + j) * 45;
      const cy = height * (.25 + j * .28) + Math.cos(t * .08 + j) * 40;
      const r = 130 + j * 65;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.sin(t * .035 + j) * .18);
      ctx.strokeStyle = `rgba(94,168,118,${.12 + Math.sin(t * .22 + j) * .035})`;
      ctx.lineWidth = 1;
      for (let k = 0; k < 2; k++) {
        const a = r + k * 24;
        ctx.beginPath(); ctx.moveTo(0, -a); ctx.lineTo(a * .65, 0); ctx.lineTo(0, a); ctx.lineTo(-a * .65, 0); ctx.closePath(); ctx.stroke();
      }
      ctx.restore();
    }
    for (const p of particles) {
      p.y -= p.speed * dt; p.x += Math.sin(t * .4 + p.phase) * dt * 6;
      if (p.y < -25) { p.y = height + 25; p.x = Math.random() * width; }
      const alpha = .3 + (Math.sin(t * .8 + p.phase) + 1) * .18;
      ctx.fillStyle = `rgba(136,210,160,${alpha})`;
      ctx.shadowColor = '#3f9362'; ctx.shadowBlur = 8;
      ctx.fillRect(p.x, p.y, p.radius, p.radius * 2.1);
      ctx.shadowBlur = 0;
    }
    // A soft, narrow scan beam travels continuously down the viewport.
    const scanY = ((t * 21) % (height + 180)) - 90;
    const scan = ctx.createLinearGradient(0, scanY - 45, 0, scanY + 45);
    scan.addColorStop(0, 'rgba(63,147,98,0)'); scan.addColorStop(.5, 'rgba(63,147,98,.055)'); scan.addColorStop(1, 'rgba(63,147,98,0)');
    ctx.fillStyle = scan; ctx.fillRect(0, scanY - 45, width, 90);
  }
  function loop(now) {
    if (paused || document.hidden) { frame = 0; return; }
    if (!previous) previous = now;
    if (now - previous >= 32) {
      const dt = Math.min((now - previous) / 1000, .07);
      previous = now; elapsed += dt; paint(dt);
    }
    frame = requestAnimationFrame(loop);
  }
  function sync() {
    toggle.textContent = paused ? '▷ Motion off' : 'Ⅱ Motion on';
    toggle.setAttribute('aria-label', paused ? 'Play background animation' : 'Pause background animation');
    toggle.setAttribute('aria-pressed', String(!paused));
    cancelAnimationFrame(frame); frame = 0; previous = 0;
    if (!paused && !document.hidden) frame = requestAnimationFrame(loop);
  }
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  addEventListener('resize', size, {passive:true});
  size(); sync();
})();
