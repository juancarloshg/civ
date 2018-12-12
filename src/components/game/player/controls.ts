import { moveMap } from '../grid/grid.sagas'

export const keydownHandler: { [key: string]: () => void } = {
    ArrowUp: () => moveMap('up'),
    ArrowDown: () => moveMap('down'),
    ArrowRight: () => moveMap('right'),
    ArrowLeft: () => moveMap('left')
}
