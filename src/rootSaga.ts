import { all } from 'redux-saga/effects'
import { sagas as menuSagas } from './components/menu/menu.sagas'

export function* rootSaga() {
    yield all([menuSagas])
}
