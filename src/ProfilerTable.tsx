import React, {Profiler} from 'react';
import type { FC } from 'react';

import { onTreeRender } from './utils';
import { ProfilerTableProps } from './types';



export const ProfilerTable: FC<ProfilerTableProps> = ({
  id,
  callback,
  children,
}: ProfilerTableProps): JSX.Element => (
  <Profiler id={id} onRender={onTreeRender(callback)}>
    {children}
  </Profiler>
);

