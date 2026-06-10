
/**
 * Get the area page title in the current language.
 * @param {string} area
 * @param {string} lang
 * @param {Array} MENU_ITEMS
 * @returns {string}
 */
function getAreaTitle(area, lang, MENU_ITEMS) {
    const item = MENU_ITEMS.find((m) => m.key === area);
    if (!item) return area;
    return lang === 'es' ? item.labelEs : item.labelEn;
}