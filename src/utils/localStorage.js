const LocalStorage = () => {
  const get = (key) => {
    const item = localStorage.getItem(key);

    if (item) return JSON.parse(item);
    else return item;
  };

  const set = (key, value) => {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  };

  return { get, set };
};

export { LocalStorage };
