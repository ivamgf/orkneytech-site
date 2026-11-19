import {
  DEFAULT_PREFERENCES,
  STORAGE_KEY,
  fontPercent,
  normalizePreferences,
  zoomPercent,
} from '@/domain/a11yPreferences';

/** Loja das preferências de acessibilidade (para useSyncExternalStore). */

/** @type {import('@/domain/a11yPreferences').A11yPreferences | null} */
let current = null;
const listeners = new Set();

function read() {
  try {
    return normalizePreferences(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null'));
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

/** @param {import('@/domain/a11yPreferences').A11yPreferences} prefs */
export function applyToDocument(prefs) {
  const root = document.documentElement;
  root.style.setProperty('--a11y-font', `${fontPercent(prefs)}%`);
  root.style.setProperty('--a11y-zoom', String(zoomPercent(prefs) / 100));
  if (prefs.contrast) root.dataset.contrast = 'high';
  else delete root.dataset.contrast;
  root.dataset.vlibras = prefs.vlibras ? 'on' : 'off';
}

export const a11yStore = {
  /** @param {() => void} listener */
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    current ??= read();
    return current;
  },
  getServerSnapshot() {
    return DEFAULT_PREFERENCES;
  },
  /** @param {import('@/domain/a11yPreferences').A11yPreferences} next */
  set(next) {
    current = normalizePreferences(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {
      // Armazenamento indisponível (modo privado etc.): a preferência vale só nesta visita.
    }
    applyToDocument(current);
    listeners.forEach((listener) => listener());
  },
};
