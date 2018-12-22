import { all, fork } from 'redux-saga/effects'
import { sagas as gameSagas } from './components/game/game.sagas'
import { sagas as playerSagas } from './components/game/player/player.sagas'
import { sagas as unitSagas } from './components/game/units/unit.sagas'
import { sagas as citySagas } from './components/game/city/city.sagas'

export function* rootSaga() {
    yield all([gameSagas, playerSagas, unitSagas, citySagas].map(fork))
}
