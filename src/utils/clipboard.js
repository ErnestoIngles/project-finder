import clipboard from 'clipboardy';

/**
 * Copia un texto o comando al portapapeles del sistema operativo
 * @param {string} text - Texto a copiar
 * @returns {boolean} True si se copió con éxito
 */
export function copyToClipboard(text) {
  try {
    clipboard.writeSync(text);
    return true;
  } catch (error) {
    return false;
  }
}