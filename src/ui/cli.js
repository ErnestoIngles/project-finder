import os from 'node:os';
import * as p from '@clack/prompts';

const HOME = os.homedir();

const COLORS = {
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  react: '\x1b[38;5;81m',   // Sky blue
  vite: '\x1b[38;5;205m',  // Pink/Purple
  java: '\x1b[38;5;208m',  // Orange
  node: '\x1b[32m',        // Green
  gray: '\x1b[90m',        // Gray for divider
  angular: '\x1b[38;5;196m' // Red Angular
};

function colorizeType(typeStr) {
  if (!typeStr) return `${COLORS.gray}Generic${COLORS.reset}`;

  let formatted = typeStr;

  if (formatted.includes('React')) formatted = formatted.replace('React', `${COLORS.react}React${COLORS.reset}`);
  if (formatted.includes('Vite')) formatted = formatted.replace('Vite', `${COLORS.vite}Vite${COLORS.reset}`);
  if (formatted.includes('Angular')) formatted = formatted.replace('Angular', `${COLORS.angular}Angular${COLORS.reset}`);
  if (formatted.includes('Java')) formatted = formatted.replace('Java', `${COLORS.java}Java${COLORS.reset}`);
  if (formatted.includes('Node.js') || formatted.includes('Express')) formatted = formatted.replace('Node.js', `${COLORS.node}Node.js${COLORS.reset}`);

  return formatted;
}

/**
 * Muestra la intro del sistema
 */
export function renderHeader(version, isDemo = false) {
  console.clear();
  p.intro(`🚀 Project Finder - Terminal Navigator ${version}`);

  if (isDemo) {
    p.note('🛠️ Running in Demo Mode (simulated data for testing & screenshots)');
  }
}

/**
 * Renderiza la lista de proyectos y retorna la ruta seleccionada por el usuario
 * @param {Array<{name: string, type: string, path: string}>} projects 
 * @returns {Promise<string|null>} Ruta elegida o null si canceló
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
 * Muestra el mensaje de éxito final
 */
export function renderSuccessMessage(selectedPath) {
  const displayPath = selectedPath.replace(HOME, '~');
  p.outro(`✅ Command ${COLORS.cyan}cd "${displayPath}"${COLORS.reset} copied!`);
  console.log(`\n  👉 Just press Ctrl+V (or Right Click) and Enter to navigate.\n`);
}