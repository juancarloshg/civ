import { select, put } from 'redux-saga/effects'

import { getSize } from '../../configuration/configuration.selector'

import { actions } from './grid.actions'
import { generateMap } from './mapGeneration'
import { getExtendedGrid, getViewGridOrigin } from './grid.selectors'
import { GridPosition, ExtendedGrid, Grid } from './grid.types'

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
