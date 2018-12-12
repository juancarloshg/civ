import { all, fork } from 'redux-saga/effects'
import { sagas as gameSagas } from './components/game/game.sagas'
import { sagas as gridSagas } from './components/game/grid/grid.sagas'

export function* rootSaga() {
    yield all([gameSagas, gridSagas].map(fork))
}
