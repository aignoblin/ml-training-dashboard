import { useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ProgressBar } from '../components/ProgressBar';
import { StatCard } from '../components/StatCard';
import { Upload, Play, FileUp, Settings, Zap, Clock, Database, Cpu } from 'lucide-react';

export function UploadPage() {
  const { themeConfig, theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Form state
  const [config, setConfig] = useState({
    modelType: 'transformer',
    epochs: '100',
    batchSize: '32',
    learningRate: '0.001',
    optimizer: 'adam',
    datasetSplit: '80',
  });

  // Mock stats that update during training
  const [stats, setStats] = useState({
    currentEpoch: 0,
    totalEpochs: 100,
    loss: 0,
    accuracy: 0,
    elapsedTime: '00:00:00',
    eta: '--:--:--',
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const simulateTraining = () => {
    setIsRunning(true);
    setProgress(0);
    const totalEpochs = parseInt(config.epochs);
    let currentEpoch = 0;

    const interval = setInterval(() => {
      currentEpoch++;
      const newProgress = (currentEpoch / totalEpochs) * 100;
      setProgress(newProgress);
      
      setStats({
        currentEpoch,
        totalEpochs,
        loss: Math.max(0.01, 2.5 - (currentEpoch / totalEpochs) * 2.3 + Math.random() * 0.1),
        accuracy: Math.min(99, 50 + (currentEpoch / totalEpochs) * 45 + Math.random() * 3),
        elapsedTime: formatTime(currentEpoch * 3),
        eta: formatTime((totalEpochs - currentEpoch) * 3),
      });

      if (currentEpoch >= totalEpochs) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 100);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const inputClass = `w-full px-4 py-3 rounded-lg ${themeConfig.input} ${themeConfig.text} border ${themeConfig.inputBorder} focus:outline-none focus:ring-2 transition-colors ${theme === 'terminal' ? 'font-mono' : ''}`;
  const labelClass = `block text-sm font-medium mb-2 ${themeConfig.textMuted}`;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className={`text-2xl font-bold ${themeConfig.text}`}>
          {theme === 'terminal' ? '$ UPLOAD_AND_TRAIN' : 'Upload & Train'}
        </h2>
        <p className={themeConfig.textMuted}>
          {theme === 'terminal' 
            ? '// Configure training parameters and start model training'
            : 'Configure your training parameters and start the model training process'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Upload & Config */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload Area */}
          <div className={`${themeConfig.card} ${themeConfig.cardBorder} rounded-xl p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${themeConfig.text} flex items-center gap-2`}>
              <FileUp className="w-5 h-5" />
              {theme === 'terminal' ? '> DATA_INPUT' : 'Data Upload'}
            </h3>
            
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
                ${dragActive 
                  ? `${themeConfig.accent} border-current` 
                  : `${themeConfig.inputBorder}`
                }
                ${theme === 'terminal' ? 'border-green-500/50' : ''}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".csv,.json,.parquet,.zip"
                onChange={handleFileChange}
              />
              <Upload className={`w-12 h-12 mx-auto mb-4 ${themeConfig.textMuted}`} />
              {selectedFile ? (
                <div>
                  <p className={`font-medium ${themeConfig.text}`}>
                    {theme === 'terminal' ? `> FILE: ${selectedFile.name}` : selectedFile.name}
                  </p>
                  <p className={`text-sm ${themeConfig.textMuted}`}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className={`font-medium ${themeConfig.text}`}>
                    {theme === 'terminal' ? '> DRAG_FILE_HERE' : 'Drag and drop your dataset here'}
                  </p>
                  <p className={`text-sm ${themeConfig.textMuted}`}>
                    {theme === 'terminal' 
                      ? '// Supports: .csv, .json, .parquet, .zip'
                      : 'Supports CSV, JSON, Parquet, or ZIP files'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Configuration Fields */}
          <div className={`${themeConfig.card} ${themeConfig.cardBorder} rounded-xl p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${themeConfig.text} flex items-center gap-2`}>
              <Settings className="w-5 h-5" />
              {theme === 'terminal' ? '> CONFIG_PARAMS' : 'Training Configuration'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  {theme === 'terminal' ? '// MODEL_TYPE' : 'Model Type'}
                </label>
                <select
                  value={config.modelType}
                  onChange={(e) => setConfig({ ...config, modelType: e.target.value })}
                  className={inputClass}
                >
                  <option value="transformer">Transformer</option>
                  <option value="cnn">CNN</option>
                  <option value="rnn">RNN / LSTM</option>
                  <option value="mlp">MLP</option>
                  <option value="resnet">ResNet</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  {theme === 'terminal' ? '// OPTIMIZER' : 'Optimizer'}
                </label>
                <select
                  value={config.optimizer}
                  onChange={(e) => setConfig({ ...config, optimizer: e.target.value })}
                  className={inputClass}
                >
                  <option value="adam">Adam</option>
                  <option value="sgd">SGD</option>
                  <option value="rmsprop">RMSprop</option>
                  <option value="adamw">AdamW</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  {theme === 'terminal' ? '// EPOCHS' : 'Number of Epochs'}
                </label>
                <input
                  type="number"
                  value={config.epochs}
                  onChange={(e) => setConfig({ ...config, epochs: e.target.value })}
                  className={inputClass}
                  min="1"
                  max="1000"
                />
              </div>

              <div>
                <label className={labelClass}>
                  {theme === 'terminal' ? '// BATCH_SIZE' : 'Batch Size'}
                </label>
                <input
                  type="number"
                  value={config.batchSize}
                  onChange={(e) => setConfig({ ...config, batchSize: e.target.value })}
                  className={inputClass}
                  min="1"
                  max="512"
                />
              </div>

              <div>
                <label className={labelClass}>
                  {theme === 'terminal' ? '// LEARNING_RATE' : 'Learning Rate'}
                </label>
                <input
                  type="text"
                  value={config.learningRate}
                  onChange={(e) => setConfig({ ...config, learningRate: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {theme === 'terminal' ? '// TRAIN_SPLIT_%' : 'Training Split (%)'}
                </label>
                <input
                  type="number"
                  value={config.datasetSplit}
                  onChange={(e) => setConfig({ ...config, datasetSplit: e.target.value })}
                  className={inputClass}
                  min="50"
                  max="95"
                />
              </div>
            </div>
          </div>

          {/* Big RUN Button */}
          <button
            onClick={simulateTraining}
            disabled={isRunning}
            className={`w-full py-6 rounded-xl text-2xl font-bold ${themeConfig.primary} ${themeConfig.primaryHover} 
              transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
              ${theme === 'terminal' ? 'animate-pulse-glow text-black' : ''}
              ${isRunning ? 'animate-pulse' : ''}
              flex items-center justify-center gap-3`}
          >
            {isRunning ? (
              <>
                <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" />
                {theme === 'terminal' ? '> TRAINING_IN_PROGRESS...' : 'Training...'}
              </>
            ) : (
              <>
                <Play className="w-8 h-8" />
                {theme === 'terminal' ? '> EXECUTE_TRAINING' : 'RUN TRAINING'}
              </>
            )}
          </button>

          {/* Progress Section */}
          {(isRunning || progress > 0) && (
            <div className={`${themeConfig.card} ${themeConfig.cardBorder} rounded-xl p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${themeConfig.text} flex items-center gap-2`}>
                <Zap className="w-5 h-5" />
                {theme === 'terminal' ? '> TRAINING_PROGRESS' : 'Training Progress'}
              </h3>
              <ProgressBar progress={progress} animated={isRunning} height="h-6" />
              <div className={`mt-4 flex justify-between ${themeConfig.textMuted}`}>
                <span>Epoch {stats.currentEpoch} / {stats.totalEpochs}</span>
                <span>
                  {theme === 'terminal' 
                    ? `ETA: ${stats.eta}` 
                    : `Estimated time remaining: ${stats.eta}`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Stats */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${themeConfig.text} flex items-center gap-2`}>
            {theme === 'terminal' ? '> LIVE_STATS' : 'Live Statistics'}
          </h3>
          
          <StatCard
            title="Current Epoch"
            value={stats.currentEpoch}
            subtitle={`of ${stats.totalEpochs} total`}
            icon={<Cpu className={`w-5 h-5 ${themeConfig.accent}`} />}
          />
          
          <StatCard
            title="Training Loss"
            value={stats.loss.toFixed(4)}
            trend={stats.loss < 1 ? 'down' : 'neutral'}
            trendValue="Decreasing"
            icon={<Database className={`w-5 h-5 ${themeConfig.accent}`} />}
          />
          
          <StatCard
            title="Accuracy"
            value={`${stats.accuracy.toFixed(1)}%`}
            trend={stats.accuracy > 80 ? 'up' : 'neutral'}
            trendValue={stats.accuracy > 80 ? 'Good' : 'Training...'}
            icon={<Zap className={`w-5 h-5 ${themeConfig.accent}`} />}
          />
          
          <StatCard
            title="Elapsed Time"
            value={stats.elapsedTime}
            subtitle={`ETA: ${stats.eta}`}
            icon={<Clock className={`w-5 h-5 ${themeConfig.accent}`} />}
          />
        </div>
      </div>
    </div>
  );
}
