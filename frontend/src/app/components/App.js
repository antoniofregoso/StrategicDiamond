import '../icons.js';
import { Sidebar } from './Sidebar.js';
import { Header } from './Header.js';
import { PageRouter } from './PageRouter.js';
import { setCurrentPage, setTheme, toggleSidebar } from '../slices/uiSlice.js';

export class App {
  constructor(store) {
    this.store = store;
    this.el = null;

    // Re-render on state changes
    this.store.subscribe(() => this.render());

    // Listen for system theme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        const state = this.store.getState().ui;
        if (state.theme === 'system') {
          this.store.dispatch(setTheme('system'));
        }
      });
  }

  mount(container) {
    this.el = container;
    this.render();
  }

  render() {
    const state = this.store.getState().ui;
    const { resolvedTheme, sidebarCollapsed, currentPage } = state;
    const authPages = ['login', 'registro'];
    const isAuthPage = authPages.includes(currentPage);
    const isAuthenticated = Boolean(localStorage.getItem('sd-auth-token'));

    // Apply theme to <html>
    document.documentElement.setAttribute('data-theme', resolvedTheme);

    if (!this.el) return;

    this.el.innerHTML = '';

    if (!isAuthenticated || isAuthPage) {
      this.renderAuthLayout(isAuthPage ? currentPage : 'login');
      return;
    }

    this.el.className = `app-layout${sidebarCollapsed ? ' sidebar-collapsed' : ''}`;

    // Sidebar
    const sidebar = new Sidebar({
      collapsed: sidebarCollapsed,
      currentPage,
      onNavigate: (page) => this.store.dispatch(setCurrentPage(page)),
      onToggle: () => this.store.dispatch(toggleSidebar()),
    });
    this.el.appendChild(sidebar.render());

    // Main content wrapper
    const main = document.createElement('div');
    main.className = 'app-main';

    // Header
    const header = new Header({
      currentPage,
      theme: state.theme,
      onThemeChange: (t) => this.store.dispatch(setTheme(t)),
      onToggleSidebar: () => this.store.dispatch(toggleSidebar()),
    });
    main.appendChild(header.render());

    // Page content
    const content = document.createElement('div');
    content.className = 'app-content';
    const router = new PageRouter({
      currentPage,
      onNavigate: (page) => this.store.dispatch(setCurrentPage(page)),
    });
    content.appendChild(router.render());
    main.appendChild(content);

    this.el.appendChild(main);
  }

  renderAuthLayout(currentPage) {
    this.el.className = 'app-auth-layout';

    const router = new PageRouter({
      currentPage,
      onNavigate: (page) => this.store.dispatch(setCurrentPage(page)),
    });

    this.el.appendChild(router.render());
  }
}
