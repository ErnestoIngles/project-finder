#!/usr/bin/env node

/**
 * @file index.js
 * @description Terminal tool to scan, identify, and copy navigation commands for projects.
 * @author ErnestoIngles
 */
import { getAppVersion, copyToClipboard, getShellWrapperScript } from './utils/index.js';
import { scanProjects, MOCK_PROJECTS } from './core/index.js';
import { renderHeader, promptProjectSelection, renderSuccessMessage, 
  redirectUiToStderr, emitData } from './ui/index.js';

/**
 * Main execution flow of the CLI tool.
 * @async
 */
async function main() {
  const version = getAppVersion();
  const isDemo = process.argv.includes('demo') || process.argv.includes('--demo');

  const args = process.argv.slice(2);

  if (args[0] === 'init') {
    const shellType = args[1] || 'bash';
    const script = getShellWrapperScript(shellType);
    
    process.stdout.write(script);
    process.exit(0);
  }

  redirectUiToStderr();

  renderHeader(version, isDemo);

  const projects = isDemo ? MOCK_PROJECTS : await scanProjects();
  const selectedPath = await promptProjectSelection(projects);

  if (!selectedPath) {
    process.exit(0);
  }

  const command = `cd "${selectedPath}"`;
  copyToClipboard(command);

  renderSuccessMessage(selectedPath);

  emitData(selectedPath);
  process.exit(0);
}

main().catch((err) => {
  console.error(`Fatal error: ${err.message}`);
  process.exit(1);
});