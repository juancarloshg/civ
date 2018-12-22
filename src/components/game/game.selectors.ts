import { createSelector } from 'reselect'
import { flatten, prop, equals } from 'ramda'

import { ApplicationState } from '../../rootReducer'
import { getGrid, getExtendedGrid, Tile } from './grid'
import { getExtendedUnits, getUnits } from './units/unit.selectors'
import { GameState } from './game.reducer'
import { Unit } from './units/unit.types'
import { getPlayers } from './player/player.selectors'

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

export const getPlayerMovingId = createSelector(
    getRoot,
    prop('playerMovingId')
)

export const getPlayerMoving = createSelector(
    getPlayers,
    getPlayerMovingId,
    (players, playerId) => players.find(player => player.id === playerId)
)

const getPlayerMovingUnits = createSelector(
    getPlayerMoving,
    getUnits,
    (player, units) => (player ? units.filter(unit => player.unitIds.includes(unit.id)) : [])
)

export const getActivePlayerIds = createSelector(
    getRoot,
    prop('activePlayerIds')
)

export const getAnyMovesLeft = createSelector(
    getPlayerMovingUnits,
    units => units.some(unit => unit.movementsLeft !== 0)
)
