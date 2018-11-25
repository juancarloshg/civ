import { takeLatest, put, select, call } from 'redux-saga/effects'

import { actions, ActionTypes } from './game.actions'
import { TileMatrix, generateMap } from './game.helpers'
import { getSize } from '../configuration/configuration.selector'
import { UnitType } from './units/units'

function* initGame() {
    yield call(initGrid)
    yield call(initPlayer)
}

function* initGrid() {
    const size: number = yield select(getSize)
    const tiles: TileMatrix = yield generateMap(size)

    yield put(actions.initGrid(tiles))
}

function* initPlayer() {
    const startingUnits: UnitType[] = ['warrior', 'settler']
    yield put(actions.initPlayer({ units: startingUnits }))
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GAME, initGame)
}
