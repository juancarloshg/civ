import { takeLatest, call, throttle } from 'redux-saga/effects'

import { ActionTypes as KeyActionTypes, actions as keyActions } from '../keys/keys.actions'

import { initGrid } from './grid'
import { keyBindings } from './player/controls'

import { ActionTypes } from './game.actions'
import { initPlayer } from './player/player.sagas'

function* initGame() {
    yield call(initGrid)
    yield call(initPlayer)
    yield call(initPlayer)
}

function* handleKeydown(action: ReturnType<typeof keyActions.keydown>) {
    const key = action.payload.key
    const handler = keyBindings[key]
    if (handler) {
        yield handler()
    }
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GAME, initGame)
    yield throttle(0, KeyActionTypes.KEYDOWN, handleKeydown)
}
