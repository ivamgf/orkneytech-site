'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  DEFAULT_PREFERENCES,
  FONT_STEPS,
  ZOOM_STEPS,
  fontPercent,
  stepPreference,
  zoomPercent,
} from '@/domain/a11yPreferences';
import { a11yStore } from '@/lib/a11y/store';
import { VLibras } from './VLibras';
import styles from './A11yToolbar.module.css';

const PANEL_ID = 'ferramentas-acessibilidade';

/**
 * Botão fixo "Acessibilidade" + painel não modal (padrão APG Disclosure):
 * tamanho do texto, zoom, alto contraste e VLibras.
 */
export function A11yToolbar() {
  const prefs = useSyncExternalStore(a11yStore.subscribe, a11yStore.getSnapshot, a11yStore.getServerSnapshot);
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const openerRef = useRef(/** @type {HTMLButtonElement | null} */ (null));
  const titleRef = useRef(/** @type {HTMLHeadingElement | null} */ (null));

  useEffect(() => {
    if (!open) return undefined;
    titleRef.current?.focus();
    /** @param {KeyboardEvent} event Esc fecha o painel e devolve o foco ao botão (APG Disclosure). */
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      openerRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    openerRef.current?.focus();
  };

  /** @param {import('@/domain/a11yPreferences').A11yPreferences} next @param {string} message */
  const update = (next, message) => {
    a11yStore.set(next);
    setAnnouncement(message);
  };

  /** @param {'font'|'zoom'} key @param {1|-1} delta */
  const step = (key, delta) => {
    const next = stepPreference(prefs, key, delta);
    const label = key === 'font' ? `Tamanho do texto: ${fontPercent(next)}%` : `Zoom: ${zoomPercent(next)}%`;
    update(next, label);
  };

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        className={styles.opener}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4" r="2" fill="currentColor" />
          <path
            d="M4 8.5 12 10l8-1.5M12 10v5m0 0-3.5 6.5M12 15l3.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.label}>Acessibilidade</span>
      </button>

      <section id={PANEL_ID} className={styles.panel} aria-labelledby={`${PANEL_ID}-titulo`} hidden={!open}>
        <button
          type="button"
          className={styles.close}
          aria-label="Fechar ferramentas de acessibilidade"
          onClick={close}
        >
          <span aria-hidden="true">×</span>
        </button>
        <h2 id={`${PANEL_ID}-titulo`} ref={titleRef} tabIndex={-1} className={styles.title}>
          Ferramentas de acessibilidade
        </h2>

        <fieldset className={styles.group}>
          <legend>Tamanho do texto</legend>
          <div className={styles.row}>
            <button
              type="button"
              aria-label="Diminuir texto"
              disabled={prefs.font === 0}
              onClick={() => step('font', -1)}
            >
              A−
            </button>
            <span className={styles.value}>{fontPercent(prefs)}%</span>
            <button
              type="button"
              aria-label="Aumentar texto"
              disabled={prefs.font === FONT_STEPS.length - 1}
              onClick={() => step('font', 1)}
            >
              A+
            </button>
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend>Zoom da página</legend>
          <div className={styles.row}>
            <button
              type="button"
              aria-label="Diminuir zoom"
              disabled={prefs.zoom === 0}
              onClick={() => step('zoom', -1)}
            >
              −
            </button>
            <span className={styles.value}>{zoomPercent(prefs)}%</span>
            <button
              type="button"
              aria-label="Aumentar zoom"
              disabled={prefs.zoom === ZOOM_STEPS.length - 1}
              onClick={() => step('zoom', 1)}
            >
              +
            </button>
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend>Contraste</legend>
          <div className={styles.row}>
            <button
              type="button"
              aria-pressed={prefs.contrast}
              onClick={() =>
                update(
                  { ...prefs, contrast: !prefs.contrast },
                  prefs.contrast ? 'Alto contraste desativado' : 'Alto contraste ativado',
                )
              }
            >
              Alto contraste
            </button>
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend>Libras</legend>
          <div className={styles.row}>
            <button
              type="button"
              aria-pressed={prefs.vlibras}
              onClick={() =>
                update(
                  { ...prefs, vlibras: !prefs.vlibras },
                  prefs.vlibras ? 'VLibras oculto' : 'VLibras exibido',
                )
              }
            >
              Mostrar VLibras
            </button>
          </div>
          <p className={styles.note}>O tradutor VLibras (gov.br) aparece no canto direito da tela.</p>
        </fieldset>

        <button
          type="button"
          className={styles.reset}
          onClick={() => update(DEFAULT_PREFERENCES, 'Configurações de acessibilidade restauradas')}
        >
          Restaurar padrão
        </button>
        <p className={styles.note}>Suas escolhas ficam salvas neste navegador.</p>
      </section>

      <div role="status" aria-live="polite" className="visually-hidden">
        {announcement}
      </div>

      <VLibras enabled={prefs.vlibras} />
    </>
  );
}
