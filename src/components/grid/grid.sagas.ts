import { takeLatest, put, select } from 'redux-saga/effects'
import { actions, ActionTypes } from './grid.actions'
import { TileMatrix, generateMap } from './grid.helpers'
import { getSize } from '../configuration/configuration.selector'

function* initGrid() {
    console.log('hello')
    const size: number = yield select(getSize)
    const tiles: TileMatrix = yield generateMap(size)

    yield put(actions.initGridSuccess(tiles))
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GRID, initGrid)
}
