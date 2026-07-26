import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const DEFAULT_PROJECTS_DIR = path.join(os.homedir(), 'desarrollo', 'proyectos');

/**
 * Scans a directory for identifiable projects
 * @param {string} rootDir - Base path to start the scan
 * @returns {Promise<Array<{name: string, type: string, path: string}>>} List of projects found
*/
export async function scanProjects(rootDir = DEFAULT_PROJECTS_DIR) {
  try {
    const entries = await fs.promises.readdir(rootDir, { withFileTypes: true });
    const projects = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const projectPath = path.join(rootDir, entry.name);
      const projectType = detectProjectType(projectPath);

      if (projectType) {
        projects.push({
          name: entry.name,
          type: projectType,
          path: projectPath
        });
      }
    }

    return projects;
  } catch (error) {
    return [];
  }
}

/**
 * Identifies the project type by analyzing key configuration files
 * @param {string} projectPath
 * @returns {string|null}
*/
function detectProjectType(projectPath) {
  const pkgPath = path.join(projectPath, 'package.json');
  const pomPath = path.join(projectPath, 'pom.xml');

  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };

      const tags = [];
      if (deps.react) tags.push('React');
      if (deps.vite) tags.push('Vite');
      if (deps['@angular/core']) tags.push('Angular');

      return tags.length > 0 ? tags.join(' / ') : 'Node.js';
    } catch {
      return 'Node.js';
    }
  }

  if (fs.existsSync(pomPath)) {
    return 'Java (Maven)';
  }

  return null;
}