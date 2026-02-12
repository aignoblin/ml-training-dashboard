# ML Training Dashboard

A modern, responsive ML training dashboard built with React, TypeScript, and Tailwind CSS. Features 5 unique design variants and comprehensive training management UI.

## 🌐 Live Demo

**[https://aignoblin.github.io/ml-training-dashboard/](https://aignoblin.github.io/ml-training-dashboard/)**

## ✨ Features

### Upload & Train Page
- 📁 Drag & drop file upload area
- ⚙️ Training configuration (model type, epochs, batch size, learning rate, optimizer)
- ▶️ Big animated RUN button
- 📊 Live progress bar with animation
- 📈 Real-time statistics display (epoch, loss, accuracy, time)

### Metrics Dashboard
- 🎯 Key metrics cards (accuracy, loss, experiments, training time)
- 📉 Training visualization charts (loss & accuracy over epochs)
- 📋 Training history table
- 🧪 Experiments list with status

## 🎨 5 Design Variants

Switch themes instantly via the dropdown in the header:

| Variant | Description |
|---------|-------------|
| **Clean Minimal** | White/gray professional look |
| **Dark Tech** | Slate/cyan cyberpunk aesthetic |
| **Gradient Modern** | Purple/pink gradient glassmorphism |
| **Dashboard Cards** | Blue corporate card-based design |
| **Terminal CLI** | Green-on-black retro terminal style |

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS 3** for styling
- **Vite** for build tooling
- **React Router** for navigation
- **Lucide React** for icons

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.tsx       # Main layout wrapper
│   ├── ProgressBar.tsx  # Animated progress component
│   ├── StatCard.tsx     # Statistics card component
│   └── ThemeSwitcher.tsx # Theme selector dropdown
├── contexts/
│   └── ThemeContext.tsx # Theme state & configuration
├── pages/
│   ├── UploadPage.tsx   # Training upload & config
│   └── MetricsPage.tsx  # Metrics dashboard
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
└── index.css            # Global styles & animations
```

## 👤 Built For

Petr (@Petr_Golenderov / GitHub: Gainward777)

## 📄 License

MIT
