export const repeat = <T extends void>(times: number, fn: (i: number) => T) =>
  Array.apply(null, { length: times }).map((_: any, i: number) => fn(i)) as T[];
