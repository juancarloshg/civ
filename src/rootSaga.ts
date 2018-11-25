import { all, fork } from 'redux-saga/effects'
import { sagas as gameSagas } from './components/game/game.sagas'

export function* rootSaga() {
    yield all([fork(gameSagas)])
}
