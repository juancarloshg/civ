import { select, put, takeLatest } from 'redux-saga/effects'

import { getViewSize, getSize } from 'src/components/configuration/configuration.selector'

import { ActionTypes, actions } from './grid.actions'
import { TileMatrix, getViewTiles, generateMap } from './grid.helpers'
import { ViewGrid } from './grid.reducer'
import { getGrid, getViewGrid } from './grid.selectors'

export function* moveMap(direction: 'up' | 'down' | 'right' | 'left') {
    const tiles: TileMatrix = yield select(getGrid)
    const { row: currentRow, col: currentCol }: ViewGrid = yield select(getViewGrid)

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

function* updateViewGrid(tiles: TileMatrix, row: number, col: number) {
    const viewSize: number = yield select(getViewSize)

    if (row < 0 || col < 0 || row + viewSize > tiles.length || col + viewSize > tiles[0].length) {
        return
    }

    const viewTiles: TileMatrix = yield getViewTiles(tiles, viewSize, row, col)
    yield put(actions.setViewGrid({ row, col, grid: viewTiles }))
}

function* refreshViewGridTiles(action: ReturnType<typeof actions.setGrid>) {
    const tiles = action.payload
    const currentViewGrid: ViewGrid = yield select(getViewGrid)
    const row = currentViewGrid.row
    const col = currentViewGrid.col

    yield updateViewGrid(tiles, row, col)
}

export function* initGrid() {
    const size: number = yield select(getSize)
    const tiles: TileMatrix = yield generateMap(size)
    yield put(actions.setGrid(tiles))
}

export function* sagas() {
    yield takeLatest(ActionTypes.SET_GRID, refreshViewGridTiles)
}
