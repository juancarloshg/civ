export const repeat = <T extends void>(times: number, fn: (i: number) => T) =>
    Array.apply(null, { length: times }).map((_: unknown, i: number) => fn(i)) as T[]

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export const randomFrom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

// tslint:disable-next-line:no-bitwise
export const getRandomColor = () => '#' + ((Math.random() * 0xffffff) << 0).toString(16)
