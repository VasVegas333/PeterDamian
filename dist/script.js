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
document.querySelector('.preview audio').addEventListener('error', () => {
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

// One preview at a time; playback starts only after an explicit tap.
const recordAudio = document.querySelector('#record-audio');
const recordButtons = [document.querySelector('#record-toggle'), document.querySelector('#record-play')];
const recordStatus = document.querySelector('#record-status');
const recordSeek = document.querySelector('#record-seek');
const formatTime = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
function syncRecord() {
  const playing = !recordAudio.paused && !recordAudio.ended;
  document.querySelector('.record-stage').classList.toggle('is-playing', playing);
  recordButtons.forEach(button => button.setAttribute('aria-pressed', String(playing)));
  recordButtons[0].setAttribute('aria-label', playing ? 'Pause latest release preview' : 'Play latest release preview');
  recordButtons[1].textContent = playing ? 'Pause preview' : 'Play preview';
  document.querySelector('#record-label-status').textContent = playing ? 'NOW PLAYING' : 'TAP TO PLAY';
}
async function toggleRecord() {
  if (!recordAudio.paused) { recordAudio.pause(); return; }
  recordStatus.textContent = 'Loading preview…';
  if (recordAudio.ended) recordAudio.currentTime = 0;
  try { await recordAudio.play(); }
  catch { recordStatus.textContent = 'Unable to play here. Open the full track on Beatport below.'; syncRecord(); }
}
recordButtons.forEach(button => button.addEventListener('click', toggleRecord));
recordAudio.addEventListener('playing', () => { recordStatus.textContent = 'Playing the official Beatport preview.'; syncRecord(); });
recordAudio.addEventListener('pause', () => { recordStatus.textContent = 'Preview paused.'; syncRecord(); });
recordAudio.addEventListener('ended', () => { recordStatus.textContent = 'Preview finished. Listen to the full track on Beatport.'; syncRecord(); });
recordAudio.addEventListener('error', () => { recordStatus.textContent = 'Preview unavailable. Listen on Beatport below.'; syncRecord(); });
recordAudio.addEventListener('loadedmetadata', () => { recordSeek.disabled = !Number.isFinite(recordAudio.duration); });
recordAudio.addEventListener('timeupdate', () => {
  if (Number.isFinite(recordAudio.duration) && recordAudio.duration > 0) {
    recordSeek.value = recordAudio.currentTime / recordAudio.duration * 100;
    document.querySelector('#record-time').textContent = `${formatTime(recordAudio.currentTime)} / ${formatTime(recordAudio.duration)}`;
  }
});
recordSeek.addEventListener('input', () => { if (Number.isFinite(recordAudio.duration)) recordAudio.currentTime = Number(recordSeek.value) / 100 * recordAudio.duration; });
document.querySelectorAll('audio').forEach(audio => audio.addEventListener('play', () => {
  document.querySelectorAll('audio').forEach(other => { if (other !== audio) other.pause(); });
}));
document.querySelector('#load-mix').addEventListener('click', () => { document.querySelectorAll('audio').forEach(audio => audio.pause()); });
syncRecord();
