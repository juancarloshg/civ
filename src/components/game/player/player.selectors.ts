import { createSelector } from 'reselect'
import { prop, equals, flatten } from 'ramda'

import { ApplicationState } from 'src/rootReducer'
import { Unit } from '../units/units'
import { Tile, TileWithUnits } from '../grid/grid.helpers'
import { PlayerState } from './player.reducer'
import { getUnits } from '../units/unit.selectors'
import { getGrid } from '../grid/grid.selectors'

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

export const getSelectedTileWithUnits = createSelector(
    getSelectedTile,
    getUnits,
    (tile, units): TileWithUnits | null =>
        tile && {
            ...tile,
            units: units.filter(({ position: { row, col } }) => row === tile.row && col === tile.col)
        }
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
