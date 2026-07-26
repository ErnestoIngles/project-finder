#!/usr/bin/env node

/**
 * @file index.js
 * @description Terminal tool to scan, identify, and copy navigation commands for projects.
 * @author ErnestoIngles
 */
import { getAppVersion } from './utils/version.js';
import { copyToClipboard } from './utils/clipboard.js';
import { scanProjects } from './core/scanner.js';
import { MOCK_PROJECTS } from './core/demoData.js';
import { renderHeader, promptProjectSelection, renderSuccessMessage } from './ui/cli.js';

/**
 * Main execution flow of the CLI tool.
 * @async
 */
async function main() {
  const version = getAppVersion();
  const isDemo = process.argv.includes('demo') || process.argv.includes('--demo');

  renderHeader(version, isDemo);

  const projects = isDemo ? MOCK_PROJECTS : await scanProjects();

  const selectedPath = await promptProjectSelection(projects);

  if (!selectedPath) {
    process.exit(0);
  }

  const command = `cd "${selectedPath}"`;
  copyToClipboard(command);

  renderSuccessMessage(selectedPath);
}

main().catch((err) => {
  console.error(`Fatal error: ${err.message}`);
  process.exit(1);
});