# 🚀 Project Finder CLI

**Project Finder** is an interactive terminal utility designed to streamline developer workflows. It automatically scans your local directories, identifies project technology stacks, and enables instant project navigation directly from your terminal.

![Version](https://img.shields.io/badge/version-1.6.0-cyan)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

- ⚡ **Instant Shell Navigation:** Perform native, shell-level directory switches (`cd`) directly within your active terminal session via the `pf` wrapper.
- 🔍 **Automated Workspace Scanning:** Recursively identifies valid development projects in your workspace (`~/desarrollo/proyectos`).
- 🎨 **Dynamic Tech Stack Formatting:** High-fidelity visual identifiers for **React**, **Vite**, **Angular**, **Java**, and **Node.js** with ANSI colors and formatted stack separators.
- 🧪 **Built-in Demo Mode:** Run simulated project sweeps without accessing local filesystem data—ideal for testing and visual previews.
- 📋 **Clipboard Backup:** Silently copies the target `cd` command to your system clipboard as a fallback.
- 🌐 **Cross-Platform:** Full shell integration support for **Windows (PowerShell)**, **Git Bash**, **WSL2**, and **Linux (Bash/Zsh)**.

---
## 🛠️ Built With

- **[Node.js](https://nodejs.org/):** Core runtime (ES Modules).
- **[@clack/prompts](https://www.npmjs.com/package/@clack/prompts):** Interactive CLI prompt framework.
- **[clipboardy](https://www.npmjs.com/package/clipboardy):** Cross-platform OS clipboard access.

---

## 🏗️ Architecture & Layered Design

The project strictly follows a clean, decoupled architecture with isolated I/O streams and shell wrappers:

```text
project-finder/
├── bin/            # Executable shell wrappers (pf.sh & pf.ps1) for native terminal cd
├── src/
│   ├── core/       # Business logic (Directory scanner & mock data)
│   ├── ui/         # Presentation layer (Clack prompts, formatting & I/O stream proxying)
│   ├── utils/      # System utilities (Shell script generators, clipboard & metadata)
│   └── index.js    # CLI Entrypoint, subcommand routing & stream orchestrator
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

**Note for Windows / Git Bash users:** Make sure your pnpm global bin path (e.g., ~/.local/share/pnpm) is included in your system PATH variable so pf-cli can be executed from any directory.

### 3. Enable Instant Navigation (pf command)
Add the initialization line to your shell profile so the short pf command is available in every new terminal session:

#### 🐧 Bash / Zsh / WSL / Git Bash
Add this line to your ~/.bashrc or ~/.zshrc:

```bash
eval "$(pf-cli init bash)"
```
(Then run source ~/.bashrc or restart your terminal).

#### 🪟 Windows PowerShell
Add this line to your PowerShell $PROFILE:
```powershell
Invoke-Expression (pf-cli init powershell)
```

### 4. 💻 Usage
Once configured, simply type from any directory:
```bash
pf
```

Or run in **Demo Mode** to test the UI with mock data:
```bash
pf demo
```

---

## 📸 Screenshots

![CLI Demo](./screenshots/demo.png)

---

## 🏗️ Engineering Decisions

* **Native Directory Navigation (Shell Wrappers):** Since a child process in Node.js cannot mutate the current working directory of its parent shell process, we implemented lightweight shell wrappers (`pf.sh` / `pf.ps1`) injected via `pf-cli init`. The wrapper captures stdout data to execute native `cd` commands seamlessly.

* **I/O Stream Isolation (Proxying):** To prevent interactive UI render engines (such as `@clack/prompts`) from polluting stdout during shell evaluation, visual components are dynamically intercepted and routed strictly to `process.stderr`. This keeps stdout clean for raw directory path transfers.

* **Dynamic Tabular Padding:** The UI calculates the maximum string length across all discovered project names dynamically, ensuring a perfectly aligned layout regardless of directory naming conventions.

* **Persistence Roadmap:** Future iterations will support a centralized `config.json` for custom workspace scan locations, deep nesting limits, and directory exclusion rules.

---

Created with ❤️ by [ErnestoIngles](https://github.com/ErnestoIngles)
