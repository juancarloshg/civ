import { takeLatest, call, throttle, put, takeEvery, select } from 'redux-saga/effects'

import { ActionTypes as KeyActionTypes, actions as keyActions } from '../keys/keys.actions'
import { ActionTypes as PlayerActionTypes, actions as playerActions } from './player/player.actions'

import { initGrid } from './grid'
import { keyBindings } from './player/controls'

import { ActionTypes, actions } from './game.actions'
import { initPlayer } from './player/player.sagas'
import { getActivePlayerIds, getPlayerMovingId } from './game.selectors'

function* initGame() {
    yield call(initGrid)
    yield call(initPlayer)
    yield call(initPlayer)

    yield put(actions.nextTurn())
}

function* handleKeydown(action: ReturnType<typeof keyActions.keydown>) {
    const key = action.payload.key
    const handler = keyBindings[key]
    if (handler) {
        yield handler()
    }
}

function* addPlayer(action: ReturnType<typeof playerActions.addPlayer>) {
    const playerId = action.payload.id

    yield put(actions.addPlayer(playerId))
}

export function* skipTurn() {
    yield put(actions.resetSelections())
    const currentPlayer: string = yield select(getPlayerMovingId)
    const players: string[] = yield select(getActivePlayerIds)
    const nextPlayerIndex = players.indexOf(currentPlayer) + 1
    if (nextPlayerIndex < players.length) {
        yield put(actions.setPlayerMoving(players[nextPlayerIndex]))
    } else {
        yield put(actions.nextTurn())
    }
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GAME, initGame)
    yield takeLatest(PlayerActionTypes.SKIP_TURN, skipTurn)
    yield takeEvery(PlayerActionTypes.ADD_PLAYER, addPlayer)
    yield throttle(0, KeyActionTypes.KEYDOWN, handleKeydown)
}
