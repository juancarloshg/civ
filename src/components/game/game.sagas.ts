import { takeLatest, call, throttle, put, takeEvery, select } from 'redux-saga/effects'

import { ActionTypes as KeyActionTypes, actions as keyActions } from '../keys/keys.actions'
import { actions as configurationActions } from '../configuration/configuration.actions'
import { ActionTypes as PlayerActionTypes, actions as playerActions } from './player/player.actions'
import { initPlayer } from './player/player.sagas'
import { keyBindings } from './player/controls'
import { initGrid } from './grid'
import { ActionTypes as UnitActionTypes } from './units/unit.actions'
import { Unit } from './units/unit.types'

import { getActivePlayerIds, getCurrentPlayerId, getNextActiveUnit } from './game.selectors'
import { ActionTypes, actions } from './game.actions'
import { getViewSize } from '../configuration/configuration.selector'
import { Size } from '../configuration/configuration.types'

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

function* handleWheel(action: ReturnType<typeof keyActions.wheel>) {
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

function* addPlayer(action: ReturnType<typeof playerActions.addPlayer>) {
    const playerId = action.payload.id

    yield put(actions.addPlayer(playerId))
}

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

function* selectNextActiveUnit() {
    const nextActiveUnit: Unit | null = yield select(getNextActiveUnit)
    yield put(actions.selectUnit(nextActiveUnit))
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GAME, initGame)
    yield takeLatest(PlayerActionTypes.SKIP_TURN, skipTurn)
    yield takeEvery(PlayerActionTypes.ADD_PLAYER, addPlayer)
    yield throttle(0, KeyActionTypes.KEYDOWN, handleKeydown)
    yield takeLatest(KeyActionTypes.WHEEL, handleWheel)
    yield takeLatest(
        [UnitActionTypes.MOVE_UNIT, ActionTypes.NEXT_TURN, ActionTypes.SET_CURRENT_PLAYER, UnitActionTypes.RESET_UNIT_MOVEMENTS],
        selectNextActiveUnit
    )
}
