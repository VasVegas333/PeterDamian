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
