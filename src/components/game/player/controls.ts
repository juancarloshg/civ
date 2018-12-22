import { moveMap } from '../grid'
import { attemptUnitMove } from '../units/unit.sagas'
import { skipTurn } from '../game.sagas'

export const keyBindings: { [key: string]: () => void } = {
    // Grid controls
    ArrowUp: () => moveMap('north'),
    ArrowDown: () => moveMap('south'),
    ArrowRight: () => moveMap('east'),
    ArrowLeft: () => moveMap('west'),

    // Unit controls
    1: () => attemptUnitMove('southwest'),
    2: () => attemptUnitMove('south'),
    3: () => attemptUnitMove('southeast'),
    4: () => attemptUnitMove('west'),
    6: () => attemptUnitMove('east'),
    7: () => attemptUnitMove('northwest'),
    8: () => attemptUnitMove('north'),
    9: () => attemptUnitMove('northeast'),

    // Other controls
    Enter: () => skipTurn()
}
