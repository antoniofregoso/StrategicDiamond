import { signal, effect, computed } from '@preact/signals';
import initialStateJson from './state.json';

const INITIAL_STATE = initialStateJson;
const STORAGE_KEY = 'dashboard_state';

function loadInitialState() {
    const localData = localStorage.getItem(STORAGE_KEY);

    // CASE 1: First visit
    if (!localData) {
        const newState = JSON.parse(JSON.stringify(INITIAL_STATE));
        newState.meta.start = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        return newState;
    }

    const savedState = JSON.parse(localData);
    const sessionStarted = savedState.meta?.start > 0;

    // CASE 2: Return after 24 h — reset session but keep preferences
    if (sessionStarted) {
        const EXPIRATION_LIMIT = 24 * 60 * 60 * 1000;
        if (Date.now() - savedState.meta.start > EXPIRATION_LIMIT) {
            const newState = JSON.parse(JSON.stringify(INITIAL_STATE));
            // Preserve user preferences (theme, lang, sidebar)
            newState.context.theme            = savedState.context?.theme            ?? INITIAL_STATE.context.theme;
            newState.context.lang             = savedState.context?.lang             ?? INITIAL_STATE.context.lang;
            newState.context.sidebar_expanded = savedState.context?.sidebar_expanded ?? INITIAL_STATE.context.sidebar_expanded;
            newState.meta.start = Date.now();
            return newState;
        }
    }

    // CASE 3: Return before 24 h — restore full state
    return savedState;
}

// ── Signal ────────────────────────────────────────────────────────────────────
export const appSignal = signal(loadInitialState());

// ── Auto-persist to localStorage ──────────────────────────────────────────────
effect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appSignal.value));
});

// ── Computed selectors ────────────────────────────────────────────────────────
export const currentTheme       = computed(() => appSignal.value.context.theme);
export const currentLang        = computed(() => appSignal.value.context.lang);
export const isSidebarExpanded  = computed(() => appSignal.value.context.sidebar_expanded);
export const activeArea         = computed(() => appSignal.value.context.active_area);
