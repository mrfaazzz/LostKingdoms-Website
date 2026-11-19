const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Every chapter opens on its own gameplay page. This gives phones and tablets
// a dedicated landscape-first space while keeping the cinematic homepage clean.
document.querySelectorAll('.play-trigger').forEach((button) => {
  button.addEventListener('click', () => {
    const chapter = Number(button.dataset.chapter) || 1;
    window.location.href = `/play/chapter-${chapter}/`;
  });
});

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
