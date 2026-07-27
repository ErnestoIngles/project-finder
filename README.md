# 🚀 Project Finder CLI

**Project Finder** is an interactive terminal utility designed to streamline developer workflows. It automatically scans your local directories, identifies project technology stacks, and enables instant project navigation directly from your terminal.

![Version](https://img.shields.io/badge/version-1.4.0-cyan)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

- 🔍 **Automated Workspace Scanning:** Recursively identifies valid development projects in your workspace (`~/desarrollo/proyectos`).
- 🎨 **Dynamic Tech Stack Formatting:** High-fidelity visual identifiers for **React**, **Vite**, **Angular**, **Java**, and **Node.js** with ANSI colors and formatted stack separators.
- 🧪 **Built-in Demo Mode:** Run simulated project sweeps without accessing local filesystem data—ideal for testing and visual previews.
- 📋 **Seamless Clipboard Integration:** Copies the navigation command (`cd "/path/to/project"`) straight to your system clipboard.
- 🌐 **Cross-Platform:** Designed for native environments including **Windows (GitBash / PowerShell)**, **WSL2**, and **Linux**.

---

## 🛠️ Built With

- **[Node.js](https://nodejs.org/):** Core runtime (ES Modules).
- **[@clack/prompts](https://www.npmjs.com/package/@clack/prompts):** Interactive CLI prompt framework.
- **[clipboardy](https://www.npmjs.com/package/clipboardy):** Cross-platform OS clipboard access.

---

## 🏗️ Architecture & Layered Design

The project strictly follows a clean, decoupled architecture:

```text
src/
├── core/         # Business logic (Directory scanner & mock data)
├── ui/           # Presentation layer (Clack prompts & ANSI color formatting)
├── utils/        # System I/O services (Clipboard management & versioning)
└── index.js      # CLI Entrypoint & Orchestrator
```

--- 

## 🚀 Installation & Usage

### 1. Clone the repository
```bash
git clone https://github.com/ErnestoIngles/project-finder.git
cd project-finder
```

### 2. Install dependencies & link globally
```bash
# Install project dependencies
pnpm install

# Link CLI tool globally in your system
pnpm add --global .
```

**Note for Windows / GitBash users:** Make sure your `pnpm` global bin path is in your System `PATH` so `pf` can be executed from any directory.

### 3. Run from anywhere!

Simply type the command from any terminal location:
```bash
pf
```

Or run in **Demo Mode**:
```bash
pf demo
```

---

## 📸 Screenshots

![CLI Demo](./screenshots/demo.png)

---

### 🏗️ Engineering Decisions
 * Directory Navigation Bypass: Since a child process cannot change the parent's working directory in Unix systems, a clipboard-based bridge was implemented to ensure instant navigation without complex shell configurations.

 * Dynamic Padding: The menu calculates the maximum string length of project names to maintain a perfect tabular layout regardless of folder naming conventions.

 * Persistence Roadmap: Future versions will include a config.json for customizable scan paths and ignore-lists.

 --- 

Created with ❤️ by [ErnestoIngles](https://github.com/ErnestoIngles)
