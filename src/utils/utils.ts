export const repeat = <T extends void>(times: number, fn: (i: number) => T) =>
    Array.apply(null, { length: times }).map((_: unknown, i: number) => fn(i)) as T[]

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export const randomFrom = <T>(arr: T[]): T => arr[randomInteger(0, arr.length - 1)]

export const randomInteger = (min: number, max: number) => Math.floor(Math.random() * (max + 1)) + min

// tslint:disable-next-line:no-bitwise
export const getRandomColor = () => '#' + ((Math.random() * 0xffffff) << 0).toString(16)

export const removeByIndex = <T>(arr: T[], index: number): T[] => [...arr.slice(0, index), ...arr.slice(index + 1)]

export const updateByIndex = <T>(arr: T[], item: T, index: number): T[] => [...arr.slice(0, index), item, ...arr.slice(index + 1)]
