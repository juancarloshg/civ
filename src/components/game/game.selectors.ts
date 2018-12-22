import { createSelector } from 'reselect'
import { flatten, prop, equals } from 'ramda'

import { ApplicationState } from '../../rootReducer'
import { getGrid, getExtendedGrid, Tile } from './grid'
import { getExtendedUnits } from './units/unit.selectors'
import { GameState } from './game.reducer'
import { Unit } from './units/unit.types'

const getRoot = (state: ApplicationState): GameState => state.game

export const getSelectedTileId = createSelector(
    getRoot,
    prop('selectedTileId')
)

export const getSelectedTile = createSelector(
    getSelectedTileId,
    getGrid,
    (tileId, grid) => flatten(grid).find(tile => tile.id === tileId) || null
)

export const getSelectedExtendedTile = createSelector(
    getSelectedTileId,
    getExtendedGrid,
    (tileId, grid) => flatten(grid).find(tile => tile.id === tileId) || null
)

export const getSelectedUnitId = createSelector(
    getRoot,
    prop('selectedUnitId')
)

export const getSelectedUnit = createSelector(
    getSelectedUnitId,
    getExtendedUnits,
    (unitId, units) => units.find(unit => unit.id === unitId) || null
)

export const getTurn = createSelector(
    getRoot,
    prop('turn')
)

const getCurrentTileId = (_: ApplicationState, props: { tile: Tile }) => props.tile.id

export const getIsSelectedTile = createSelector(
    getSelectedTileId,
    getCurrentTileId,
    equals
)

const getCurrentUnit = (_: ApplicationState, props: { unit: Unit }) => props.unit

export const getIsSelectedUnit = createSelector(
    getSelectedUnit,
    getCurrentUnit,
    equals
)
