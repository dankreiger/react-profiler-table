import type { ReactNode } from 'react';

export interface ProfilerTableProps {
  id: string;
  callback?(...args: any[]): void;
  children?: ReactNode;
}
