import { useState, useEffect } from "react";

interface StorageTypeProps {
  key: string;
  initialValue: any;
}

const useSessionStorage = ({ key, initialValue }: StorageTypeProps) => {
  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;
