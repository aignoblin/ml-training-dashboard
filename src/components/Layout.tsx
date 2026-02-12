import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Upload, BarChart3, Activity } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { themeConfig, theme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Upload, label: 'Upload & Train' },
    { path: '/metrics', icon: BarChart3, label: 'Metrics' },
  ];

  return (
    <div className={`min-h-screen ${themeConfig.bg} ${theme === 'terminal' ? 'terminal-text' : ''}`}>
      {/* Header */}
      <header className={`${themeConfig.card} ${themeConfig.cardBorder} border-b px-6 py-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className={`w-8 h-8 ${themeConfig.accent}`} />
            <h1 className={`text-xl font-bold ${themeConfig.text}`}>
              {theme === 'terminal' ? '> ML_TRAINING_SYS' : 'ML Training Dashboard'}
            </h1>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      {/* Navigation */}
      <nav className={`${themeConfig.card} border-b ${themeConfig.cardBorder} px-6 py-2`}>
        <div className="max-w-7xl mx-auto flex gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? `${themeConfig.primary}`
                    : `${themeConfig.textMuted} hover:${themeConfig.text}`
                }`}
              >
                <Icon className="w-4 h-4" />
                {theme === 'terminal' ? `[${item.label.toUpperCase()}]` : item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className={`${themeConfig.textMuted} text-center py-4 text-sm`}>
        {theme === 'terminal' 
          ? '// ML Training Dashboard v1.0 | STATUS: OPERATIONAL' 
          : 'ML Training Dashboard • Built for Petr'}
      </footer>
    </div>
  );
}
