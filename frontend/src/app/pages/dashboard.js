import { effect } from '@preact/signals';
import { appSignal } from '../store/appStore.js';
import { contextActions } from '../store/actions/index.js';
import { renderSidebar, initSidebar, MENU_ITEMS } from '../components/sidebar.js';
import { renderTopbar, initTopbar } from '../components/topbar.js';
import { t } from '../../i18n/translations.js';
import { applyTheme, getAreaTitle } from '../utils';

// ── Track last rendered values to avoid redundant re-renders ──────────────────
let _lastLang = null;
let _lastTheme = null;
let _lastExpanded = null;
let _lastArea = null;
let _effectCleanup = null;


/**
 * Render the main content area HTML.
 * @param {string} area
 * @param {string} lang
 * @returns {string}
 */
function renderContent(area, lang) {
    const title = getAreaTitle(area, lang, MENU_ITEMS);
    const welcome = t('content.welcome', lang);
    const placeholder = t('content.placeholder', lang);

    return `
    <main id="dashboard-content" class="dash-content" role="main" aria-label="${title}">
        <div class="dash-content-inner">
            <div class="dash-content-hero">
                <p class="dash-content-welcome">${welcome}</p>
                <h2 class="dash-content-title">${title}</h2>
                <p class="dash-content-placeholder">${placeholder}</p>
            </div>
        </div>
    </main>
    `;
}

/**
 * Full dashboard render (sidebar + topbar + content).
 * Called on first load and whenever signal values change.
 */
function renderDashboard(lang, theme, expanded, area) {
    const pageTitle = getAreaTitle(area, lang, MENU_ITEMS);
    const appEl = document.getElementById('app');

    appEl.innerHTML = `
    <div class="dash-layout">
        ${renderSidebar(lang, expanded, area)}
        <div class="dash-main">
            ${renderTopbar(lang, theme, pageTitle)}
            ${renderContent(area, lang)}
        </div>
    </div>
    `;

    applyTheme(theme);

    // Listen for system theme changes when 'system' is selected
    if (theme === 'system') {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        mql.addEventListener('change', () => applyTheme('system'));
    }
}

/**
 * Patch only the components that changed (avoids full re-render flicker).
 */
function patchDashboard(lang, theme, expanded, area, prevLang, prevTheme, prevExpanded, prevArea) {
    const areaChanged = area !== prevArea;
    const langChanged = lang !== prevLang;
    const themeChanged = theme !== prevTheme;
    const expandedChanged = expanded !== prevExpanded;

    // If layout changes (sidebar expand), re-render everything
    if (expandedChanged) {
        renderDashboard(lang, theme, expanded, area);
        initSidebar(_router);
        initTopbar();
        return;
    }

    // Patch sidebar (active area or lang change)
    if (areaChanged || langChanged) {
        const sidebarEl = document.getElementById('dashboard-sidebar');
        if (sidebarEl) {
            sidebarEl.outerHTML = renderSidebar(lang, expanded, area);
            // Re-bind sidebar events after DOM replacement
            initSidebar(_router);
        }
    }

    // Patch topbar (theme, lang change)
    if (themeChanged || langChanged || areaChanged) {
        const topbarEl = document.getElementById('dashboard-topbar');
        const pageTitle = getAreaTitle(area, lang, MENU_ITEMS);
        if (topbarEl) {
            topbarEl.outerHTML = renderTopbar(lang, theme, pageTitle);
            initTopbar();
        }
    }

    // Patch content (area or lang change)
    if (areaChanged || langChanged) {
        const contentEl = document.getElementById('dashboard-content');
        if (contentEl) {
            contentEl.outerHTML = renderContent(area, lang);
        }
    }

    // Apply theme to <html>
    if (themeChanged) {
        applyTheme(theme);
    }
}

// Store router reference for sidebar navigation
let _router = null;

/**
 * Dashboard page callback — called by CJ Router.
 * @param {object} req    — router request object
 * @param {object} router — CJ Router instance
 */
export function dashboard(req, router) {
    _router = router;
    const areaFromUrl = req.params?.area;
    if (!MENU_ITEMS.some(item => item.key === areaFromUrl)) {
        if (areaFromUrl!=undefined) {return router.trigger404(req.pathname);}
    }
    if (areaFromUrl && areaFromUrl !== appSignal.value.context.active_area) {
        contextActions.setActiveArea(areaFromUrl);
    }

    const state = appSignal.value;
    const lang = state.context.lang;
    const theme = state.context.theme;
    const expanded = state.context.sidebar_expanded;
    const area = state.context.active_area;

    // ── Initial full render ───────────────────────────────────────────────────
    renderDashboard(lang, theme, expanded, area);
    initSidebar();
    initTopbar();

    // Track rendered values
    _lastLang = lang;
    _lastTheme = theme;
    _lastExpanded = expanded;
    _lastArea = area;

    // ── Cleanup previous effect if navigating back to this page ──────────────
    if (_effectCleanup) {
        _effectCleanup();
        _effectCleanup = null;
    }

    // ── Reactive effect: re-patch on any signal change ────────────────────────
    _effectCleanup = effect(() => {
        const s = appSignal.value;
        const newLang = s.context.lang;
        const newTheme = s.context.theme;
        const newExpanded = s.context.sidebar_expanded;
        const newArea = s.context.active_area;

        const changed =
            newLang !== _lastLang ||
            newTheme !== _lastTheme ||
            newExpanded !== _lastExpanded ||
            newArea !== _lastArea;

        if (!changed) return;

        patchDashboard(
            newLang, newTheme, newExpanded, newArea,
            _lastLang, _lastTheme, _lastExpanded, _lastArea
        );

        _lastLang = newLang;
        _lastTheme = newTheme;
        _lastExpanded = newExpanded;
        _lastArea = newArea;
    });
}