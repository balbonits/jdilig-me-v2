import type { ReactElement } from 'react';

type IconName = 'arrow' | 'external' | 'copy' | 'check' | 'mail' | 'sun' | 'moon' | 'download';

const paths: Record<IconName, ReactElement> = {
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />,
  copy: <path d="M8 8h12v12H8zM4 16V4h12" />,
  check: <path d="M4 12l5 5L20 6" />,
  mail: <path d="M3 5h18v14H3zM3 6l9 7 9-7" />,
  sun: <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />,
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" />,
  download: <path d="M12 3v12M6 10l6 6 6-6M4 21h16" />,
};

export function Icon({ name, small, className }: { name: IconName; small?: boolean; className?: string }) {
  const cls = ['s-ico', small ? 's-ico--sm' : '', className || ''].filter(Boolean).join(' ');
  return (
    <svg className={cls} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}

// 7 x 7 stand-in pixel mark from the style guide (John's real logo file is not available yet).
const PIXELS: [number, number][] = [
  [2, 0], [3, 0], [4, 0], [1, 1], [5, 1], [0, 2], [1, 2], [3, 2], [5, 2], [6, 2],
  [0, 3], [3, 3], [6, 3], [0, 4], [1, 4], [3, 4], [5, 4], [6, 4], [1, 5], [5, 5],
  [2, 6], [3, 6], [4, 6],
];

/** Pixel mark at an integer scale (CSS px per logo pixel). Decorative. */
export function PixelMark({ scale = 4 }: { scale?: number }) {
  const size = 7 * scale;
  return (
    <svg width={size} height={size} viewBox="0 0 7 7" shapeRendering="crispEdges" fill="var(--c-pixel)" aria-hidden="true" focusable="false">
      {PIXELS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  );
}

/** Small pixel "play" glyph for the Playground slot. Decorative. */
export function PixelPlay() {
  const px: [number, number][] = [[0, 0], [0, 1], [1, 1], [0, 2], [1, 2], [2, 2], [0, 3], [1, 3], [2, 3], [3, 3], [0, 4], [1, 4], [2, 4], [0, 5], [1, 5], [0, 6]];
  return (
    <svg width={28} height={28} viewBox="-1.5 0 7 7" shapeRendering="crispEdges" fill="var(--c-pixel)" aria-hidden="true" focusable="false">
      {px.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  );
}
