import { put, select } from 'redux-saga/effects'
import uniqueId from 'lodash.uniqueid'

import { createUnits } from '../units/unit.helpers'
import { Unit } from '../units/unit.types'
import { actions as unitActions } from '../units/unit.actions'

import { actions } from './player.actions'
import { Player } from '../game.types'
import { getPlayers } from './player.selectors'
import { getRandomColor } from '../../utils/utils'

export function* initPlayer() {
    const playerId = uniqueId('player')
    const startingUnits: Unit[] = createUnits(['warrior', 'settler'], { row: 0, col: 0 })
    const player: Player = { id: playerId, color: getRandomColor(), cityIds: [], unitIds: startingUnits.map(unit => unit.id) }
    yield put(actions.addPlayer(player))
    yield put(unitActions.addUnits(startingUnits))

    return player
}

export function* removePlayerUnit(removedUnit: Unit) {
    const players: Player[] = yield select(getPlayers)
    const targetPlayer = players.find(player => player.unitIds.includes(removedUnit.id))

    yield put(actions.removeUnit(targetPlayer!, removedUnit))
}
