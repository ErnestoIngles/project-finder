#!/usr/bin/env node

/**
 * @file index.js
 * @description Terminal tool to scan, identify, and copy navigation commands for projects.
 * @author ErnestoIngles
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import * as p from '@clack/prompts';
import { getAppVersion } from './utils/version.js';

/** @constant {string} APP_VERSION - Base path where development projects are located */
const APP_VERSION = getAppVersion();


/** @constant {string} HOME - Current user's home directory path */
const HOME = os.homedir();

/** @constant {string} PROJECTS_DIR - Base path where development projects are located */
const PROJECTS_DIR = path.join(HOME, 'desarrollo', 'proyectos');

/** @constant {Object} COLORS - ANSI escape codes for terminal styling */
const COLORS = {
  cyan: "\x1b[36m",
  reset: "\x1b[0m",
  react: "\x1b[38;5;81m", // Sky blue
  vite: "\x1b[38;5;205m",  // Pink/Purple
  java: "\x1b[38;5;208m",  // Orange
  node: "\x1b[32m",        // Green
  gray: "\x1b[90m",        // Gray for the divider
  angular: "\x1b[38;5;196m", // Red Angular       
};

/**
 * Analyzes a folder to determine its technology stack.
 * @param {string} folderPath - Full path of the folder to scan.
 * @returns {string} Formatted string with tech labels and ANSI colors.
 */
function getProjectStack(folderPath) {
  try {
    const pkgPath = path.join(folderPath, 'package.json');
    const pomPath = path.join(folderPath, 'pom.xml');

    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };

      let label = "";
      if (deps.react) label += `${COLORS.react}React${COLORS.reset}  `;
      if (deps.vite) label += `${COLORS.vite}Vite${COLORS.reset} `;
      if(deps['@angular/core']){ label += `${COLORS.angular}Angular${COLORS.reset} `;}

      return label.trim() || `${COLORS.node}Node.js${COLORS.reset}`;
    }

    if (fs.existsSync(pomPath)) {
      return `${COLORS.java}Java / Maven${COLORS.reset}`;
    }

    return `${COLORS.gray}Generic${COLORS.reset}`;
  } catch {
    return "";
  }
}

/**
 * Scans the PROJECTS_DIR for valid project candidates.
 * @returns {Array<Object>} List of project objects {name, path, stack}.
 */
function scanProjects() {
  try {
    if (!fs.existsSync(PROJECTS_DIR)) return [];

    const elements = fs.readdirSync(PROJECTS_DIR);
    return elements
      .map(element => {
        const fullPath = path.join(PROJECTS_DIR, element);
        return {
          name: element,
          path: fullPath,
          stack: getProjectStack(fullPath)
        };
      })
      .filter(item => fs.statSync(item.path).isDirectory() && item.stack !== "");
  } catch (error) {
    return [];
  }
}

/**
 * Main execution flow of the CLI tool.
 * @async
 */
async function main() {
  console.clear();

  p.intro(`🚀 Project Finder - Terminal Navigator ${APP_VERSION}`);

  const projectList = scanProjects();

  const maxNameLength = Math.max(...projectList.map(p => p.name.length));

  if (projectList.length === 0) {
    p.log.error('No valid projects found in ' + PROJECTS_DIR);
    return;
  }

  const selectedPath = await p.select({
    message: 'Which project do you want to open?',
    options: projectList.map(project => {
      const padding = " ".repeat(maxNameLength - project.name.length + 2);
      return {
        value: project.path,
        label: `${project.name} ${COLORS.gray}→${COLORS.reset} ${project.stack} \n`,
        hint: `📁 ${project.path.replace(HOME, '~')}`
      };
    }),
  });

  if (p.isCancel(selectedPath)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Copy command to clipboard for the user to execute
  const command = `cd "${selectedPath}"`;
  clipboard.writeSync(command);

  p.outro(`✅ Command ${COLORS.cyan}cd "${selectedPath.replace(HOME, '~')}"${COLORS.reset} copied!`);
  console.log(`\n  👉 Just press Ctrl+V (or Right Click) and Enter to navigate.\n`);
}

main().catch((err) => {
  p.log.error(`Fatal error: ${err.message}`);
  process.exit(1);
});
