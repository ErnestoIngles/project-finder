import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Gets the current application version from the package.json file
 * @returns {string} The version in SemVer format
*/
export function getAppVersion () {
  try
  {
    const __filename = fileURLToPath( import.meta.url );
    const __dirname = path.dirname( __filename );

    const packageJsonPath = path.resolve( __dirname, '../../package.json' );
    const pkg = JSON.parse( fs.readFileSync( packageJsonPath, 'utf-8' ) );

    return pkg.version;
  } catch
  {
    return 'VERSION NOT FOUND';
  }
}