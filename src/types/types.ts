import type { ReactNode } from 'react';

export type AnyCB = (...args: any[]) => any;
export interface ProfilerTableOptions {
  id: string;
  callback?: AnyCB;
}

export interface ProfilerData {
  id: string;
  phase: 'mount' | 'update';
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<SchedulerInteraction>;
}

export interface ProfilerTableProps extends ProfilerTableOptions {
  children?: ReactNode;
}

export interface SchedulerInteraction {
  id: number;
  name: string;
  timestamp: number;
}

export type TreeRenderArgs = [
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
  interactions: Set<SchedulerInteraction>
];
