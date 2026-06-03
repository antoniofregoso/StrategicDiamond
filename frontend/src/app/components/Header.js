import { NAV_ITEMS } from './navItems.js';

const PAGE_TITLES = Object.fromEntries(NAV_ITEMS.map((i) => [i.id, i.label]));

const THEME_OPTIONS = [
  { value: 'light', icon: 'fa-solid fa-sun', label: 'Claro' },
  { value: 'dark', icon: 'fa-solid fa-moon', label: 'Oscuro' },
  { value: 'system', icon: 'fa-solid fa-desktop', label: 'Sistema' },
];

export class Header {
  constructor({ currentPage, theme, onThemeChange, onToggleSidebar }) {
    this.currentPage = currentPage;
    this.theme = theme;
    this.onThemeChange = onThemeChange;
    this.onToggleSidebar = onToggleSidebar;
  }

  render() {
    const header = document.createElement('header');
    header.className = 'sd-header';

    // Left: mobile burger + page title
    const left = document.createElement('div');
    left.className = 'sd-header__left';

    const burger = document.createElement('button');
    burger.className = 'sd-header__burger';
    burger.setAttribute('aria-label', 'Menú');
    burger.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    burger.addEventListener('click', this.onToggleSidebar);
    left.appendChild(burger);

    const title = document.createElement('div');
    title.className = 'sd-header__title';
    title.innerHTML = `
      <h1 class="sd-header__page-name">${PAGE_TITLES[this.currentPage] || ''}</h1>
      <p class="sd-header__page-sub">Diamante Estratégico</p>
    `;
    left.appendChild(title);
    header.appendChild(left);

    // Right: theme switcher
    const right = document.createElement('div');
    right.className = 'sd-header__right';

    const themeGroup = document.createElement('div');
    themeGroup.className = 'sd-theme-switcher';
    themeGroup.setAttribute('role', 'group');
    themeGroup.setAttribute('aria-label', 'Tema de color');

    THEME_OPTIONS.forEach(({ value, icon, label }) => {
      const btn = document.createElement('button');
      btn.className = `sd-theme-btn${this.theme === value ? ' is-active' : ''}`;
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      btn.innerHTML = `<i class="${icon}"></i>`;
      btn.addEventListener('click', () => this.onThemeChange(value));
      themeGroup.appendChild(btn);
    });

    right.appendChild(themeGroup);
    header.appendChild(right);

    return header;
  }
}
