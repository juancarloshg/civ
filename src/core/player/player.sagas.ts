import { put, select } from 'redux-saga/effects'
import uniqueId from 'lodash.uniqueid'

import { createUnits } from '../units/unit.helpers'
import { Unit } from '../units/unit.types'
import { actions as unitActions } from '../units/unit.actions'

import { actions } from './player.actions'
import { Player } from '../game.types'
import { getPlayers } from './player.selectors'
import { getRandomColor, randomInteger } from '../../utils/utils'
import { getSize } from '../shared/configuration/configuration.selector'

export function* initPlayer() {
    const playerId = uniqueId('player')
    const size: number = yield select(getSize)
    const startingUnits: Unit[] = createUnits(['warrior', 'settler'], { row: randomInteger(0, size - 1), col: randomInteger(0, size - 1) })
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
