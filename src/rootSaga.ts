import { fork } from 'redux-saga/effects'
import { sagas as gameSagas } from './components/game/game.sagas'

export function* rootSaga() {
    yield fork(gameSagas)
}
