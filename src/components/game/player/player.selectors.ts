import { createSelector } from 'reselect'
import { prop, equals } from 'ramda'

import { ApplicationState } from 'src/rootReducer'
import { Unit } from '../units/units'
import { Tile, TileWithUnits } from '../grid/grid.helpers'
import { PlayerState } from './player.reducer'
import { getUnits } from '../units/unit.selectors'

const getRoot = (state: ApplicationState): PlayerState => state.player

export const getSelectedTile = createSelector(
    getRoot,
    prop('selectedTile')
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

const getCurrentTile = (_: ApplicationState, props: { tile: Tile }) => props.tile

export const getIsSelectedTile = createSelector(
    getSelectedTile,
    getCurrentTile,
    equals
)

const getCurrentUnit = (_: ApplicationState, props: { unit: Unit }) => props.unit

export const getIsSelectedUnit = createSelector(
    getSelectedUnit,
    getCurrentUnit,
    equals
)
