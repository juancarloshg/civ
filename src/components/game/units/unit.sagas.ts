import { select, call, put, takeLatest, takeEvery } from 'redux-saga/effects'

import { getSelectedUnit } from '../player/player.selectors'
import { actions as cityActions } from '../city/city.actions'
import { actions as playerActions, ActionTypes as PlayerActionTypes } from '../player/player.actions'
import { GridPosition, Grid, Tile, getGrid, getTileByPosition, getCircularIndex } from '../grid'

import { getUnits } from './unit.selectors'
import { actions, ActionTypes } from './unit.actions'
import { Unit } from './units'

type MovementDirection = 'north' | 'south' | 'east' | 'west' | 'southwest' | 'northwest' | 'southeast' | 'northeast'
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

function* getNextPosition(position: GridPosition, direction: MovementDirection) {
    const absPosition = getAbsolutePosition(position, direction)
    return { row: yield call(getCircularIndex, absPosition.row), col: yield call(getCircularIndex, absPosition.col) }
}

function getAbsolutePosition(position: GridPosition, direction: MovementDirection): GridPosition {
    switch (direction) {
        case 'north':
            return { row: position.row - 1, col: position.col }
        case 'south':
            return { row: position.row + 1, col: position.col }
        case 'southwest':
            return { row: position.row + 1, col: position.col - 1 }
        case 'southeast':
            return { row: position.row + 1, col: position.col + 1 }
        case 'northeast':
            return { row: position.row - 1, col: position.col + 1 }
        case 'northwest':
            return { row: position.row - 1, col: position.col - 1 }
        case 'west':
            return { row: position.row, col: position.col - 1 }
        case 'east':
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

function* handleUnitAction({ payload: { action, unit } }: ReturnType<typeof actions.unitAction>) {
    switch (action) {
        case 'create city':
            yield put(cityActions.createCity(unit.position))
            const tile: Tile | null = yield select(getTileByPosition, unit.position)
            yield put(playerActions.selectTile(tile!.id))
            yield put(actions.removeUnit(unit))
    }
}

export function* sagas() {
    yield takeLatest(PlayerActionTypes.NEXT_TURN, handleNextTurn)
    yield takeEvery(ActionTypes.UNIT_ACTION, handleUnitAction)
}
