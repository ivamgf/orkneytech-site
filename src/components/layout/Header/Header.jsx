'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MAIN_NAV } from '@/content/site';
import { ButtonLink } from '@/components/ui/Button/Button';
import styles from './Header.module.css';

/** @param {string} pathname @param {string} href */
function isCurrent(pathname, href) {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return href === '/' ? normalized === '/' : normalized.startsWith(href);
}

export function Header() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(/** @type {HTMLButtonElement | null} */ (null));

  useEffect(() => {
    if (!open) return undefined;
    /** @param {KeyboardEvent} event */
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <Link className={styles.brand} href="/">
          <Image src="/brand/orkneytech-esfera.png" alt="" width={40} height={40} priority />
          Orkneytech
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
        <nav
          id="menu-principal"
          aria-label="Principal"
          className={`${styles.nav} ${open ? styles.open : ''}`}
        >
          <ul>
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink href="/contato/" variant="accent" className={styles.cta}>
          Fale com um consultor
        </ButtonLink>
      </div>
    </header>
  );
}
