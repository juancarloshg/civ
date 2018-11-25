import { takeLatest, put, select, call, throttle } from 'redux-saga/effects'

import { actions, ActionTypes } from './game.actions'
import { ActionTypes as KeyActionTypes, KeydownAction } from '../keys/keys.actions'
import { TileMatrix, generateMap, getViewTiles } from './game.helpers'
import { getSize, getViewSize } from '../configuration/configuration.selector'
import { UnitType } from './units/units'
import { getGrid, getViewGrid } from './game.selectors'

function* initGame() {
    yield call(initGrid)
    yield call(initPlayer)
}

function* initGrid() {
    const size: number = yield select(getSize)
    const tiles: TileMatrix = yield generateMap(size)
    yield put(actions.initGrid(tiles))

    yield setViewGrid(tiles, 0, 0)
}

function* initPlayer() {
    const startingUnits: UnitType[] = ['warrior', 'settler']
    yield put(actions.initPlayer({ units: startingUnits }))
}

function* handleKeydown(action: KeydownAction) {
    const key = action.payload.key

    yield moveMap(key)
}

function* moveMap(key: string) {
    const supportedKeys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']
    if (!supportedKeys.includes(key)) {
        return
    }

    const tiles: TileMatrix = yield select(getGrid)
    const { row: currentRow, col: currentCol } = yield select(getViewGrid)

    switch (key) {
        case 'ArrowUp':
            return yield setViewGrid(tiles, currentRow - 1, currentCol)
        case 'ArrowDown':
            return yield setViewGrid(tiles, currentRow + 1, currentCol)
        case 'ArrowRight':
            return yield setViewGrid(tiles, currentRow, currentCol + 1)
        case 'ArrowLeft':
            return yield setViewGrid(tiles, currentRow, currentCol - 1)
    }
}

function* setViewGrid(tiles: TileMatrix, row: number, col: number) {
    // TODO: validate on the other limits
    if (row < 0 || col < 0) {
        return
    }
    const viewSize: number = yield select(getViewSize)
    const viewTiles: TileMatrix = yield getViewTiles(tiles, viewSize, row, col)
    yield put(actions.setViewGrid({ row, col, grid: viewTiles }))
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GAME, initGame)
    yield throttle(300, KeyActionTypes.KEYDOWN, handleKeydown)
}
