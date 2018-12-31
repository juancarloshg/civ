import { takeLatest, put, select } from 'redux-saga/effects'

import { ActionTypes as PlayerActionTypes } from './player/player.actions'

import { getActivePlayerIds, getCurrentPlayerId } from './game.selectors'
import { actions } from './game.actions'

export function* skipTurn() {
    yield put(actions.resetSelections())
    const currentPlayer: string = yield select(getCurrentPlayerId)
    const players: string[] = yield select(getActivePlayerIds)
    const nextPlayerIndex = players.indexOf(currentPlayer) + 1
    if (nextPlayerIndex < players.length) {
        yield put(actions.setCurrentPlayer(players[nextPlayerIndex]))
    } else {
        yield put(actions.nextTurn())
    }
}

export function* sagas() {
    yield takeLatest(PlayerActionTypes.SKIP_TURN, skipTurn)
}
