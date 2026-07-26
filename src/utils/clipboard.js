import clipboard from 'clipboardy';

/**
 * Copies text or a command to the operating system's clipboard
 * @param {string} text - Text to copy
 * @returns {boolean} True if copied successfully
 */
export function copyToClipboard(text) {
  try {
    clipboard.writeSync(text);
    return true;
  } catch (error) {
    return false;
  }
}