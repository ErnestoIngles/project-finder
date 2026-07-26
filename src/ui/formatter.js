/**
 * ANSI Color Escape Sequences for Terminal Styling
 */
export const COLORS = {
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  react: '\x1b[38;5;81m',   // Sky blue
  vite: '\x1b[38;5;205m',  // Pink/Purple
  java: '\x1b[38;5;208m',  // Orange
  node: '\x1b[32m',        // Green
  gray: '\x1b[90m',        // Gray for divider
  angular: '\x1b[38;5;196m' // Red Angular
};

/**
 * Mapping configuration for technology keyword matching and coloring
 */
const TECH_COLOR_MAP = [
  { match: 'React', color: COLORS.react },
  { match: 'Vite', color: COLORS.vite },
  { match: 'Angular', color: COLORS.angular },
  { match: 'Java', color: COLORS.java },
  { match: 'Node.js', color: COLORS.node },
  { match: 'Express', color: COLORS.node },
];

/**
 * Applies ANSI color sequences to technology stack string based on target keywords
 * @param {string} typeStr - Plain text stack type (e.g. "React / Vite")
 * @returns {string} Formatted string with ANSI color escape codes
 */
export function colorizeType(typeStr) {
  if (!typeStr) return `${COLORS.gray}Generic${COLORS.reset}`;

  let formatted = typeStr;

  for (const { match, color } of TECH_COLOR_MAP) {
    if (formatted.includes(match)) {
      formatted = formatted.replace(match, `${color}${match}${COLORS.reset}`);
    }
  }

  formatted = formatted.replaceAll('/', `${COLORS.gray}/${COLORS.reset}`);

  return formatted;
}