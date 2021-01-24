import React, { Profiler, useCallback } from 'react';
import type { ComponentType, FC } from 'react';

import { onTreeRender } from './utils';
import { AnyCB } from './types';

export const withProfilerTable = <P extends object>(
  Component: ComponentType<P>,
  { id, callback: cb }: { id: string; callback?: AnyCB }
): FC<P> => {
  const profilerProps = {
    id,
    onRender: useCallback(onTreeRender(cb), [cb]),
  };
  return (props: P): JSX.Element => (
    <Profiler {...profilerProps}>
      <Component {...props} />
    </Profiler>
  );
};
