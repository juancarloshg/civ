import { put, takeEvery } from 'redux-saga/effects'
import uniqueId from 'lodash.uniqueid'

import { getRandomColor } from '../../../utils/utils'
import { createUnits } from '../units/unit.helpers'
import { Unit } from '../units/unit.types'
import { actions as unitActions } from '../units/unit.actions'

import { actions, ActionTypes } from './player.actions'

export function* initPlayer() {
    const playerId = uniqueId('player')
    const startingUnits: Unit[] = createUnits(['warrior', 'settler'], { row: 0, col: 0 })
    yield put(actions.addPlayer({ id: playerId, color: getRandomColor(), cityIds: [], unitIds: startingUnits.map(unit => unit.id) }))
    yield put(unitActions.addUnits(startingUnits))
}

export function* sagas() {
    yield takeEvery(ActionTypes.INIT_PLAYER, initPlayer)
}
