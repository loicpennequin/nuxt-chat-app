import { Entries } from '.';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

// typed version of OBject.entries
export function objectEntries<T extends object>(t: T): Entries<T>[] {
  return Object.entries(t) as any;
}

export function getRandomValueNotInArray(arr: number[], max: number) {
  const available = [];
  for (let i = 0; i <= max; i++) {
    if (!arr.includes(i)) available.push(i);
  }

  return available[Math.floor(Math.random() * available.length)];
}
