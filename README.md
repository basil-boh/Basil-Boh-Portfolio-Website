# Basil Portfolio - Interactive 3D Portfolio Website

A modern, interactive portfolio website built with Next.js and Three.js featuring a stunning 3D background animation.

## Features

- 🎨 Interactive 3D background with Three.js
- 📱 Fully responsive design
- ✨ Smooth scroll animations
- 🎭 Glassmorphism UI elements
- 🖱️ Mouse and scroll interactions
- ⚡ Built with Next.js for optimal performance

## Tech Stack

- **Next.js** - React framework
- **Three.js** - 3D graphics library
- **Tailwind CSS** - Utility-first CSS framework
- **Phosphor Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── components/
│   ├── About.js          # About section component
│   ├── Contact.js        # Contact section component
│   ├── Hero.js           # Hero section component
│   ├── Navigation.js     # Navigation bar component
│   ├── Projects.js       # Projects section component
│   └── ThreeBackground.js # Three.js 3D background component
├── pages/
│   ├── _app.js           # Next.js app wrapper
│   └── index.js          # Main homepage
├── styles/
│   └── globals.css       # Global styles and Tailwind imports
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

## Customization

- Update personal information in the respective component files
- Modify the 3D animation in `components/ThreeBackground.js`
- Change colors and styling in `styles/globals.css` and Tailwind classes
- Add/remove projects in `components/Projects.js`

## License

MIT


