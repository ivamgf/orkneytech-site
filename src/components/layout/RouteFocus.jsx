'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Após uma navegação no cliente, move o foco para o h1 da nova página,
 * para que teclado e leitor de tela comecem do conteúdo novo.
 * (O route announcer do Next já anuncia o título.)
 */
export function RouteFocus() {
  const pathname = usePathname();
  const previous = useRef(pathname);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (window.location.hash) return; // links para âncoras mantêm o comportamento nativo
    document.querySelector('main h1')?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
