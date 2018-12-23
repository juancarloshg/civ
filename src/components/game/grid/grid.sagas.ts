import { select, put, call } from 'redux-saga/effects'

import { getSize } from '../../configuration/configuration.selector'

import { actions } from './grid.actions'
import { generateMap } from './mapGeneration'
import { getExtendedGrid, getViewGridOrigin } from './grid.selectors'
import { GridPosition, ExtendedGrid, Grid } from './grid.types'
import { takeLatest } from 'redux-saga'
import { ActionTypes as GameActionTypes, actions as gameActions } from '../game.actions'
import { Unit } from '../units/unit.types'

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

    yield put(actions.setViewGridOrigin({ row, col }))
}

export function* initGrid() {
    const size: number = yield select(getSize)
    const tiles: Grid = yield generateMap(size)
    yield put(actions.setGrid(tiles))
}

export function* getCircularIndex(index: number) {
    const size: number = yield select(getSize)
    if (index < 0) {
        return size + index
    }
    if (index >= size) {
        return index - size
    }
    return index
}

export function* getCircularPosition(position: GridPosition) {
    return { row: yield call(getCircularIndex, position.row), col: yield call(getCircularIndex, position.col) }
}

function* setViewGridOrigin(action: ReturnType<typeof gameActions.selectUnit>) {
    const unit: Unit | null = action.payload
    if (unit) {
        yield put(actions.setViewGridOrigin(unit.position))
    }
}

export function* sagas() {
    yield takeLatest(GameActionTypes.SELECT_UNIT, setViewGridOrigin)
}
