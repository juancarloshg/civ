import { takeLatest, put, select, call, throttle, takeEvery } from 'redux-saga/effects'

import { ActionTypes as KeyActionTypes, actions as keyActions } from '../keys/keys.actions'
import { getSize, getViewSize } from '../configuration/configuration.selector'
import { actions, ActionTypes } from './game.actions'
import { TileMatrix, generateMap, getViewTiles } from './game.helpers'
import { Unit } from './units/units'
import { getGrid, getViewGrid } from './game.selectors'
import { createUnits } from './units/unit.helpers'
import { ViewGrid } from './game.reducer'

function* initGame() {
    yield call(initGrid)
    yield call(initPlayer)
}

function* initGrid() {
    const size: number = yield select(getSize)
    const tiles: TileMatrix = yield generateMap(size)
    yield put(actions.setGrid(tiles))
}

function* initPlayer() {
    const startingUnits: Unit[] = createUnits(['warrior', 'settler'], { row: 0, col: 0 })
    yield put(actions.initPlayer({ units: startingUnits }))
}

function* handleKeydown(action: ReturnType<typeof keyActions.keydown>) {
    const key = action.payload.key

    yield moveMap(key)
}

function* moveMap(key: string) {
    const supportedKeys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']
    if (!supportedKeys.includes(key)) {
        return
    }

    const tiles: TileMatrix = yield select(getGrid)
    const { row: currentRow, col: currentCol }: ViewGrid = yield select(getViewGrid)

    switch (key) {
        case 'ArrowUp':
            return yield updateViewGrid(tiles, currentRow - 1, currentCol)
        case 'ArrowDown':
            return yield updateViewGrid(tiles, currentRow + 1, currentCol)
        case 'ArrowRight':
            return yield updateViewGrid(tiles, currentRow, currentCol + 1)
        case 'ArrowLeft':
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

function* displayPlayerUnits(action: ReturnType<typeof actions.initPlayer>) {
    const units = action.payload.units
    if (!units) return

    const currentTiles: TileMatrix = yield select(getGrid)
    const tiles = currentTiles.map(row => row.slice())

    units.forEach(unit => {
        const tile = tiles[unit.position.row][unit.position.row]
        tile.units = [...tile.units, unit]
    })

    yield put(actions.setGrid(tiles))
}

function* refreshViewGridTiles(action: ReturnType<typeof actions.setGrid>) {
    const tiles = action.payload
    const currentViewGrid: ViewGrid = yield select(getViewGrid)
    const row = currentViewGrid.row
    const col = currentViewGrid.col

    yield updateViewGrid(tiles, row, col)
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GAME, initGame)
    yield takeLatest(ActionTypes.SET_GRID, refreshViewGridTiles)
    yield takeEvery(ActionTypes.INIT_PLAYER, displayPlayerUnits)
    yield throttle(0, KeyActionTypes.KEYDOWN, handleKeydown)
}
