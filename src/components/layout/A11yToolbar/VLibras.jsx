'use client';

import { useEffect } from 'react';

const VLIBRAS_ORIGIN = 'https://vlibras.gov.br/app';
const SCRIPT_ID = 'vlibras-plugin';

/**
 * Widget oficial do VLibras (gov.br). O script só é carregado na primeira vez
 * que o recurso está ligado; desligar apenas oculta o widget (data-vlibras="off").
 * @param {{ enabled: boolean }} props
 */
export function VLibras({ enabled }) {
  useEffect(() => {
    if (!enabled || document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `${VLIBRAS_ORIGIN}/vlibras-plugin.js`;
    script.async = true;
    script.onload = () => {
      // @ts-ignore — objeto global criado pelo script do VLibras
      new window.VLibras.Widget(VLIBRAS_ORIGIN);
      // O widget se inicializa no evento load da janela, que já passou numa navegação SPA.
      if (typeof window.onload === 'function') window.onload(new Event('load'));
    };
    document.body.appendChild(script);
  }, [enabled]);

  return (
    // Marcação exigida pelo VLibras (atributos vw-*).
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
