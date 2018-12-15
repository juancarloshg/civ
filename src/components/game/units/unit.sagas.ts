import { select, call, put, takeLatest } from 'redux-saga/effects'
import { getSelectedUnit } from '../player/player.selectors'
import { Unit } from './units'
import { GridPosition } from '../grid/grid.types'
import { getGrid } from '../grid/grid.selectors'
import { Grid } from '../grid/grid.helpers'
import { getUnits } from './unit.selectors'
import { actions } from './unit.actions'
import { ActionTypes as PlayerActionTypes } from '../player/player.actions'

type MovementDirection = 'up' | 'down' | 'right' | 'left' | 'left-down' | 'left-up' | 'right-down' | 'right-up'
export function* attemptUnitMove(direction: MovementDirection) {
    const unit: Unit | null = yield select(getSelectedUnit)
    if (!unit) return

    const nextPosition: GridPosition = yield call(getNextPosition, unit.position, direction)
    const validMovement: boolean = yield call(isMovementPossible, unit, nextPosition)

    if (validMovement) {
        yield call(moveUnit, unit, nextPosition)
    }
}

function* moveUnit(unit: Unit, nextPosition: GridPosition) {
    const units: Unit[] = yield select(getUnits)
    const movedUnitIndex = units.map(u => u.id).indexOf(unit.id)
    const movedUnit = { ...unit, position: nextPosition, movementsLeft: unit.movementsLeft - 1 }
    const newUnits = [...units.slice(0, movedUnitIndex), movedUnit, ...units.slice(movedUnitIndex + 1)]
    yield put(actions.setUnits(newUnits))
}

function isMovementPossible(unit: Unit, nextPosition: GridPosition) {
    // TODO: is tile available? (mountain, other player?)
    return isInsideMap(nextPosition) && hasMovement(unit)
}

function* isInsideMap(nextPosition: GridPosition) {
    const grid: Grid = yield select(getGrid)
    return Boolean(grid[nextPosition.row] && grid[nextPosition.col])
}

function hasMovement(unit: Unit) {
    return unit.movementsLeft > 0
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

function* handleNextTurn() {
    const units: Unit[] = yield select(getUnits)
    const newUnits = units.map(unit => ({
        ...unit,
        movementsLeft: unit.movement
    }))

    yield put(actions.setUnits(newUnits))
}

export function* sagas() {
    yield takeLatest(PlayerActionTypes.NEXT_TURN, handleNextTurn)
}
