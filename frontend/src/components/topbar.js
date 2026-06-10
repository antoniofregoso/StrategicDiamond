import { icon, faSun, faMoon, faDesktop, faCircleUser, faBell } from './icon.js';
import { contextActions } from '../app/store/actions/index.js';
import { t } from '../i18n/translations.js';

/**
 * Render the top navigation bar HTML.
 * @param {string} lang    — current language ('en' | 'es')
 * @param {string} theme   — current theme ('light' | 'dark' | 'system')
 * @param {string} pageTitle — title of the current area
 * @returns {string}       — HTML string
 */
export function renderTopbar(lang, theme, pageTitle) {
    const themes = [
        { key: 'light', icon: faSun, labelEn: 'Light', labelEs: 'Claro' },
        { key: 'dark', icon: faMoon, labelEn: 'Dark', labelEs: 'Oscuro' },
        { key: 'system', icon: faDesktop, labelEn: 'System', labelEs: 'Sistema' },
    ];

    const themeButtons = themes.map((th) => {
        const label = lang === 'es' ? th.labelEs : th.labelEn;
        return `
        <button
            class="topbar-theme-btn ${theme === th.key ? 'topbar-theme-btn--active' : ''}"
            data-theme="${th.key}"
            aria-label="${label}"
            aria-pressed="${theme === th.key}"
            title="${label}"
        >
            <span class="topbar-theme-icon" aria-hidden="true">
                ${icon(th.icon)}
            </span>
        </button>
        `;
    }).join('');

    return `
    <header id="dashboard-topbar" class="topbar" role="banner">

        <!-- ── Page title ─────────────────────────────────────── -->
        <div class="topbar-title">
            <h1 class="topbar-page-title">${pageTitle}</h1>
        </div>

        <!-- ── Controls ───────────────────────────────────────── -->
        <div class="topbar-controls" role="toolbar" aria-label="Toolbar controls">

            <!-- Theme selector -->
            <div class="topbar-theme-group" role="group" aria-label="${t('topbar.theme', lang)}">
                ${themeButtons}
            </div>

            <!-- Divider -->
            <div class="topbar-divider" aria-hidden="true"></div>

            <!-- Language selector -->
            <div class="topbar-lang-group" role="group" aria-label="${t('topbar.lang', lang)}">
                <button
                    class="topbar-lang-btn ${lang === 'en' ? 'topbar-lang-btn--active' : ''}"
                    data-lang="en"
                    aria-label="English"
                    aria-pressed="${lang === 'en'}"
                >EN</button>
                <button
                    class="topbar-lang-btn ${lang === 'es' ? 'topbar-lang-btn--active' : ''}"
                    data-lang="es"
                    aria-label="Español"
                    aria-pressed="${lang === 'es'}"
                >ES</button>
            </div>

            <!-- Divider -->
            <div class="topbar-divider" aria-hidden="true"></div>

            <!-- User avatar -->
            <button class="topbar-user-btn" aria-label="User profile" id="topbar-user">
                ${icon(faCircleUser, 'topbar-user-icon')}
            </button>

        </div>
    </header>
    `;
}

/**
 * Bind topbar event listeners (call after injecting HTML into DOM).
 */
export function initTopbar() {
    // Theme buttons
    document.querySelectorAll('.topbar-theme-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            contextActions.setTheme(btn.dataset.theme);
        });
    });

    // Language buttons
    document.querySelectorAll('.topbar-lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            contextActions.setLang(btn.dataset.lang);
        });
    });
}
