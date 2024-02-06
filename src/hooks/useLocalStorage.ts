import { useState } from "react";

const useLocalStorage = (key: any, initialValue = null) => {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  const get = () => value;

  const set = (newValue: any) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const remove = () => {
    setValue(null);
    localStorage.removeItem(key);
  };

  return { get, set, remove };
};

export default useLocalStorage;
