/** @type {import('tailwindcss').Config} */

/**
 * ============================================================================
 * TAILWIND CONFIG - MFE HOST APPLICATION
 * ============================================================================
 * 
 * This config maps CSS variables from design-tokens.css to Tailwind classes.
 * All MFEs inherit these mappings via Module Federation.
 * 
 * Usage in components:
 * - bg-bg-primary, bg-bg-secondary, bg-bg-tertiary
 * - text-text-primary, text-text-secondary, text-text-tertiary
 * - border-border-primary, border-border-secondary
 * - text-status-success, text-status-warning, text-status-error
 * 
 * ❌ FORBIDDEN: bg-white, bg-black, text-gray-*, border-gray-*
 * ✅ REQUIRED: Use token-based classes defined below
 * ============================================================================
 */

module.exports = {
  darkMode: 'class', // Theme switching via .dark class on <html>
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* =======================================================================
         * DESIGN TOKEN MAPPINGS
         * These map CSS variables to Tailwind classes
         * ======================================================================= */
        
        // Background colors - use: bg-bg-primary, bg-bg-secondary, etc.
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          hover: 'var(--bg-hover)',
          active: 'var(--bg-active)',
        },
        
        // Text colors - use: text-text-primary, text-text-secondary, etc.
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          disabled: 'var(--text-disabled)',
        },
        
        // Border colors - use: border-border-primary, border-border-secondary
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          hover: 'var(--border-hover)',
        },
        
        // Semantic/Status colors - use: text-status-success, bg-status-error, etc.
        status: {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          error: 'var(--color-error)',
          info: 'var(--color-info)',
        },
        
        // Input colors - use: bg-input-bg, border-input-border
        input: {
          bg: 'var(--input-bg)',
          border: 'var(--input-border)',
          focus: 'var(--input-focus-border)',
          placeholder: 'var(--input-placeholder)',
        },

        /* =======================================================================
         * LEGACY COLORS (for gradual migration)
         * TODO: Remove these after all components use tokens
         * ======================================================================= */
        primary: {
          '50': '#f0f9ff',
          '100': '#e0f2fe',
          '500': '#0ea5e9',
          '600': '#0284c7',
          '700': '#0369a1'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      
      /* Background color utilities with token names */
      backgroundColor: {
        'token-primary': 'var(--bg-primary)',
        'token-secondary': 'var(--bg-secondary)',
        'token-tertiary': 'var(--bg-tertiary)',
      },
    }
  },
  plugins: [],
};
