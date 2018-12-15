import { all, fork } from 'redux-saga/effects'
import { sagas as gameSagas } from './components/game/game.sagas'
import { sagas as playerSagas } from './components/game/player/player.sagas'

export function* rootSaga() {
    yield all([gameSagas, playerSagas].map(fork))
}
