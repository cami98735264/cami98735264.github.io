/**
 * TypeScript mirror of design tokens defined in src/styles/tokens.css.
 * Returns CSS var() references — zero runtime cost, full type safety
 * when consumed by React components or inline styles.
 *
 * Source of truth is tokens.css. Keep this file in sync manually.
 */

export const theme = {
  color: {
    ink: "var(--color-ink)",
    inkSoft: "var(--color-ink-soft)",
    inkRule: "var(--color-ink-rule)",
    paper: "var(--color-paper)",
    paperSoft: "var(--color-paper-soft)",
    paperMute: "var(--color-paper-mute)",
    accent: "var(--color-accent)",
    accentInk: "var(--color-accent-ink)",
    success: "var(--color-success)",
    danger: "var(--color-danger)",
  },
  space: {
    "2xs": "var(--space-2xs)",
    xs: "var(--space-xs)",
    sm: "var(--space-sm)",
    md: "var(--space-md)",
    lg: "var(--space-lg)",
    xl: "var(--space-xl)",
    "2xl": "var(--space-2xl)",
    "3xl": "var(--space-3xl)",
    "4xl": "var(--space-4xl)",
    "5xl": "var(--space-5xl)",
    "6xl": "var(--space-6xl)",
  },
  font: {
    display: "var(--font-display)",
    body: "var(--font-body)",
    mono: "var(--font-mono)",
  },
  fontSize: {
    display: "var(--fs-display)",
    h1: "var(--fs-h1)",
    h2: "var(--fs-h2)",
    h3: "var(--fs-h3)",
    body: "var(--fs-body)",
    small: "var(--fs-small)",
    caption: "var(--fs-caption)",
    mono: "var(--fs-mono)",
  },
  fontWeight: {
    light: "var(--fw-light)",
    regular: "var(--fw-regular)",
    medium: "var(--fw-medium)",
    semibold: "var(--fw-semibold)",
    bold: "var(--fw-bold)",
  },
  lineHeight: {
    tight: "var(--lh-tight)",
    snug: "var(--lh-snug)",
    base: "var(--lh-base)",
    loose: "var(--lh-loose)",
  },
  tracking: {
    tight: "var(--tracking-tight)",
    normal: "var(--tracking-normal)",
    wide: "var(--tracking-wide)",
    eyebrow: "var(--tracking-eyebrow)",
  },
  radius: {
    none: "var(--radius-none)",
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    pill: "var(--radius-pill)",
  },
  shadow: {
    rule: "var(--shadow-rule)",
    lift: "var(--shadow-lift)",
    glow: "var(--shadow-glow)",
  },
  duration: {
    instant: "var(--dur-instant)",
    fast: "var(--dur-fast)",
    base: "var(--dur-base)",
    slow: "var(--dur-slow)",
    reveal: "var(--dur-reveal)",
  },
  easing: {
    out: "var(--ease-out)",
    inOut: "var(--ease-in-out)",
    spring: "var(--ease-spring)",
  },
  zIndex: {
    base: "var(--z-base)",
    grain: "var(--z-grain)",
    content: "var(--z-content)",
    nav: "var(--z-nav)",
    modal: "var(--z-modal)",
  },
  container: {
    prose: "var(--container-prose)",
    narrow: "var(--container-narrow)",
    wide: "var(--container-wide)",
    full: "var(--container-full)",
  },
} as const;

export const breakpoints = {
  sm: 640,
  md: 900,
  lg: 1200,
  xl: 1600,
} as const;

export const mediaQuery = {
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  reducedMotion: `(prefers-reduced-motion: reduce)`,
} as const;

export type Theme = typeof theme;
