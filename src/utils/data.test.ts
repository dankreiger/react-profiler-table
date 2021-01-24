import { legend, onTreeRender } from './data';

describe('data', () => {
  test('legend,', () => {
    expect(legend).toEqual({
      id: 'the "id" prop of the Profiler tree that has just committed',
      phase:
        'either "mount" (if the tree just mounted) or "update" (if it re-rendered)',
      actualDuration: 'time spent rendering the committed update',
      baseDuration:
        'estimated time to render the entire subtree without memoization',
      startTime: 'when React began rendering this update',
      commitTime: 'when React committed this update',
      interactions: 'the Set of interactions belonging to this update',
    });
  });

  test('onTreeRender', () => {
    expect(
      onTreeRender(() => {})(
        '123', // id
        'mount', // phase
        10000, // actualDuration
        100, // baseDuration
        0, // startTime
        234567, // commitTime
        new Set([
          {
            id: 123,
            name: '123',
            timestamp: 1234,
          },
        ]) // interactions:
      )
    ).toEqual([
      {
        actualDuration: 10000,
        baseDuration: 100,
        commitTime: 234567,
        id: '123',
        interactions: new Set([{ id: 123, name: '123', timestamp: 1234 }]),
        phase: 'mount',
        startTime: 0,
      },
    ]);
  });
});
