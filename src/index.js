#!/usr/bin/env node

/**
 * @file index.js
 * @description Terminal tool to scan, identify, and copy navigation commands for projects.
 * @author ErnestoIngles
 */

import os from 'os';
import * as p from '@clack/prompts';
import path from 'node:path';
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

  // 1. Mostrar encabezado
  renderHeader(version, isDemo);

  // 2. Obtener datos
  const projects = isDemo ? MOCK_PROJECTS : await scanProjects();

  // 3. Capturar selección de la UI
  const selectedPath = await promptProjectSelection(projects);

  if (!selectedPath) {
    process.exit(0);
  }

  // 4. Ejecutar acción de copiar (Efecto secundario)
  const command = `cd "${selectedPath}"`;
  copyToClipboard(command);

  // 5. Renderizar despedida
  renderSuccessMessage(selectedPath);
}

main().catch((err) => {
  console.error(`Fatal error: ${err.message}`);
  process.exit(1);
});