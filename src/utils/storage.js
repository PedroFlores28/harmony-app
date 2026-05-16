/**
 * Abstracción de Storage para manejar bloqueos en iframes cross-origin
 */
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`[Storage] Error al leer ${key}:`, e);
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[Storage] Error al escribir ${key}:`, e);
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[Storage] Error al borrar ${key}:`, e);
    }
  },
  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('[Storage] Error al limpiar localStorage:', e);
    }
  }
};

export default storage;
