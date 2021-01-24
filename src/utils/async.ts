import { AnyCB } from '../types';

export const createTimeout = (callback: AnyCB, duration = 1000) => {
  const id = setTimeout(callback, duration);
  return () => {
    clearTimeout(id);
  };
};
