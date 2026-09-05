import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const DEFAULT_PROJECTS_DIR = path.join( os.homedir(), 'desarrollo', 'proyectos' );
export const MAX_SCAN_DEPTH = 3;
export const IGNORED_DIRECTORIES = new Set( [
  // Metadata and Dependencies
  'node_modules',
  '.git',
  '.vscode',
  '.idea',
  'dist',
  'build',
  'target',
  'bin',
  'obj',
  '.next',
  '.astro',

  // Support files and resources
  'screenshots',
  'docs',
  'public',
  'assets',
  'images',

  // Internal code structure
  'src',
  'core',
  'components',
  'ui',
  'utils',
  'helpers',
  'services',
  'lib',
  'pages',
  'routes'
] );

/**
 * Normalizes the name of a directory for defensive comparison.
 * @param {string} dirName
 * @returns {string}
 */
function normalizeDirName ( dirName ) {
  return dirName.toLowerCase().trim();
}

/**
 * Scans workspace for identifiable projects
 * @param {string} rootDir - Base path to start the scan
 * @returns {Promise<Array<{name: string, type: string, path: string}>>} List of projects found
 */
export async function scanProjects ( rootDir = DEFAULT_PROJECTS_DIR ) {
  return await scanDirectory( rootDir, 1 );
}

/**
 * Recursively scans a directory for identifiable projects up to MAX_SCAN_DEPTH.
 * @param {string} currentDir - Directory to scan
 * @param {number} currentDepth - Current recursion level
 * @returns {Promise<Array<{name: string, type: string, path: string}>>}
 */
async function scanDirectory ( currentDir, currentDepth = 1 ) {
  if ( currentDepth > MAX_SCAN_DEPTH )
  {
    return [];
  }

  try
  {
    const entries = await fs.promises.readdir( currentDir, { withFileTypes: true } );
    const projects = [];

    for ( const entry of entries )
    {
      if ( !entry.isDirectory() ) continue;

      const cleanName = normalizeDirName( entry.name );
      if ( IGNORED_DIRECTORIES.has( cleanName ) ) continue;

      const projectPath = path.join( currentDir, entry.name );
      const projectType = await detectProjectType( projectPath );

      if ( projectType )
      {
        // Project found: Register it and SHORT-CIRCUIT (do not scan inside it)
        projects.push( {
          name: entry.name,
          type: projectType,
          path: projectPath
        } );
      } else
      {
        // Not a project root: Dive deeper into subdirectories
        const nestedProjects = await scanDirectory( projectPath, currentDepth + 1 );
        projects.push( ...nestedProjects );
      }
    }

    return projects;
  } catch ( error )
  {
    return [];
  }
}

/**
 * Identifies the project type by analyzing key configuration files
 * @param {string} projectPath
 * @returns {Promise<string|null>}
 */
async function detectProjectType ( projectPath ) {
  const pkgPath = path.join( projectPath, 'package.json' );
  const pomPath = path.join( projectPath, 'pom.xml' );

  try
  {
    const pkgContent = await fs.promises.readFile( pkgPath, 'utf-8' );
    const pkg = JSON.parse( pkgContent );
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    const tags = [];
    if ( deps.react ) tags.push( 'React' );
    if ( deps.vite ) tags.push( 'Vite' );
    if ( deps[ '@angular/core' ] ) tags.push( 'Angular' );

    return tags.length > 0 ? tags.join( ' / ' ) : 'Node.js';
  } catch
  {
    // If there is no package.json or JSON.parse fails, we evaluate Java/other Java.
  }

  try
  {
    await fs.promises.access( pomPath );
    return 'Java (Maven)';
  } catch
  {
    // There is no pom.xml
  }

  return null;
}