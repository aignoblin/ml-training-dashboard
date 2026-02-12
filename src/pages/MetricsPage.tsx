import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { StatCard } from '../components/StatCard';
import { 
  BarChart3, TrendingUp, Target, Clock, 
  Activity, Layers, Gauge, CheckCircle,
  XCircle, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// Mock data for demonstration
const mockTrainingHistory = [
  { epoch: 1, trainLoss: 2.45, valLoss: 2.52, trainAcc: 45.2, valAcc: 42.1 },
  { epoch: 2, trainLoss: 1.89, valLoss: 1.98, trainAcc: 58.3, valAcc: 55.7 },
  { epoch: 3, trainLoss: 1.34, valLoss: 1.56, trainAcc: 68.9, valAcc: 64.2 },
  { epoch: 4, trainLoss: 0.98, valLoss: 1.23, trainAcc: 76.4, valAcc: 71.8 },
  { epoch: 5, trainLoss: 0.72, valLoss: 0.98, trainAcc: 82.1, valAcc: 78.3 },
  { epoch: 6, trainLoss: 0.54, valLoss: 0.82, trainAcc: 86.5, valAcc: 82.9 },
  { epoch: 7, trainLoss: 0.41, valLoss: 0.71, trainAcc: 89.2, valAcc: 86.1 },
  { epoch: 8, trainLoss: 0.32, valLoss: 0.64, trainAcc: 91.3, valAcc: 88.4 },
  { epoch: 9, trainLoss: 0.25, valLoss: 0.59, trainAcc: 93.1, valAcc: 90.2 },
  { epoch: 10, trainLoss: 0.19, valLoss: 0.55, trainAcc: 94.5, valAcc: 91.8 },
];

const mockExperiments = [
  { id: 'EXP-001', model: 'Transformer', accuracy: 94.5, loss: 0.19, status: 'completed', duration: '02:34:12' },
  { id: 'EXP-002', model: 'ResNet-50', accuracy: 92.1, loss: 0.28, status: 'completed', duration: '01:45:38' },
  { id: 'EXP-003', model: 'LSTM', accuracy: 87.3, loss: 0.45, status: 'completed', duration: '03:12:05' },
  { id: 'EXP-004', model: 'CNN', accuracy: 89.8, loss: 0.34, status: 'completed', duration: '00:58:22' },
  { id: 'EXP-005', model: 'MLP', accuracy: 78.2, loss: 0.67, status: 'failed', duration: '00:23:45' },
];

export function MetricsPage() {
  const { themeConfig, theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'history' | 'experiments'>('overview');

  const tabClass = (active: boolean) => `px-4 py-2 rounded-lg transition-colors ${
    active 
      ? `${themeConfig.primary}` 
      : `${themeConfig.textMuted} hover:${themeConfig.text}`
  }`;

  // Simple ASCII chart for terminal theme
  const renderTerminalChart = () => {
    const maxHeight = 10;
    const data = mockTrainingHistory.map(h => h.trainAcc);
    const max = Math.max(...data);
    
    return (
      <div className="font-mono text-xs">
        <div className="flex flex-col">
          {Array.from({ length: maxHeight }).map((_, row) => (
            <div key={row} className="flex">
              <span className="w-8 text-right pr-2">{Math.round((maxHeight - row) * max / maxHeight)}%</span>
              <span>│</span>
              {data.map((val, col) => {
                const height = Math.round((val / max) * maxHeight);
                const shouldFill = maxHeight - row <= height;
                return (
                  <span key={col} className="w-6 text-center">
                    {shouldFill ? '█' : ' '}
                  </span>
                );
              })}
            </div>
          ))}
          <div className="flex">
            <span className="w-8"></span>
            <span>└</span>
            {data.map((_, i) => (
              <span key={i} className="w-6 text-center">─</span>
            ))}
          </div>
          <div className="flex">
            <span className="w-8"></span>
            <span> </span>
            {data.map((_, i) => (
              <span key={i} className="w-6 text-center">{i + 1}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Visual chart placeholder (bar chart visualization)
  const renderVisualChart = () => {
    const data = mockTrainingHistory;
    const maxLoss = Math.max(...data.map(d => d.trainLoss));
    
    return (
      <div className="space-y-4">
        {/* Loss Chart */}
        <div>
          <h4 className={`text-sm font-medium mb-3 ${themeConfig.textMuted}`}>Training Loss Over Epochs</h4>
          <div className="flex items-end h-40 gap-2">
            {data.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-32">
                  <div
                    className={`w-full ${themeConfig.progressFill} rounded-t transition-all hover:opacity-80`}
                    style={{ height: `${(d.trainLoss / maxLoss) * 100}%` }}
                    title={`Loss: ${d.trainLoss.toFixed(3)}`}
                  />
                </div>
                <span className={`text-xs mt-1 ${themeConfig.textMuted}`}>{d.epoch}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Accuracy Chart */}
        <div>
          <h4 className={`text-sm font-medium mb-3 ${themeConfig.textMuted}`}>Accuracy Over Epochs</h4>
          <div className="flex items-end h-40 gap-2">
            {data.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-32">
                  <div
                    className={`w-full rounded-t transition-all hover:opacity-80 ${
                      theme === 'gradient' 
                        ? 'bg-gradient-to-t from-pink-500 to-violet-500' 
                        : themeConfig.progressFill
                    }`}
                    style={{ height: `${d.trainAcc}%` }}
                    title={`Accuracy: ${d.trainAcc.toFixed(1)}%`}
                  />
                </div>
                <span className={`text-xs mt-1 ${themeConfig.textMuted}`}>{d.epoch}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className={`text-2xl font-bold ${themeConfig.text}`}>
          {theme === 'terminal' ? '$ METRICS_DASHBOARD' : 'Metrics Dashboard'}
        </h2>
        <p className={themeConfig.textMuted}>
          {theme === 'terminal' 
            ? '// Monitor training metrics and experiment results'
            : 'Monitor your training metrics and experiment results'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedTab('overview')}
          className={tabClass(selectedTab === 'overview')}
        >
          {theme === 'terminal' ? '[OVERVIEW]' : 'Overview'}
        </button>
        <button
          onClick={() => setSelectedTab('history')}
          className={tabClass(selectedTab === 'history')}
        >
          {theme === 'terminal' ? '[HISTORY]' : 'Training History'}
        </button>
        <button
          onClick={() => setSelectedTab('experiments')}
          className={tabClass(selectedTab === 'experiments')}
        >
          {theme === 'terminal' ? '[EXPERIMENTS]' : 'Experiments'}
        </button>
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Best Accuracy"
              value="94.5%"
              trend="up"
              trendValue="+2.3% from last"
              icon={<Target className={`w-5 h-5 ${themeConfig.accent}`} />}
            />
            <StatCard
              title="Lowest Loss"
              value="0.19"
              trend="down"
              trendValue="Optimal range"
              icon={<TrendingUp className={`w-5 h-5 ${themeConfig.accent}`} />}
            />
            <StatCard
              title="Total Experiments"
              value="5"
              subtitle="3 successful"
              icon={<Layers className={`w-5 h-5 ${themeConfig.accent}`} />}
            />
            <StatCard
              title="Avg Training Time"
              value="1h 42m"
              subtitle="Per experiment"
              icon={<Clock className={`w-5 h-5 ${themeConfig.accent}`} />}
            />
          </div>

          {/* Charts Section */}
          <div className={`${themeConfig.card} ${themeConfig.cardBorder} rounded-xl p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${themeConfig.text} flex items-center gap-2`}>
              <BarChart3 className="w-5 h-5" />
              {theme === 'terminal' ? '> TRAINING_CHARTS' : 'Training Visualization'}
            </h3>
            {theme === 'terminal' ? renderTerminalChart() : renderVisualChart()}
          </div>

          {/* Performance Gauges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${themeConfig.card} ${themeConfig.cardBorder} rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <span className={themeConfig.textMuted}>
                  {theme === 'terminal' ? '// PRECISION' : 'Precision'}
                </span>
                <Gauge className={`w-5 h-5 ${themeConfig.accent}`} />
              </div>
              <div className={`text-4xl font-bold ${themeConfig.text}`}>93.2%</div>
              <div className={`h-2 ${themeConfig.progressBg} rounded-full mt-3`}>
                <div className={`h-full ${themeConfig.progressFill} rounded-full`} style={{ width: '93.2%' }} />
              </div>
            </div>

            <div className={`${themeConfig.card} ${themeConfig.cardBorder} rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <span className={themeConfig.textMuted}>
                  {theme === 'terminal' ? '// RECALL' : 'Recall'}
                </span>
                <Activity className={`w-5 h-5 ${themeConfig.accent}`} />
              </div>
              <div className={`text-4xl font-bold ${themeConfig.text}`}>91.7%</div>
              <div className={`h-2 ${themeConfig.progressBg} rounded-full mt-3`}>
                <div className={`h-full ${themeConfig.progressFill} rounded-full`} style={{ width: '91.7%' }} />
              </div>
            </div>

            <div className={`${themeConfig.card} ${themeConfig.cardBorder} rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <span className={themeConfig.textMuted}>
                  {theme === 'terminal' ? '// F1_SCORE' : 'F1 Score'}
                </span>
                <TrendingUp className={`w-5 h-5 ${themeConfig.accent}`} />
              </div>
              <div className={`text-4xl font-bold ${themeConfig.text}`}>92.4%</div>
              <div className={`h-2 ${themeConfig.progressBg} rounded-full mt-3`}>
                <div className={`h-full ${themeConfig.progressFill} rounded-full`} style={{ width: '92.4%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {selectedTab === 'history' && (
        <div className={`${themeConfig.card} ${themeConfig.cardBorder} rounded-xl overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={themeConfig.tableHeader}>
                <tr>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'EPOCH' : 'Epoch'}
                  </th>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'TRAIN_LOSS' : 'Train Loss'}
                  </th>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'VAL_LOSS' : 'Val Loss'}
                  </th>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'TRAIN_ACC' : 'Train Acc'}
                  </th>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'VAL_ACC' : 'Val Acc'}
                  </th>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'TREND' : 'Trend'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockTrainingHistory.map((row, index) => (
                  <tr 
                    key={row.epoch}
                    className={index % 2 === 0 ? themeConfig.tableRow : themeConfig.tableRowAlt}
                  >
                    <td className={`px-6 py-4 ${themeConfig.text}`}>
                      {theme === 'terminal' ? `[${row.epoch}]` : row.epoch}
                    </td>
                    <td className={`px-6 py-4 ${themeConfig.text}`}>{row.trainLoss.toFixed(3)}</td>
                    <td className={`px-6 py-4 ${themeConfig.text}`}>{row.valLoss.toFixed(3)}</td>
                    <td className={`px-6 py-4 ${themeConfig.text}`}>{row.trainAcc.toFixed(1)}%</td>
                    <td className={`px-6 py-4 ${themeConfig.text}`}>{row.valAcc.toFixed(1)}%</td>
                    <td className="px-6 py-4">
                      {index > 0 && mockTrainingHistory[index - 1].trainLoss > row.trainLoss ? (
                        <span className={`flex items-center gap-1 ${themeConfig.success}`}>
                          <ArrowDownRight className="w-4 h-4" />
                          {theme === 'terminal' ? 'IMPROVING' : 'Improving'}
                        </span>
                      ) : (
                        <span className={`flex items-center gap-1 ${themeConfig.warning}`}>
                          <ArrowUpRight className="w-4 h-4" />
                          {theme === 'terminal' ? 'BASELINE' : 'Baseline'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Experiments Tab */}
      {selectedTab === 'experiments' && (
        <div className={`${themeConfig.card} ${themeConfig.cardBorder} rounded-xl overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={themeConfig.tableHeader}>
                <tr>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'EXP_ID' : 'Experiment ID'}
                  </th>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'MODEL' : 'Model'}
                  </th>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'ACCURACY' : 'Accuracy'}
                  </th>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'LOSS' : 'Loss'}
                  </th>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'DURATION' : 'Duration'}
                  </th>
                  <th className={`px-6 py-4 text-left ${themeConfig.text}`}>
                    {theme === 'terminal' ? 'STATUS' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockExperiments.map((exp, index) => (
                  <tr 
                    key={exp.id}
                    className={index % 2 === 0 ? themeConfig.tableRow : themeConfig.tableRowAlt}
                  >
                    <td className={`px-6 py-4 font-mono ${themeConfig.accent}`}>{exp.id}</td>
                    <td className={`px-6 py-4 ${themeConfig.text}`}>{exp.model}</td>
                    <td className={`px-6 py-4 ${themeConfig.text}`}>{exp.accuracy}%</td>
                    <td className={`px-6 py-4 ${themeConfig.text}`}>{exp.loss.toFixed(3)}</td>
                    <td className={`px-6 py-4 ${themeConfig.textMuted}`}>{exp.duration}</td>
                    <td className="px-6 py-4">
                      {exp.status === 'completed' ? (
                        <span className={`flex items-center gap-1 ${themeConfig.success}`}>
                          <CheckCircle className="w-4 h-4" />
                          {theme === 'terminal' ? 'OK' : 'Completed'}
                        </span>
                      ) : (
                        <span className={`flex items-center gap-1 ${themeConfig.error}`}>
                          <XCircle className="w-4 h-4" />
                          {theme === 'terminal' ? 'FAIL' : 'Failed'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
