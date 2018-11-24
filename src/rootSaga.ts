import { all } from 'redux-saga/effects'
import { sagas as gameSagas } from './components/menu.sagas'

export function* rootSaga() {
    yield all([gameSagas])
}
