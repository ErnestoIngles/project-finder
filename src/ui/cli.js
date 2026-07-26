import os from 'node:os';
import * as p from '@clack/prompts';
import { colorizeType, COLORS } from './formatter.js';

const HOME = os.homedir();

/**
 * Renders the CLI header banner
 * @param {string} version - Current app version
 * @param {boolean} isDemo - Whether demo mode is active
 */
export function renderHeader(version, isDemo = false) {
  console.clear();
  p.intro(`🚀 Project Finder - Terminal Navigator ${version}`);

  if (isDemo) {
    p.note('🛠️ Running in Demo Mode (simulated data for testing & screenshots)');
  }
}

/**
 * Displays the project selection interactive prompt
 * @param {Array<{name: string, type: string, path: string}>} projects - Project items list
 * @returns {Promise<string|null>} Selected project path or null if cancelled
 */
export async function promptProjectSelection(projects) {
  if (!projects || projects.length === 0) {
    p.log.error('No valid projects found in current directory.');
    return null;
  }

  const maxNameLength = Math.max(...projects.map(p => p.name.length));

  const selectedPath = await p.select({
    message: 'Which project do you want to open?',
    options: projects.map(project => {
      const padding = ' '.repeat(Math.max(0, maxNameLength - project.name.length + 2));
      const coloredType = colorizeType(project.type);

      return {
        value: project.path,
        label: `${project.name}${padding}${COLORS.gray}→${COLORS.reset} ${coloredType} \n`,
        hint: `📁 ${project.path.replace(HOME, '~')}`
      };
    }),
  });

  if (p.isCancel(selectedPath)) {
    p.cancel('Operation cancelled.');
    return null;
  }

  return selectedPath;
}

/**
 * Renders success confirmation message after copying command
 * @param {string} selectedPath - Target path
 */
export function renderSuccessMessage(selectedPath) {
  const displayPath = selectedPath.replace(HOME, '~');
  p.outro(`✅ Command ${COLORS.cyan}cd "${displayPath}"${COLORS.reset} copied!`);
  console.log(`\n  👉 Just press Ctrl+V (or Right Click) and Enter to navigate.\n`);
}