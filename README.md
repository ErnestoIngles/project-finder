# 🚀 Project Finder CLI

**Project Finder** is an interactive terminal utility designed to streamline developer workflows. It automatically scans your local directories, identifies project technology stacks, and enables instant project navigation directly from your terminal.

![Version](https://img.shields.io/badge/version-1.5.0-cyan)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

- 🔍 **Recursive Workspace Scanning:** Intelligent depth-first search up to 3 levels deep (`MAX_SCAN_DEPTH = 3`) to discover nested projects in subdirectories (e.g., `~/desarrollo/proyectos/work/clients/app`).
- ⚡ **Performance & Boundary Protection:** Short-circuits directory traversal upon detecting project root markers (`package.json`, `pom.xml`) and defensively skips system, build, and source architecture folders (`node_modules`, `dist`, `src`, `components`).
- 🎨 **Dynamic Tech Stack Formatting:** High-fidelity visual identifiers for **React**, **Vite**, **Angular**, **Java**, and **Node.js** with ANSI colors and formatted stack separators.
- 🧪 **Built-in Demo Mode:** Run simulated nested-project sweeps without accessing local filesystem data—ideal for testing and visual previews.
- 📋 **Seamless Clipboard Integration:** Copies the navigation command (`cd "/path/to/project"`) straight to your system clipboard.
- 🌐 **Cross-Platform:** Designed for native environments including **Windows (GitBash / PowerShell)**, **WSL2**, and **Linux**.

---

## 🛠️ Built With

- **[Node.js](https://nodejs.org/):** Core runtime (ES Modules & Async `fs.promises`).
- **[@clack/prompts](https://www.npmjs.com/package/@clack/prompts):** Interactive CLI prompt framework.
- **[clipboardy](https://www.npmjs.com/package/clipboardy):** Cross-platform OS clipboard access.

---

## 🏗️ Architecture & Layered Design

The project strictly follows a clean, decoupled architecture:

src/
├── core/         # Business logic (Recursive directory scanner & mock data)
├── ui/           # Presentation layer (Clack prompts & ANSI color formatting)
├── utils/        # System I/O services (Clipboard management & versioning)
└── index.js      # CLI Entrypoint & Orchestrator

---

## 🚀 Installation & Usage

### 1. Clone the repository
git clone https://github.com/ErnestoIngles/project-finder.git
cd project-finder

### 2. Install dependencies & link globally
# Install project dependencies
pnpm install

# Link CLI tool globally in your system
pnpm add --global .

> **Note for Windows / GitBash users:** Make sure your `pnpm` global bin path is in your System `PATH` so `pf` can be executed from any directory.

### 3. Run from anywhere!

Simply type the command from any terminal location:
pf

Or run in **Demo Mode**:
pf demo

---

## 📸 Screenshots

![CLI Demo](./screenshots/demo.png)

---

## 💡 Engineering Decisions & Optimization

- **Short-Circuit Recursion:** To prevent unnecessary depth traversal and ensure instant execution, the scanner stops exploring deeper subfolders as soon as a valid project root is identified.
- **Defensive Sanitization & Filter Lists:** Directory names are normalized (`toLowerCase().trim()`) and matched against a comprehensive `IGNORED_DIRECTORIES` set covering build outputs, metadata, and internal project structure (e.g., `src`, `core`, `ui`, `node_modules`).
- **Asynchronous I/O Execution:** Fully powered by `fs.promises` to maintain non-blocking execution throughout complex recursive directory sweeps.
- **Directory Navigation Bypass:** Since a child process cannot change the parent shell's working directory in OS environments, a clipboard-based bridge was implemented to ensure instant, friction-free navigation.

---

Created with ❤️ by [ErnestoIngles](https://github.com/ErnestoIngles)