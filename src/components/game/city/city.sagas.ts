import { takeEvery, call, put, select } from 'redux-saga/effects'
import { ActionTypes, actions } from './city.actions'
import { GridPosition, getCircularPosition, getTileByPosition } from '../grid'

export function* calculateCityTiles(position: GridPosition) {
    const cityTiles = []
    for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
            if ((i == -2 || i == 2) && (j == -2 || j == 2)) {
                continue
            }
            const tilePosition = yield call(getCircularPosition, { row: position.row + i, col: position.col + j })
            const tile = yield select(getTileByPosition, tilePosition)
            if (!tile.owner) {
                tile.owner = 'me'
                cityTiles.push(tilePosition)
            }
        }
    }
    return []
}

function* createCity({ payload: { row, col } }: ReturnType<typeof actions.createCity>) {
    const city = { position: { row, col }, ownedTiles: yield call(calculateCityTiles, { row, col }) }

    yield put(actions.addCity(city))
}

export function* sagas() {
    yield takeEvery(ActionTypes.CREATE_CITY, createCity)
}
