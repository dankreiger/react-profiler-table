import React, { Profiler, useCallback } from 'react';
import type { ComponentType, FC } from 'react';

import { onTreeRender } from './utils';
import { AnyCallback } from './types';

export const withProfilerTable = <P extends object>(
  Component: ComponentType<P>,
  { id, callback: cb }: { id: string; callback: AnyCallback }
): FC<P> => {
  const onRender = useCallback(onTreeRender(cb), [cb]);
  return (props: P): JSX.Element => (
    <Profiler {...{ id, onRender }}>
      <Component {...props} />
    </Profiler>
  );
};
