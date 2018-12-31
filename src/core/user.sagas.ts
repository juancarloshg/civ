import { throttle, select, put, takeLatest } from 'redux-saga/effects'

import { attemptUnitMove } from './units/unit.sagas'
import { ActionTypes as UserActionTypes, actions as userActions } from './user.actions'
import { actions as configurationActions } from './shared/configuration/configuration.actions'
import { actions as gridActions } from './grid/grid.actions'

import { Size } from './shared/shared.types'
import { Unit } from './units/unit.types'
import { skipTurn } from './turn.sagas'
import { getViewSize } from './shared/configuration/configuration.selector'
import { moveMap } from './ui.sagas'

const keyBindings: { [key: string]: () => void } = {
    // Grid controls
    ArrowUp: () => moveMap('north'),
    ArrowDown: () => moveMap('south'),
    ArrowRight: () => moveMap('east'),
    ArrowLeft: () => moveMap('west'),

    // Unit controls
    1: () => attemptUnitMove('southwest'),
    2: () => attemptUnitMove('south'),
    3: () => attemptUnitMove('southeast'),
    4: () => attemptUnitMove('west'),
    6: () => attemptUnitMove('east'),
    7: () => attemptUnitMove('northwest'),
    8: () => attemptUnitMove('north'),
    9: () => attemptUnitMove('northeast'),

    // Other controls
    Enter: () => skipTurn()
}

function* handleKeydown(action: ReturnType<typeof userActions.keydown>) {
    const key = action.payload.key
    const handler = keyBindings[key]
    if (handler) {
        yield handler()
    }
}

function* handleWheel(action: ReturnType<typeof userActions.wheel>) {
    const direction = action.payload.direction

    const viewSize: Size = yield select(getViewSize)
    const delta = 4

    switch (direction) {
        case 'in': {
            return yield put(configurationActions.configureGame({ viewSize: { height: viewSize.height - delta, width: viewSize.width - delta } }))
        }
        case 'out': {
            return yield put(configurationActions.configureGame({ viewSize: { height: viewSize.height + delta, width: viewSize.width + delta } }))
        }
    }
}

function* setViewGridOrigin(action: ReturnType<typeof userActions.selectUnit>) {
    const unit: Unit | null = action.payload
    if (unit) {
        yield put(gridActions.setViewGridOrigin(unit.position))
    }
}

export function* sagas() {
    yield takeLatest(UserActionTypes.WHEEL, handleWheel)
    yield throttle(0, UserActionTypes.KEYDOWN, handleKeydown)
    yield takeLatest(UserActionTypes.SELECT_UNIT, setViewGridOrigin)
}
