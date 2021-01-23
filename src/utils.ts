interface SchedulerInteraction {
  id: number;
  name: string;
  timestamp: number;
}

interface ProfilerData {
  id: string;
  phase: 'mount' | 'update';
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<SchedulerInteraction>;
}

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
const rdrs: ProfilerData[] = [];

export const onTreeRender = (optionalCallback: Function = () => {}) => (
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
  interactions: Set<SchedulerInteraction>
) => {
  console.table(
    rdrs.push({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
    })
  );

  console.log(
    `\n%cRender count: %c${rdrs.length}%c\n${'_'.repeat(28)}\n\n\n`,
    'font-size: 16px; color: #20232a;',
    'padding: 15px; width: 80px; height: 80px; border-radius: 50%; background: #20232a; font-weight: bold; font-size: 20px; color: #61dafb;',
    ''
  );

  optionalCallback();
};
