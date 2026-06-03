import { createSlice } from '@reduxjs/toolkit';

// Detect system preference
const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const savedTheme = localStorage.getItem('sd-theme') || 'system';
const savedCollapsed = localStorage.getItem('sd-sidebar-collapsed') === 'true';
const savedPage = localStorage.getItem('sd-current-page') || 'arenas';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: savedTheme,           // 'light' | 'dark' | 'system'
    resolvedTheme: savedTheme === 'system' ? getSystemTheme() : savedTheme,
    sidebarCollapsed: savedCollapsed,
    currentPage: savedPage,
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      state.resolvedTheme =
        action.payload === 'system' ? getSystemTheme() : action.payload;
      localStorage.setItem('sd-theme', action.payload);
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem('sd-sidebar-collapsed', state.sidebarCollapsed);
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
      localStorage.setItem('sd-current-page', action.payload);
    },
  },
});

export const { setTheme, toggleSidebar, setCurrentPage } = uiSlice.actions;
export default uiSlice.reducer;
