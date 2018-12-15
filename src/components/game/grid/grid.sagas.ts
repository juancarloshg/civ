import { select, put } from 'redux-saga/effects'

import { getViewSize, getSize } from 'src/components/configuration/configuration.selector'

import { actions } from './grid.actions'
import { Grid, generateMap, GridWithUnits } from './grid.helpers'
import { getGridWithUnits, getViewGridOrigin } from './grid.selectors'
import { ViewGridOrigin } from './grid.reducer'

export function* moveMap(direction: 'up' | 'down' | 'right' | 'left') {
    const tiles: GridWithUnits = yield select(getGridWithUnits)
    const { row: currentRow, col: currentCol }: ViewGridOrigin = yield select(getViewGridOrigin)

    switch (direction) {
        case 'up':
            return yield updateViewGrid(tiles, currentRow - 1, currentCol)
        case 'down':
            return yield updateViewGrid(tiles, currentRow + 1, currentCol)
        case 'right':
            return yield updateViewGrid(tiles, currentRow, currentCol + 1)
        case 'left':
            return yield updateViewGrid(tiles, currentRow, currentCol - 1)
    }
}

function* updateViewGrid(tiles: GridWithUnits, row: number, col: number) {
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
