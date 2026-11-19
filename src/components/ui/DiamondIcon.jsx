/** Ícone decorativo em losango (motivo da esfera da marca). @param {{ className?: string }} props */
export function DiamondIcon({ className }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 4 44 24 24 44 4 24Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M24 14 34 24 24 34 14 24Z" fill="currentColor" opacity=".35" />
    </svg>
  );
}
