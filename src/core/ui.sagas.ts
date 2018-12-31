import { takeLatest, select, put } from 'redux-saga/effects'

import { Unit } from './units/unit.types'
import { getNextActiveUnit } from './game.selectors'
import { ActionTypes as UnitActionTypes } from './units/unit.actions'
import { actions as userActions } from './user.actions'
import { ActionTypes as GameActionTypes } from './game.actions'
import { GridPosition, ExtendedGrid } from './shared/shared.types'
import { getViewGridOrigin } from './grid/grid.selectors'
import { getExtendedGrid } from './shared/shared.selectors'
import { actions as gridActions } from './grid/grid.actions'

function* selectNextActiveUnit() {
    const nextActiveUnit: Unit | null = yield select(getNextActiveUnit)
    yield put(userActions.selectUnit(nextActiveUnit))
}

export function* moveMap(direction: 'north' | 'south' | 'east' | 'west') {
    const { row: currentRow, col: currentCol }: GridPosition = yield select(getViewGridOrigin)

    switch (direction) {
        case 'north':
            return yield updateViewGrid(currentRow - 1, currentCol)
        case 'south':
            return yield updateViewGrid(currentRow + 1, currentCol)
        case 'east':
            return yield updateViewGrid(currentRow, currentCol + 1)
        case 'west':
            return yield updateViewGrid(currentRow, currentCol - 1)
    }
}

function* updateViewGrid(row: number, col: number) {
    const tiles: ExtendedGrid = yield select(getExtendedGrid)

    if (row < 0) {
        row = tiles.length + row
    } else if (row > tiles.length) {
        row = row - tiles.length
    }

    if (col < 0) {
        col = tiles[0].length + col
    } else if (col > tiles[0].length) {
        col = col - tiles[0].length
    }

    yield put(gridActions.setViewGridOrigin({ row, col }))
}

export function* sagas() {
    yield takeLatest(
        [UnitActionTypes.MOVE_UNIT, GameActionTypes.NEXT_TURN, GameActionTypes.SET_CURRENT_PLAYER, UnitActionTypes.RESET_UNIT_MOVEMENTS],
        selectNextActiveUnit
    )
}
