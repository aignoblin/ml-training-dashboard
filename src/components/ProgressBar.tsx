import { useTheme } from '../contexts/ThemeContext';

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  animated?: boolean;
  height?: string;
}

export function ProgressBar({ 
  progress, 
  showPercentage = true, 
  animated = true,
  height = 'h-4' 
}: ProgressBarProps) {
  const { themeConfig, theme } = useTheme();

  return (
    <div className="w-full">
      <div className={`${height} ${themeConfig.progressBg} rounded-full overflow-hidden ${
        theme === 'terminal' ? 'border border-green-500/30' : ''
      }`}>
        <div
          className={`h-full ${themeConfig.progressFill} rounded-full transition-all duration-500 ease-out ${
            animated && progress > 0 && progress < 100 ? 'animate-progress-stripe' : ''
          }`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <div className={`mt-1 text-sm ${themeConfig.textMuted} text-right`}>
          {theme === 'terminal' ? `[${progress.toFixed(1)}%]` : `${progress.toFixed(1)}%`}
        </div>
      )}
    </div>
  );
}
