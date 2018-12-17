import { createSelector } from 'reselect'
import { prop, equals, flatten } from 'ramda'

import { ApplicationState } from '../../../rootReducer'

import { Unit } from '../units/units'
import { Tile } from '../grid/grid.helpers'
import { getUnits } from '../units/unit.selectors'
import { getGrid, getExtendedGrid } from '../grid/grid.selectors'

import { PlayerState } from './player.reducer'

const getRoot = (state: ApplicationState): PlayerState => state.player

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
    getUnits,
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

export const getAnyMovesLeft = createSelector(
    getUnits,
    units => units.some(unit => unit.movementsLeft !== 0)
)
