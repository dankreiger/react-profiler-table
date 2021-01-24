import type { AnyCB, ProfilerData } from '../types';
import { ProfileDataReducer } from '../types/data';
import { createTimeout } from './async';

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
const renderDataProperties = Object.keys(legend) as Array<keyof ProfilerData>;
const rdrs: ProfilerData[] = [];

const dataItemHigherOrderReducer = (
  args: Array<ProfilerData[keyof ProfilerData]>
): ProfileDataReducer => (acc, cur, idx) => ({ ...acc, [cur]: args[idx] });

let cancelOptionalCallbackTimeout = () => {};

export const onTreeRender = (
  optionalCallback: AnyCB = () => {
    console.table(legend);
  }
) => (...args: Array<ProfilerData[keyof ProfilerData]>) => {
  cancelOptionalCallbackTimeout();
  cancelOptionalCallbackTimeout = createTimeout(optionalCallback);

  rdrs.push(
    renderDataProperties.reduce(
      dataItemHigherOrderReducer(args),
      {} as ProfilerData
    )
  );
  console.table(rdrs);
  console.log(
    `\n%cRender count: %c${rdrs.length}%c\n${'_'.repeat(28)}\n\n\n`,
    'font-size: 16px; color: #20232a;',
    'padding: 15px; width: 80px; height: 80px; border-radius: 50%; background: #20232a; font-weight: bold; font-size: 20px; color: #61dafb;',
    ''
  );
  return rdrs;
};
