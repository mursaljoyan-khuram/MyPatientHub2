export function readList(key, fallback = []) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function writeList(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { console.error("Could not save app data", error); }
}

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
