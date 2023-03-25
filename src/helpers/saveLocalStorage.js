export function saveLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Não foi possível salvar a ${key} no local storage:
    Erro ${error.message}`);
  }
}

export function getLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Não foi possível recuperar ${key} do local storage:
    Erro ${error.message}`);
    return null;
  }
}
