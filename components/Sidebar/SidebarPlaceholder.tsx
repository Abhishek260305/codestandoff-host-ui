import { useTheme } from '../../contexts/ThemeContext';
import { useAppSelector } from '../../store/hooks';

type Route = 'dashboard' | 'training' | '1v1' | 'playground' | null;

interface SidebarPlaceholderProps {
  onRouteChange: (route: Route) => void;
  currentRoute: Route;
}

export default function SidebarPlaceholder({ onRouteChange, currentRoute }: SidebarPlaceholderProps) {
  const { theme, toggleTheme } = useTheme();
  const user = useAppSelector((state) => state.user.currentUser);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  
  const menuItems = [
    { id: 'dashboard' as Route, label: 'Dashboard', icon: '📊' },
    { id: 'training' as Route, label: 'Training', icon: '📚' },
    { id: '1v1' as Route, label: '1v1', icon: '⚔️' },
    { id: 'playground' as Route, label: 'Playground', icon: '💻' },
  ];

  return (
    <div className="w-64 bg-gray-100 dark:bg-black text-gray-900 dark:text-white h-full flex flex-col transition-colors duration-200">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">CodeStandoff 2.0</h1>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Sidebar Placeholder</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onRouteChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentRoute === item.id
                ? 'bg-blue-500 dark:bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-900 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-neutral-800">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-black text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-neutral-900 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <>
              <span>☀️</span>
              <span className="text-sm font-medium">Light Mode</span>
            </>
          ) : (
            <>
              <span>🌙</span>
              <span className="text-sm font-medium">Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-neutral-800">
        <p className="text-xs text-gray-600 dark:text-gray-500 text-center">
          Sidebar component coming soon
        </p>
      </div>
    </div>
  );
}

