import { select, call, put } from 'redux-saga/effects'
import { getSelectedUnit } from '../player/player.selectors'
import { Unit } from './units'
import { GridPosition } from '../grid/grid.types'
import { getGrid } from '../grid/grid.selectors'
import { Grid } from '../grid/grid.helpers'
import { getUnits } from './unit.selectors'
import { actions } from './unit.actions'

type MovementDirection = 'up' | 'down' | 'right' | 'left' | 'left-down' | 'left-up' | 'right-down' | 'right-up'
export function* attemptUnitMove(direction: MovementDirection) {
    const unit: Unit | null = yield select(getSelectedUnit)
    if (!unit) return
    // TODO: return if no movements left or not player's turn
    const nextPosition: GridPosition = yield call(getNextPosition, unit.position, direction)
    const validMovement: boolean = yield call(isMovementPossible, nextPosition)

    if (validMovement) {
        yield call(moveUnit, unit, nextPosition)
    }
}

function* moveUnit(unit: Unit, nextPosition: GridPosition) {
    const units: Unit[] = yield select(getUnits)
    const movedUnitIndex = units.map(u => u.id).indexOf(unit.id)
    const movedUnit = { ...unit, position: nextPosition }
    const newUnits = [...units.slice(0, movedUnitIndex), movedUnit, ...units.slice(movedUnitIndex + 1)]
    yield put(actions.setUnits(newUnits))
}

function* isMovementPossible(nextPosition: GridPosition) {
    // TODO: is tile available? (mountain, other player?)
    const grid: Grid = yield select(getGrid)
    return Boolean(grid[nextPosition.row] && grid[nextPosition.col])
}

function getNextPosition(position: GridPosition, direction: MovementDirection): GridPosition {
    switch (direction) {
        case 'up':
            return { row: position.row - 1, col: position.col }
        case 'down':
            return { row: position.row + 1, col: position.col }
        case 'left-down':
            return { row: position.row + 1, col: position.col - 1 }
        case 'right-down':
            return { row: position.row + 1, col: position.col + 1 }
        case 'right-up':
            return { row: position.row - 1, col: position.col + 1 }
        case 'left-up':
            return { row: position.row - 1, col: position.col - 1 }
        case 'left':
            return { row: position.row, col: position.col - 1 }
        case 'right':
            return { row: position.row, col: position.col + 1 }
    }
}
