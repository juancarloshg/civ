import { takeLatest, put, select, call } from 'redux-saga/effects'
import { actions, ActionTypes } from './game.actions'
import { TileMatrix, generateMap } from './game.helpers'
import { getSize } from '../configuration/configuration.selector'

function* initGame() {
    yield call(initGrid)
}

function* initGrid() {
    const size: number = yield select(getSize)
    const tiles: TileMatrix = yield generateMap(size)

    yield put(actions.initGridSuccess(tiles))
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GAME, initGame)
}
