import { select, put } from 'redux-saga/effects'

import { actions } from './grid.actions'
import { generateMap } from './mapGeneration'
import { Grid } from './grid.types'
import { getSize } from '../shared/configuration/configuration.selector'

export function* initGrid() {
    const size: number = yield select(getSize)
    const tiles: Grid = yield generateMap(size)
    yield put(actions.setGrid(tiles))
}
