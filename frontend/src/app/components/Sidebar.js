import { NAV_ITEMS } from './navItems.js';

export class Sidebar {
  constructor({ collapsed, currentPage, onNavigate, onToggle }) {
    this.collapsed = collapsed;
    this.currentPage = currentPage;
    this.onNavigate = onNavigate;
    this.onToggle = onToggle;
  }

  render() {
    const aside = document.createElement('aside');
    aside.className = `sd-sidebar${this.collapsed ? ' is-collapsed' : ''}`;
    aside.setAttribute('aria-label', 'Navegación principal');

    // Brand / Logo area
    const brand = document.createElement('div');
    brand.className = 'sd-sidebar__brand';
    brand.innerHTML = `
      <div class="sd-sidebar__logo">
        <span class="sd-logo-icon"><i class="fa-solid fa-cubes"></i></span>
        <span class="sd-logo-text animate__animated animate__fadeIn">
          <span class="sd-logo-title">Diamante</span>
          <span class="sd-logo-subtitle">Estratégico</span>
        </span>
      </div>
    `;
    aside.appendChild(brand);

    // Navigation
    const nav = document.createElement('nav');
    nav.className = 'sd-sidebar__nav';

    const ul = document.createElement('ul');
    ul.className = 'sd-nav-list';

    NAV_ITEMS.forEach((item) => {
      if (item.separator) {
        const sep = document.createElement('li');
        sep.className = 'sd-nav-separator';
        ul.appendChild(sep);
      }

      const li = document.createElement('li');
      li.className = 'sd-nav-item';

      const btn = document.createElement('button');
      btn.className = `sd-nav-btn${this.currentPage === item.id ? ' is-active' : ''}`;
      btn.setAttribute('data-page', item.id);
      btn.setAttribute('aria-label', item.label);
      btn.setAttribute('title', item.label);
      btn.innerHTML = `
        <span class="sd-nav-icon"><i class="${item.icon}"></i></span>
        <span class="sd-nav-label">${item.label}</span>
        <span class="sd-nav-tooltip">${item.label}</span>
      `;

      btn.addEventListener('click', () => this.onNavigate(item.id));
      li.appendChild(btn);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    aside.appendChild(nav);

    // Toggle collapse button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sd-sidebar__toggle';
    toggleBtn.setAttribute('aria-label', this.collapsed ? 'Expandir menú' : 'Contraer menú');
    toggleBtn.setAttribute('title', this.collapsed ? 'Expandir menú' : 'Contraer menú');
    toggleBtn.innerHTML = `<i class="fa-solid ${this.collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}"></i>`;
    toggleBtn.addEventListener('click', this.onToggle);
    aside.appendChild(toggleBtn);

    return aside;
  }
}
