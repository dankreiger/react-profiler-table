import type { AnyCB, ProfilerData, TreeRenderArgs } from '../types';

export const compose = (...fns: Function[]) =>
  fns.reduceRight(
    (prevFn: Function, nextFn: Function) => (...args: any[]) =>
      nextFn(prevFn(...args)),
    (value: Function): Function => value
  );

export const legend: Record<keyof ProfilerData, string> = {
  id: 'the "id" prop of the Profiler tree that has just committed',
  phase:
    'either "mount" (if the tree just mounted) or "update" (if it re-rendered)',
  actualDuration: 'time spent rendering the committed update',
  baseDuration:
    'estimated time to render the entire subtree without memoization',
  startTime: 'when React began rendering this update',
  commitTime: 'when React committed this update',
  interactions: 'the Set of interactions belonging to this update',
};

let cancelTimeout = () => {};
const rdrs: ProfilerData[] = [];
const dataProperties = Object.keys(legend) as Array<keyof ProfilerData>;

const createTimeout = (callback: AnyCB, duration = 1000) => {
  const id = setTimeout(callback, duration);
  return () => {
    clearTimeout(id);
  };
};

const dataItemReducer = (args: TreeRenderArgs) => (
  acc: { [k in keyof ProfilerData]?: ProfilerData[keyof ProfilerData] },
  cur: keyof ProfilerData,
  idx: number
): object => ({ ...acc, [cur]: args[idx] });

const impureIdFn = <T, R>(fn: (x: T) => R) => (id: T): R | T => fn(id) || id;

export const onTreeRender = (
  optionalCallback: AnyCB = () => {
    console.table(legend);
  }
) => (...args: TreeRenderArgs) => {
  cancelTimeout();
  cancelTimeout = createTimeout(optionalCallback);

  compose(
    impureIdFn<ProfilerData, number>(rdrs.push),
    impureIdFn<ProfilerData, void>(console.table),

    dataProperties.reduce
  )(dataItemReducer(args), {});

  console.log(
    `\n%cRender count: %c${rdrs.length}%c\n${'_'.repeat(28)}\n\n\n`,
    'font-size: 16px; color: #20232a;',
    'padding: 15px; width: 80px; height: 80px; border-radius: 50%; background: #20232a; font-weight: bold; font-size: 20px; color: #61dafb;',
    ''
  );
};
