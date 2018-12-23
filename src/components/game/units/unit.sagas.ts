import { select, call, put, takeLatest, takeEvery } from 'redux-saga/effects'

import { GridPosition, Grid, Tile, getGrid, getTileByPosition, getCircularPosition } from '../grid'
import { actions as cityActions } from '../city/city.actions'
import { actions as gameActions, ActionTypes as GameActionTypes } from '../game.actions'

import { actions, ActionTypes } from './unit.actions'
import { Unit } from './unit.types'
import { getSelectedUnit } from '../game.selectors'
import { removePlayerUnit } from '../player/player.sagas'

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
    yield put(actions.moveUnit(unit, nextPosition))
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
    return yield call(getCircularPosition, getAbsolutePosition(position, direction))
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
    yield put(actions.resetUnitMovements())
}

function* handleUnitAction({ payload: { action, unit } }: ReturnType<typeof actions.unitAction>) {
    switch (action) {
        case 'create city':
            yield put(cityActions.createCity(unit.position, unit.owner))
            const tile: Tile | null = yield select(getTileByPosition, unit.position)
            yield put(gameActions.selectTile(tile!.id))
            yield call(removePlayerUnit, unit)
            yield put(actions.removeUnit(unit))
    }
}

export function* sagas() {
    yield takeLatest(GameActionTypes.NEXT_TURN, handleNextTurn)
    yield takeEvery(ActionTypes.UNIT_ACTION, handleUnitAction)
}
