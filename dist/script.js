const motionButton = document.querySelector('#motion');
let motionOff = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateMotion() {
  document.body.classList.toggle('motion-off', motionOff);
  motionButton.textContent = `Motion: ${motionOff ? 'off' : 'on'}`;
  motionButton.setAttribute('aria-pressed', String(motionOff));
}
updateMotion();
motionButton.addEventListener('click', () => { motionOff = !motionOff; updateMotion(); });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#load-mix').addEventListener('click', function () {
  const iframe = document.createElement('iframe');
  iframe.title = 'Peter Damian — Live from Vertigo, February 23, 2024';
  iframe.allow = 'autoplay';
  iframe.src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent('https://soundcloud.com/peterdamian/live-from-vertigo-20240223') + '&color=%23f05a35&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false';
  document.querySelector('#mix-player').appendChild(iframe);
  this.hidden = true;
  this.style.display = 'none';
  document.querySelector('#embed-note').textContent = 'Press play in the player. If it is unavailable, open the mix on SoundCloud below.';
});
document.querySelector('audio').addEventListener('error', () => {
  document.querySelector('#audio-note').textContent = 'Preview unavailable. Choose your platform below to listen.';
});

// Ambient motion is decorative, independent of audio playback.
const wave = document.createElement('div');
wave.className = 'waveform';
wave.setAttribute('aria-hidden', 'true');
for (let i = 0; i < 72; i++) {
  const bar = document.createElement('i');
  bar.style.setProperty('--h', `${18 + ((i * 37 + 13) % 77)}%`);
  bar.style.setProperty('--delay', `${-(i % 17) * .13}s`);
  wave.appendChild(bar);
}
document.querySelector('.mixes').appendChild(wave);
const revealItems = document.querySelectorAll('.section-head, .release-copy, .release-row, .mix-layout, .about-copy, .contact-title');
if ('IntersectionObserver' in window && !motionOff) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.remove('pending');
      observer.unobserve(entry.target);
    }
  }, { threshold: .08 });
  for (const item of revealItems) { item.classList.add('reveal', 'pending'); observer.observe(item); }
}
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking || motionOff) return;
  ticking = true;
  requestAnimationFrame(() => {
    document.documentElement.style.setProperty('--scroll', Math.min(window.scrollY / window.innerHeight, 1).toFixed(3));
    ticking = false;
  });
}, { passive: true });
const artwork = document.querySelector('.cover');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  artwork.addEventListener('pointermove', event => {
    if (motionOff) return;
    const box = artwork.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    artwork.style.transform = `rotateX(${-y * 12}deg) rotateY(${x * 16}deg) rotate(-2deg) translateY(-8px)`;
  });
  artwork.addEventListener('pointerleave', () => { artwork.style.transform = ''; });
}
