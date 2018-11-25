import { takeLatest, put, select, call } from 'redux-saga/effects'

import { actions, ActionTypes } from './game.actions'
import { TileMatrix, generateMap, getViewTiles } from './game.helpers'
import { getSize, getViewSize } from '../configuration/configuration.selector'
import { UnitType } from './units/units'

function* initGame() {
    yield call(initGrid)
    yield call(initPlayer)
}

function* initGrid() {
    const size: number = yield select(getSize)
    const tiles: TileMatrix = yield generateMap(size)
    yield put(actions.initGrid(tiles))

    const viewSize = yield select(getViewSize)
    const viewTiles = yield getViewTiles(tiles, viewSize)
    yield put(actions.initViewGrid(viewTiles))
}

function* initPlayer() {
    const startingUnits: UnitType[] = ['warrior', 'settler']
    yield put(actions.initPlayer({ units: startingUnits }))
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GAME, initGame)
}
