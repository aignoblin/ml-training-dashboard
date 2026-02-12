import { useTheme } from '../contexts/ThemeContext';
import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export function StatCard({ title, value, subtitle, icon, trend, trendValue }: StatCardProps) {
  const { themeConfig, theme } = useTheme();

  const trendColors = {
    up: themeConfig.success,
    down: themeConfig.error,
    neutral: themeConfig.textMuted,
  };

  const trendSymbols = {
    up: theme === 'terminal' ? '↑' : '↑',
    down: theme === 'terminal' ? '↓' : '↓',
    neutral: theme === 'terminal' ? '→' : '→',
  };

  return (
    <div className={`${themeConfig.card} ${themeConfig.cardBorder} rounded-xl p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${themeConfig.textMuted}`}>
            {theme === 'terminal' ? `// ${title.toUpperCase()}` : title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${themeConfig.text}`}>
            {theme === 'terminal' ? `> ${value}` : value}
          </p>
          {subtitle && (
            <p className={`text-sm mt-1 ${themeConfig.textMuted}`}>
              {subtitle}
            </p>
          )}
          {trend && trendValue && (
            <p className={`text-sm mt-2 flex items-center gap-1 ${trendColors[trend]}`}>
              <span>{trendSymbols[trend]}</span>
              <span>{trendValue}</span>
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${themeConfig.progressBg}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
