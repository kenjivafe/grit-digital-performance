// Responsive utility functions and breakpoints for sports organization websites

export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Media query helpers
export const mediaQuery = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
  
  // Max-width queries
  smMax: `(max-width: ${breakpoints.md})`,
  mdMax: `(max-width: ${breakpoints.lg})`,
  lgMax: `(max-width: ${breakpoints.xl})`,
  xlMax: `(max-width: ${breakpoints['2xl']})`,
} as const;

// Responsive spacing utilities for sports content
export const spacing = {
  // Content sections
  section: {
    mobile: '4rem',
    tablet: '6rem',
    desktop: '8rem',
  },
  
  // Card layouts
  card: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
  },
  
  // Hero sections
  hero: {
    mobile: '3rem',
    tablet: '5rem',
    desktop: '7rem',
  },
} as const;

// Grid systems for portfolio and event layouts
export const gridConfigs = {
  portfolio: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-2',
    desktop: 'grid-cols-3',
    large: 'grid-cols-4',
  },
  
  events: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-2',
    desktop: 'grid-cols-3',
  },
  
  services: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-2',
    desktop: 'grid-cols-2',
    large: 'grid-cols-3',
  },
} as const;

// Responsive typography scale for sports branding
export const typography = {
  hero: {
    mobile: 'text-4xl',
    tablet: 'text-5xl',
    desktop: 'text-6xl',
    large: 'text-7xl',
  },
  
  heading: {
    mobile: 'text-2xl',
    tablet: 'text-3xl',
    desktop: 'text-4xl',
  },
  
  subheading: {
    mobile: 'text-xl',
    tablet: 'text-2xl',
    desktop: 'text-3xl',
  },
  
  body: {
    mobile: 'text-base',
    tablet: 'text-lg',
    desktop: 'text-lg',
  },
} as const;

// Device detection utilities
export const isDevice = {
  mobile: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < parseInt(breakpoints.md);
  },
  
  tablet: () => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    return width >= parseInt(breakpoints.md) && width < parseInt(breakpoints.lg);
  },
  
  desktop: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= parseInt(breakpoints.lg);
  },
} as const;

// Responsive image sizes for sports content
export const imageSizes = {
  hero: {
    mobile: '640px',
    tablet: '1024px',
    desktop: '1920px',
  },
  
  portfolio: {
    mobile: '400px',
    tablet: '600px',
    desktop: '800px',
  },
  
  thumbnail: {
    mobile: '200px',
    tablet: '300px',
    desktop: '400px',
  },
} as const;

// Animation breakpoints for performance optimization
export const animationBreakpoints = {
  reduced: '(prefers-reduced-motion: reduce)',
  noPref: '(prefers-reduced-motion: no-preference)',
} as const;

// Container configurations for different content types
export const containers = {
  default: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  narrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  wide: 'max-w-full mx-auto px-4 sm:px-6 lg:px-8',
  fluid: 'w-full mx-auto px-4 sm:px-6 lg:px-8',
} as const;
