import { icon, faChartLine, faUsers, faFolder, faGear, faBars, faChevronLeft } from './icon.js';
import { contextActions } from '../store/actions/index.js';
import { appSignal } from '../store/appStore.js';
import { t } from '../../i18n/translations.js';

/**
 * ── MENU CONFIG ─────────────────────────────────────────────────────────────
 * Easy to customize: change icon, labelEn, labelEs here.
 */
export const MENU_ITEMS = [
    { key: 'area1', icon: faChartLine, labelEn: 'Area 1', labelEs: 'Área 1', url: '/dashboard/area1' },
    { key: 'area2', icon: faUsers, labelEn: 'Area 2', labelEs: 'Área 2', url: '/dashboard/area2' },
    { key: 'area3', icon: faFolder, labelEn: 'Area 3', labelEs: 'Área 3', url: '/dashboard/area3' },
    { key: 'area4', icon: faGear, labelEn: 'Area 4', labelEs: 'Área 4', url: '/dashboard/area4' },
];

/**
 * Render the sidebar HTML string.
 */
export function renderSidebar(lang, expanded, activeArea) {
    const menuItems = MENU_ITEMS.map((item) => {
        const label = lang === 'es' ? item.labelEs : item.labelEn;
        const isActive = item.key === activeArea;

        return `
        <li class="sidebar-item ${isActive ? 'sidebar-item--active' : ''}" data-tooltip="${label}">
            <a
                href="#"
                class="sidebar-link"
                data-area="${item.key}"
                aria-label="${label}"
                aria-current="${isActive ? 'page' : 'false'}"
            >
                <span class="sidebar-icon" aria-hidden="true">
                    ${icon(item.icon, 'sidebar-svg-icon')}
                </span>
                <span class="sidebar-label ${expanded ? '' : 'sidebar-label--hidden'}">
                    ${label}
                </span>
            </a>
        </li>
        `;
    }).join('');

    return `
    <aside id="dashboard-sidebar" class="sidebar ${expanded ? 'sidebar--expanded' : 'sidebar--collapsed'}" aria-label="Sidebar navigation">

        <!-- ── Header: logo + app name + toggle ───────────────── -->
        <div class="sidebar-header">
            <span class="sidebar-logo ${expanded ? '' : 'sidebar-logo--hidden'}">
                <img
                    src="/logo.png"
                    alt="App logo"
                    class="sidebar-logo-img"
                    style="width: 24px; height: 24px; border-radius: 4px;"
                />
                <span class="sidebar-app-name">
                    ${t('sidebar.app_name', lang)}
                </span>
            </span>
            <button
                id="sidebar-toggle"
                class="sidebar-toggle-btn"
                aria-label="${expanded ? 'Collapse sidebar' : 'Expand sidebar'}"
                aria-expanded="${expanded}"
                aria-controls="dashboard-sidebar"
                title="${expanded ? 'Collapse' : 'Expand'}"
            >
                ${expanded
            ? icon(faChevronLeft, 'sidebar-toggle-icon')
            : icon(faBars, 'sidebar-toggle-icon')
        }
            </button>
        </div>

        <!-- ── Navigation ─────────────────────────────────────── -->
        <nav class="sidebar-nav" aria-label="Main navigation">
            <ul class="sidebar-menu" role="list">
                ${menuItems}
            </ul>
        </nav>
    </aside>
    `;
}

// ── Floating tooltip (position:fixed — never clipped by sidebar overflow) ─────
let _tooltipEl = null;

function getTooltipEl() {
    if (!_tooltipEl) {
        _tooltipEl = document.createElement('div');
        _tooltipEl.id = 'sidebar-floating-tooltip';
        _tooltipEl.className = 'sidebar-floating-tooltip';
        document.body.appendChild(_tooltipEl);
    }
    return _tooltipEl;
}

function showTooltip(e) {
    const sidebar = document.getElementById('dashboard-sidebar');
    if (!sidebar?.classList.contains('sidebar--collapsed')) return;

    const li = e.currentTarget.closest('.sidebar-item');
    const label = li?.dataset.tooltip;
    if (!label) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const tip = getTooltipEl();

    tip.textContent = label;
    tip.style.top = `${rect.top + rect.height / 2}px`;
    tip.style.left = `${rect.right + 12}px`;
    tip.classList.add('sidebar-floating-tooltip--visible');
}

function hideTooltip() {
    _tooltipEl?.classList.remove('sidebar-floating-tooltip--visible');
}

/**
 * Bind sidebar event listeners (call after renderSidebar is injected into DOM).
 */
export function initSidebar(router) {
    // Toggle expand / collapse
    document.getElementById('sidebar-toggle')
        ?.addEventListener('click', () => contextActions.toggleSidebar());

    // Menu item navigation + tooltip
    document.querySelectorAll('.sidebar-link').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const area = link.dataset.area;
            contextActions.setActiveArea(area);
            router.navigate(`/dashboard/${area}`);
        });

        link.addEventListener('mouseenter', showTooltip);
        link.addEventListener('mouseleave', hideTooltip);
    });
}
