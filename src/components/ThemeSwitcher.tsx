import { useTheme, themeList, type ThemeVariant } from '../contexts/ThemeContext';
import { Palette } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, setTheme, themeConfig } = useTheme();

  return (
    <div className={`flex items-center gap-3 ${themeConfig.text}`}>
      <Palette className="w-5 h-5" />
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeVariant)}
        className={`px-3 py-2 rounded-lg ${themeConfig.input} ${themeConfig.text} border ${themeConfig.inputBorder} focus:outline-none focus:ring-2 transition-colors`}
      >
        {themeList.map((t) => (
          <option key={t.id} value={t.id} className="bg-gray-900 text-white">
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
