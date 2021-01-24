const composeArgs = {
  reducer: (prevFn: Function, nextFn: Function) => (...args: any[]) =>
    nextFn(prevFn(...args)),
  initial: (value: any): any => value,
};

export const compose = (...fns: Function[]) =>
  fns.reduceRight(composeArgs.reducer, composeArgs.initial);

export const identity = <T>(id: T) => id;

export const impureIdFn = <T, R>(fn: (x: T) => R) => (id: T): R | T =>
  fn(id) || id;

export const curriedReduce = <T>(items: T[] = []) => (
  reducer: (acc: T, cur: T) => T
) => (initial: T): T => items.reduce(reducer, initial);
