const navConfig = [
  { name: 'Home',         page: 'home',         path: '' },
  { name: 'Lidmaatschap', page: 'lidmaatschap', path: 'lidmaatschap/' },
  { name: 'Bestuur',      page: 'bestuur',      path: 'bestuur/' },
  { name: 'Rustplaats',   page: 'rustplaats',   path: 'rustplaats/' },
  { name: 'Wensenlijst',  page: 'wensenlijst',  path: 'wensenlijst/' },
  { name: 'Contact',      page: 'contact',      path: 'contact/' },
];

const svgMenu = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
const svgX = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

function getPrefix() {
  const depth = parseInt(document.body.dataset.depth || '0');
  return '../'.repeat(depth);
}

function getCurrentPage() {
  return document.body.dataset.page || 'home';
}

function injectNav() {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  const prefix = getPrefix();
  const current = getCurrentPage();

  const desktopLinks = navConfig.map(item => {
    const active = current === item.page;
    return `<li><a href="${prefix}${item.path}" class="${active ? 'active' : ''}">${item.name}</a></li>`;
  }).join('');

  const mobileLinks = navConfig.map(item => {
    const active = current === item.page;
    return `<a href="${prefix}${item.path}" class="${active ? 'active' : ''}">${item.name}</a>`;
  }).join('');

  placeholder.innerHTML = `
    <nav class="main-nav">
      <div class="nav-inner">
        <a href="${prefix}" class="nav-brand">
          <img src="${prefix}public/logo_compact.png" alt="Uitvaartvereniging Opperdoes" class="nav-logo" />
          <div class="nav-site-name">Uitvaartvereniging Opperdoes</div>
        </a>
        <ul class="nav-links">${desktopLinks}</ul>
        <button class="nav-mobile-btn" id="mobile-btn" aria-label="Menu">
          <span id="menu-icon">${svgMenu}</span>
        </button>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu-inner">${mobileLinks}</div>
      </div>
    </nav>
  `;

  const btn = document.getElementById('mobile-btn');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  let open = false;

  btn.addEventListener('click', () => {
    open = !open;
    if (open) {
      menu.classList.add('visible');
      requestAnimationFrame(() => menu.classList.add('open'));
      icon.innerHTML = svgX;
    } else {
      menu.classList.remove('open');
      icon.innerHTML = svgMenu;
      setTimeout(() => menu.classList.remove('visible'), 300);
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      open = false;
      menu.classList.remove('open');
      icon.innerHTML = svgMenu;
      setTimeout(() => menu.classList.remove('visible'), 300);
    });
  });
}

function injectFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  const prefix = getPrefix();

  placeholder.innerHTML = `
    <footer>
      <div class="footer-inner">
        <div class="footer-brand">
          <img src="${prefix}public/logo_compact.png" alt="Uitvaartvereniging Opperdoes" class="footer-logo" />
          <div>
            <div class="footer-name">Uitvaartvereniging Opperdoes</div>
            <div class="footer-tagline">Draagt Elkanders Lasten</div>
          </div>
        </div>
        <div class="footer-right">
          <p>© 2024 Uitvaartvereniging Opperdoes</p>
          <p>Sinds 1931 verbonden met de gemeenschap</p>
          <div class="footer-dev">Website ontwikkeld door Tijmen Terpstra</div>
        </div>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});
