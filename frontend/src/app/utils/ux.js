
/**
 * Get the area page title in the current language.
 * @param {string} area
 * @param {string} lang
 * @param {Array} items
 * @returns {string}
 */
export function getAreaTitle(area, lang, items) {
    const item = items.find((m) => m.key === area);
    if (!item) return area;
    return lang === 'es' ? item.labelEs : item.labelEn;
}

