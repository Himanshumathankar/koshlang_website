import { type SVGProps } from 'react'

/* Coherent line-icon system: 24px grid, 1.5px stroke, round caps/joins.
   Includes KoshLang-specific glyphs (kosh file, compiler, package, module,
   terminal, playground, version) alongside generic UI icons. No emoji. */

export type IconName =
  | 'kosh'
  | 'compiler'
  | 'package'
  | 'module'
  | 'terminal'
  | 'docs'
  | 'playground'
  | 'version'
  | 'search'
  | 'sun'
  | 'moon'
  | 'system'
  | 'github'
  | 'download'
  | 'copy'
  | 'check'
  | 'play'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'arrow-right'
  | 'external'
  | 'menu'
  | 'close'
  | 'command'
  | 'book'
  | 'bolt'
  | 'shield'
  | 'sparkles'
  | 'grid'
  | 'cpu'
  | 'refresh'
  | 'share'
  | 'alert'
  | 'info'
  | 'warning'
  | 'spinner'
  | 'file'
  | 'branch'
  | 'users'
  | 'map'

const P: Record<IconName, string> = {
  kosh: 'M8 8 4 12l4 4M16 8l4 4-4 4M13 6l-2 12',
  compiler: 'M4 7h16M4 12h10M4 17h7M17 13l3 3-3 3',
  package: 'M12 3 3 7.5v9L12 21l9-4.5v-9L12 3ZM3 7.5 12 12l9-4.5M12 12v9',
  module: 'M4 5h7v7H4zM13 5h7v7h-7zM8.5 12v5M15 12v5M8.5 17h6.5',
  terminal: 'M4 5h16v14H4zM7 9l3 3-3 3M13 15h4',
  docs: 'M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7',
  playground: 'M5 4h14v13H5zM9 21h6M12 17v4M9.5 8v5l4-2.5z',
  version: 'M12 3v6m0 6v6M6 6l3 3m6 6 3 3M3 12h6m6 0h6',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4',
  sun: 'M12 5V3M12 21v-2M5 12H3M21 12h-2M6 6 4.5 4.5M19.5 19.5 18 18M18 6l1.5-1.5M4.5 19.5 6 18M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z',
  system: 'M4 5h16v11H4zM9 20h6M12 16v4',
  github:
    'M12 3a9 9 0 0 0-2.8 17.5c.4.1.6-.2.6-.4v-1.7c-2.5.5-3-1.2-3-1.2-.4-1-1-1.3-1-1.3-.8-.5 0-.5 0-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.4 0-1 .3-1.8.9-2.4-.1-.3-.4-1.2.1-2.4 0 0 .7-.2 2.4.9a8.3 8.3 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.4.6.6.9 1.4.9 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.9.6 1.8v2.6c0 .2.2.5.6.4A9 9 0 0 0 12 3Z',
  download: 'M12 3v12m0 0 4-4m-4 4-4-4M4 19h16',
  copy: 'M9 9h10v10H9zM5 15H4V5h10v1',
  check: 'M5 12.5 10 17l9-10',
  play: 'M8 5v14l11-7z',
  'chevron-down': 'm6 9 6 6 6-6',
  'chevron-right': 'm9 6 6 6-6 6',
  'chevron-left': 'm15 6-6 6 6 6',
  'arrow-right': 'M4 12h16m0 0-6-6m6 6-6 6',
  external: 'M14 5h5v5M19 5l-9 9M12 5H5v14h14v-7',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  command:
    'M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z',
  book: 'M4 5c2-1 5-1 8 0v14c-3-1-6-1-8 0zM12 5c2-1 5-1 8 0v14c-3-1-6-1-8 0',
  bolt: 'M13 3 5 13h6l-1 8 8-10h-6z',
  shield: 'M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z',
  sparkles: 'M12 4l1.5 4L18 9.5 13.5 11 12 15l-1.5-4L6 9.5 10.5 8zM18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  cpu: 'M7 7h10v10H7zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4',
  refresh: 'M20 11a8 8 0 0 0-14-4L4 9m0-5v5h5M4 13a8 8 0 0 0 14 4l2-2m0 5v-5h-5',
  share: 'M17 7a2.5 2.5 0 1 0 0-.1M7 12a2.5 2.5 0 1 0 0 .1M17 17a2.5 2.5 0 1 0 0 .1M9 11l6-3.5M9 13l6 3.5',
  alert: 'M10.3 4.3 2.5 18a1.5 1.5 0 0 0 1.3 2.3h16.4a1.5 1.5 0 0 0 1.3-2.3L13.7 4.3a1.5 1.5 0 0 0-2.6 0ZM12 9v4M12 17h.01',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 11v5M12 8h.01',
  warning:
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 8v5M12 16h.01',
  spinner: 'M12 3a9 9 0 1 0 9 9',
  file: 'M6 3h9l4 4v14H6zM15 3v4h4',
  branch: 'M6 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 4v8m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0c0 4-6 3-6 8',
  users:
    'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a5 5 0 0 1 10 0M16 11a3 3 0 1 0-1-5.8M15 20h6a5 5 0 0 0-3-4.6',
  map: 'M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Zm0 0v14m6-12v14',
}

type Props = SVGProps<SVGSVGElement> & {
  name: IconName
  size?: number
  filled?: boolean
}

export function Icon({ name, size = 20, filled, className, ...rest }: Props) {
  const solid = filled || name === 'play'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? 'currentColor' : 'none'}
      stroke={solid ? 'none' : 'currentColor'}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d={P[name]} />
    </svg>
  )
}
