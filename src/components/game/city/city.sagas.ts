import { takeEvery, call, put, takeLatest } from 'redux-saga/effects'
import uniqueId from 'lodash.uniqueid'

import { actions as playerActions } from '../player/player.actions'
import { GridPosition, getCircularPosition } from '../grid'
import { ActionTypes, actions } from './city.actions'

export function* calculateCityTiles(position: GridPosition) {
    const cityTiles = []
    for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
            if ((i === -2 || i === 2) && (j === -2 || j === 2)) {
                continue
            }
            const tilePosition = yield call(getCircularPosition, { row: position.row + i, col: position.col + j })
            cityTiles.push(tilePosition)
        }
    }
    return cityTiles
}

function* createCity({ payload: { owner, position } }: ReturnType<typeof actions.createCity>) {
    const city = { id: uniqueId('city'), position, ownedTiles: yield call(calculateCityTiles, position) }
    yield put(playerActions.addCity(owner, city.id))
    yield put(actions.addCity(city))
}

function build({ payload: { city, buildKey } }: ReturnType<typeof actions.build>) {
    console.log('Building: ' + buildKey + ' in ' + city.id)
}

export function* sagas() {
    yield takeEvery(ActionTypes.CREATE_CITY, createCity)
    yield takeLatest(ActionTypes.BUILD, build)
}
