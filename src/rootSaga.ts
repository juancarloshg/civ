import { all, fork } from 'redux-saga/effects'
import { sagas as menuSagas } from './components/menu/menu.sagas'
import { sagas as gridSagas } from './components/grid/grid.sagas'

export function* rootSaga() {
    yield all([fork(gridSagas), fork(menuSagas)])
}
