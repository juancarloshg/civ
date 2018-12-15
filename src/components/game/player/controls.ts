import { moveMap } from '../grid/grid.sagas'
import { attemptUnitMove } from '../units/unit.sagas'

export const keydownHandler: { [key: string]: () => void } = {
    // Grid controls
    ArrowUp: () => moveMap('up'),
    ArrowDown: () => moveMap('down'),
    ArrowRight: () => moveMap('right'),
    ArrowLeft: () => moveMap('left'),

    // Unit controls
    1: () => attemptUnitMove('left-down'),
    2: () => attemptUnitMove('down'),
    3: () => attemptUnitMove('right-down'),
    4: () => attemptUnitMove('left'),
    6: () => attemptUnitMove('right'),
    7: () => attemptUnitMove('left-up'),
    8: () => attemptUnitMove('up'),
    9: () => attemptUnitMove('right-up')
}
