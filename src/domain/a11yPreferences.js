/** Preferências das ferramentas de acessibilidade (lógica pura, sem DOM). */

export const FONT_STEPS = Object.freeze([100, 112.5, 125, 150, 175, 200]);
export const ZOOM_STEPS = Object.freeze([100, 125, 150, 175, 200]);
export const STORAGE_KEY = 'orkneytech:a11y';

/** @typedef {{ font: number, zoom: number, contrast: boolean, vlibras: boolean }} A11yPreferences */

/** @type {A11yPreferences} */
export const DEFAULT_PREFERENCES = Object.freeze({ font: 0, zoom: 0, contrast: false, vlibras: true });

/** @param {number} value @param {number} max */
const clampIndex = (value, max) => (Number.isInteger(value) ? Math.min(Math.max(value, 0), max) : 0);

/**
 * Normaliza um objeto vindo do armazenamento (pode estar corrompido ou ser antigo).
 * @param {unknown} raw
 * @returns {A11yPreferences}
 */
export function normalizePreferences(raw) {
  const value = raw && typeof raw === 'object' ? /** @type {Record<string, unknown>} */ (raw) : {};
  return {
    font: clampIndex(Number(value.font), FONT_STEPS.length - 1),
    zoom: clampIndex(Number(value.zoom), ZOOM_STEPS.length - 1),
    contrast: value.contrast === true,
    vlibras: typeof value.vlibras === 'boolean' ? value.vlibras : DEFAULT_PREFERENCES.vlibras,
  };
}

/**
 * @param {A11yPreferences} prefs
 * @param {'font'|'zoom'} key
 * @param {1|-1} delta
 * @returns {A11yPreferences}
 */
export function stepPreference(prefs, key, delta) {
  return normalizePreferences({ ...prefs, [key]: prefs[key] + delta });
}

/** @param {A11yPreferences} prefs */
export const fontPercent = (prefs) => FONT_STEPS[prefs.font];

/** @param {A11yPreferences} prefs */
export const zoomPercent = (prefs) => ZOOM_STEPS[prefs.zoom];
