import { all, fork } from 'redux-saga/effects'
import { sagas as gameSagas } from './core/game.sagas'
import { sagas as unitSagas } from './core/units/unit.sagas'
import { sagas as citySagas } from './core/city/city.sagas'
import { sagas as turnSagas } from './core/turn.sagas'
import { sagas as userSagas } from './core/user.sagas'
import { sagas as uiSagas } from './core/ui.sagas'

export function* rootSaga() {
    yield all([gameSagas, unitSagas, citySagas, turnSagas, userSagas, uiSagas].map(fork))
}
