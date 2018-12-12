import { takeLatest, put, select, call, throttle, takeEvery } from 'redux-saga/effects'

import { ActionTypes as KeyActionTypes, actions as keyActions } from '../keys/keys.actions'

import { Unit } from './units/units'
import { createUnits } from './units/unit.helpers'
import { TileMatrix } from './grid/grid.helpers'
import { actions as gridActions } from './grid/grid.actions'
import { initGrid } from './grid/grid.sagas'
import { keydownHandler } from './player/controls'
import { getGrid } from './grid/grid.selectors'

import { actions, ActionTypes } from './game.actions'

function* initGame() {
    yield call(initGrid)
    yield call(initPlayer)
}

function* initPlayer() {
    const startingUnits: Unit[] = createUnits(['warrior', 'settler'], { row: 0, col: 0 })
    yield put(actions.initPlayer({ units: startingUnits }))
}

function* handleKeydown(action: ReturnType<typeof keyActions.keydown>) {
    const key = action.payload.key

    yield call(keydownHandler[key])
}

function* displayPlayerUnits(action: ReturnType<typeof actions.initPlayer>) {
    const units = action.payload.units
    if (!units) return

    const currentTiles: TileMatrix = yield select(getGrid)
    const tiles = currentTiles.map(row => row.slice())

    units.forEach(unit => {
        const tile = tiles[unit.position.row][unit.position.row]
        tile.units = [...tile.units, unit]
    })

    yield put(gridActions.setGrid(tiles))
}

export function* sagas() {
    yield takeLatest(ActionTypes.INIT_GAME, initGame)
    yield takeEvery(ActionTypes.INIT_PLAYER, displayPlayerUnits)
    yield throttle(0, KeyActionTypes.KEYDOWN, handleKeydown)
}
