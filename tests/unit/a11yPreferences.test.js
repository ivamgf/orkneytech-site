import { describe, expect, it } from 'vitest';
import {
  DEFAULT_PREFERENCES,
  FONT_STEPS,
  ZOOM_STEPS,
  fontPercent,
  normalizePreferences,
  stepPreference,
  zoomPercent,
} from '@/domain/a11yPreferences';

describe('preferências de acessibilidade', () => {
  it('usa o padrão quando o armazenamento está vazio ou corrompido', () => {
    expect(normalizePreferences(null)).toEqual(DEFAULT_PREFERENCES);
    expect(normalizePreferences('lixo')).toEqual(DEFAULT_PREFERENCES);
    expect(normalizePreferences({ font: 'x', zoom: 99, contrast: 'sim' })).toEqual({
      ...DEFAULT_PREFERENCES,
      zoom: ZOOM_STEPS.length - 1,
    });
  });

  it('aumenta e diminui sem sair dos limites', () => {
    let prefs = DEFAULT_PREFERENCES;
    prefs = stepPreference(prefs, 'font', -1);
    expect(fontPercent(prefs)).toBe(100);
    for (let i = 0; i < 10; i += 1) prefs = stepPreference(prefs, 'font', 1);
    expect(fontPercent(prefs)).toBe(FONT_STEPS.at(-1));
    expect(zoomPercent(stepPreference(prefs, 'zoom', 1))).toBe(125);
  });

  it('mantém a escolha de ocultar o VLibras', () => {
    expect(normalizePreferences({ vlibras: false }).vlibras).toBe(false);
  });
});
