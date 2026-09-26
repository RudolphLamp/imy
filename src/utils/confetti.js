/**
 * Lightweight canvas confetti burst.
 * No dependencies. Runs for a fixed duration, then cleans itself up.
 */

const COLORS = [
  '#6366f1', // indigo
  '#a855f7', // purple
  '#ec4899', // pink
  '#38bdf8', // sky
  '#34d399', // emerald
  '#fbbf24', // amber
  '#f43f5e', // rose
];

const randomBetween = (min, max) => Math.random() * (max - min) + min;

export function launchConfetti(canvas, options = {}) {
  if (!canvas || !canvas.getContext) return;

  const {
    duration = 3200,        // how long the burst runs (ms)
    particleCount = 160,    // how many pieces
    startFromTop = true,    // burst from top edge vs center
  } = options;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  // Size the canvas to the full viewport with DPR for crisp rendering
  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  // Build particles
  const particles = [];
  const W = () => canvas.width / dpr;
  const H = () => canvas.height / dpr;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: startFromTop ? randomBetween(0, W()) : W() / 2,
      y: startFromTop ? randomBetween(-20, 40) : H() / 2,
      vx: randomBetween(-3.2, 3.2),
      vy: randomBetween(1.6, 4.6),
      size: randomBetween(6, 11),
      rotation: randomBetween(0, Math.PI * 2),
      rotationSpeed: randomBetween(-0.12, 0.12),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() < 0.5 ? 'rect' : 'circle',
      life: 0,
    });
  }

  let rafId = null;
  const start = performance.now();

  const tick = () => {
    const elapsed = performance.now() - start;

    // Fade out the last 25% of the duration
    const remaining = 1 - elapsed / duration;
    const alpha = remaining > 0.25 ? 1 : Math.max(0, remaining / 0.25);

    ctx.clearRect(0, 0, W(), H());

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.09;          // gravity
      p.vx *= 0.995;          // drag
      p.rotation += p.rotationSpeed;
      p.life += 1;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    if (elapsed < duration) {
      rafId = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, W(), H());
      window.removeEventListener('resize', resize);
    }
  };

  rafId = requestAnimationFrame(tick);

  // Return a cleanup function so components can stop early
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    ctx.clearRect(0, 0, W(), H());
  };
}