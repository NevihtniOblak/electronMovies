# ⚛️ Electron-React Starter Template

A starter template for building cross-platform desktop apps with Electron, React, and Vite.

![Electron](https://img.shields.io/badge/Electron-2C2E3B?style=for-the-badge&logo=electron&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 📦 Prerequisites

- Node.js 18+ (Recommended LTS version)
- npm 9+
- Git (for version control)

## 🛠️ Installation

**1️⃣ Clone the repository**

```bash
git clone https://github.com/your-username/your-repo.git <project-name>
cd <project-name>
```

**2️⃣ Install dependencies** (installs **root dependencies** and **react dependencies** that are in **renderer**)

```bash
npm install
```

## 🚀 Usage

- **Development Mode** (with hot reload)

```bash
npm run dev
```

Starts Vite dev server (port 3000) and launches Electron window connected to dev server

- **Production Mode**

```bash
npm run build
npm start
```

Creates optimized build in /dist and launches production Electron app

📂 Project Structure
├── renderer/ # React application
│ ├── src/ # React components
│ ├── public/ # Static assets
│ ├── index.html # Main HTML template
│ └── vite.config.js # Vite configuration
├── main.js # Electron main process
├── package.json # Root project config
└── README.md # You are here!
