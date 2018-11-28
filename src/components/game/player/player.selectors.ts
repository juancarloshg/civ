import { createSelector } from 'reselect'
import { prop, equals } from 'ramda'

import { ApplicationState } from 'src/rootReducer'
import { PlayerState } from './player.reducer'
import { Tile } from '../game.helpers'
import { Unit } from '../units/units'

const getRoot = (state: ApplicationState): PlayerState => state.player

export const getSelectedTile = createSelector(
    getRoot,
    prop('selectedTile')
)

export const getSelectedUnit = createSelector(
    getRoot,
    prop('selectedUnit')
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
