import { ReactNode } from 'react';
import SidebarPlaceholder from '../Sidebar/SidebarPlaceholder';

type Route = 'dashboard' | 'training' | '1v1' | 'playground' | 'signup' | null;

interface LayoutProps {
  children: ReactNode;
  currentRoute: Route;
  onRouteChange: (route: Route) => void;
}

export default function Layout({ children, currentRoute, onRouteChange }: LayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar - Placeholder until real sidebar is ready */}
      <div className="flex shrink-0">
        <SidebarPlaceholder currentRoute={currentRoute} onRouteChange={onRouteChange} />
      </div>

      {/* Main Content Area - where remotes render */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

