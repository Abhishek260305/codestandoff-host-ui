import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

/**
 * ============================================================================
 * LAYOUT COMPONENT - MFE HOST WRAPPER
 * ============================================================================
 * 
 * This component wraps ALL micro-frontends and ensures consistent theming.
 * 
 * IMPORTANT: Uses design tokens from styles/design-tokens.css
 * - bg-bg-primary: Main background color (auto-switches with .dark class)
 * - All MFEs rendered inside inherit the theme context
 * 
 * ❌ FORBIDDEN: bg-white, bg-black, bg-gray-* 
 * ✅ REQUIRED: bg-bg-primary, bg-bg-secondary (token-based classes)
 * ============================================================================
 */

// Dynamically import AppSidebar with SSR disabled to avoid router issues
const AppSidebar = dynamic(() => import('../Sidebar/AppSidebar'), { ssr: false });

type Route = 'dashboard' | 'training' | '1v1' | 'playground' | null;

interface LayoutProps {
  children: ReactNode;
  currentRoute: Route;
}

export default function Layout({ children, currentRoute }: LayoutProps) {
  return (
    <div 
      className="h-screen flex overflow-hidden transition-colors duration-150"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Sidebar */}
      <div className="flex shrink-0">
        <AppSidebar currentRoute={currentRoute} />
      </div>

      {/* Main Content Area - where MFEs render */}
      <main 
        className="flex-1 overflow-y-auto transition-colors duration-150"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
