import { select, call } from 'redux-saga/effects'
import { getSize } from './configuration/configuration.selector'
import { GridPosition } from './shared.types'

export function* getCircularIndex(index: number) {
    const size: number = yield select(getSize)
    if (index < 0) {
        return size + index
    }
    if (index >= size) {
        return index - size
    }
    return index
}

export function* getCircularPosition(position: GridPosition) {
    return { row: yield call(getCircularIndex, position.row), col: yield call(getCircularIndex, position.col) }
}
