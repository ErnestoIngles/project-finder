/**
 * @file ui/output.js
 * @description Manages process I/O stream redirection to isolate CLI visual UI from raw data output.
 */

let originalStdoutWrite = null;

/**
 * Redirects default stdout to stderr so interactive UI libraries (like @clack/prompts)
 * render directly to screen without polluting shell data streams.
 */
export function redirectUiToStderr() {
  originalStdoutWrite = process.stdout.write.bind(process.stdout);

  process.stdout.write = (chunk, encoding, callback) => {
    return process.stderr.write(chunk, encoding, callback);
  };
}

/**
 * Emits raw data strictly to the real, unpolluted process stdout stream.
 * @param {string} data - Raw data payload to return to shell wrapper.
 */
export function emitData(data) {
  if (originalStdoutWrite) {
    originalStdoutWrite(data);
  } else {
    process.stdout.write(data);
  }
}