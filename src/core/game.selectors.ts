import { createSelector } from 'reselect'
import { flatten, prop, equals } from 'ramda'

import { ApplicationState } from '../rootReducer'
import { getUnits } from './units/unit.selectors'
import { GameState } from './game.reducer'
import { Unit } from './units/unit.types'
import { getPlayers } from './player/player.selectors'
import { getExtendedGrid, getExtendedUnits } from './shared/shared.selectors'
import { getGrid } from './grid/grid.selectors'
import { Tile } from './grid/grid.types'

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

export const getCurrentPlayerId = createSelector(
    getRoot,
    prop('currentPlayerId')
)

export const getCurrentPlayer = createSelector(
    getPlayers,
    getCurrentPlayerId,
    (players, playerId) => players.find(player => player.id === playerId)
)

export const getCurrentPlayerUnits = createSelector(
    getCurrentPlayer,
    getUnits,
    (player, units) => (player ? units.filter(unit => player.unitIds.includes(unit.id)) : [])
)

export const getActiveUnits = createSelector(
    getCurrentPlayerUnits,
    units => units.filter(unit => unit.movementsLeft > 0) || null
)

export const getNextActiveUnit = createSelector(
    getActiveUnits,
    units => units.find(unit => unit.movementsLeft > 0) || null
)

export const getActivePlayerIds = createSelector(
    getRoot,
    prop('activePlayerIds')
)

export const getAnyMovesLeft = createSelector(
    getCurrentPlayerUnits,
    units => units.some(unit => unit.movementsLeft !== 0)
)
