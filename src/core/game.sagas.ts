import { takeLatest, call, put, takeEvery } from 'redux-saga/effects'

import { ActionTypes as PlayerActionTypes, actions as playerActions } from './player/player.actions'
import { initPlayer } from './player/player.sagas'

import { ActionTypes, actions } from './game.actions'
import { initGrid } from './grid/grid.sagas'

function* initGame() {
    yield call(initGrid)
    yield call(initPlayer)
    yield call(initPlayer)

    yield put(actions.nextTurn())
}

function* addPlayer(action: ReturnType<typeof playerActions.addPlayer>) {
    const playerId = action.payload.id

    yield put(actions.addPlayer(playerId))
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GAME, initGame)
    yield takeEvery(PlayerActionTypes.ADD_PLAYER, addPlayer)
}
