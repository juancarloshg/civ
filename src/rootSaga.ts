import { all, fork } from 'redux-saga/effects'
import { sagas as gameSagas } from './components/game/game.sagas'
import { sagas as unitSagas } from './components/game/units/unit.sagas'
import { sagas as citySagas } from './components/game/city/city.sagas'
import { sagas as gridSagas } from './components/game/grid/grid.sagas'

export function* rootSaga() {
    yield all([gameSagas, unitSagas, citySagas, gridSagas].map(fork))
}
