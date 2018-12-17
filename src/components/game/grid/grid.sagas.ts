import { select, put } from 'redux-saga/effects'

import { getViewSize, getSize } from '../../configuration/configuration.selector'

import { actions } from './grid.actions'
import { Grid, generateMap, ExtendedGrid } from './grid.helpers'
import { getExtendedGrid, getViewGridOrigin } from './grid.selectors'
import { ViewGridOrigin } from './grid.reducer'

export function* moveMap(direction: 'north' | 'south' | 'east' | 'west') {
    const tiles: ExtendedGrid = yield select(getExtendedGrid)
    const { row: currentRow, col: currentCol }: ViewGridOrigin = yield select(getViewGridOrigin)

    switch (direction) {
        case 'north':
            return yield updateViewGrid(tiles, currentRow - 1, currentCol)
        case 'south':
            return yield updateViewGrid(tiles, currentRow + 1, currentCol)
        case 'east':
            return yield updateViewGrid(tiles, currentRow, currentCol + 1)
        case 'west':
            return yield updateViewGrid(tiles, currentRow, currentCol - 1)
    }
}

function* updateViewGrid(tiles: ExtendedGrid, row: number, col: number) {
    const viewSize: number = yield select(getViewSize)

    if (row < 0 || col < 0 || row + viewSize > tiles.length || col + viewSize > tiles[0].length) {
        return
    }

    yield put(actions.setViewGridOrigin({ row, col }))
}

export function* initGrid() {
    const size: number = yield select(getSize)
    const tiles: Grid = yield generateMap(size)
    yield put(actions.setGrid(tiles))
}
