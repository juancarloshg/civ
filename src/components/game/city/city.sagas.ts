import { takeEvery, call, put } from 'redux-saga/effects'
import { ActionTypes, actions } from './city.actions'
import { GridPosition, getCircularPosition } from '../grid'

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

function* createCity({ payload: position }: ReturnType<typeof actions.createCity>) {
    const city = { position, ownedTiles: yield call(calculateCityTiles, position) }

    yield put(actions.addCity(city))
}

export function* sagas() {
    yield takeEvery(ActionTypes.CREATE_CITY, createCity)
}
