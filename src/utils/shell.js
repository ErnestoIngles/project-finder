import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Generates the dynamic wrapper script by reading the binary name from package.json.
 * @param {'bash' | 'powershell'} shellType - Target shell type.
 * @returns {string} The executable code for the shell.
 */
export function getShellWrapperScript(shellType = 'bash') {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const packagePath = path.resolve(__dirname, '../../package.json');

    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    const binName = Object.keys(pkg.bin || {})[0] || 'pf-cli';

    if (shellType === 'powershell') {
      return `
function pf {
    $target_dir = & ${binName} @args
    if ($target_dir -and (Test-Path -Path $target_dir)) {
        Set-Location -Path $target_dir
    }
}`.trim();
    }

    // Bash / Zsh / GitBash / WSL (Subshell limpio)
    return `
pf() {
  local target_dir
  target_dir=$(${binName} "$@")
  if [ -n "$target_dir" ] && [ -d "$target_dir" ]; then
    cd "$target_dir"
  fi
}`.trim();
  } catch (error) {
    return '';
  }
}