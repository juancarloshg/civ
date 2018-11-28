import { createSelector } from 'reselect'

import { ApplicationState } from 'src/rootReducer'
import { PlayerState } from './player.reducer'

const getRoot = (state: ApplicationState): PlayerState => state.player

export const getSelectedTile = createSelector(
    getRoot,
    (state: PlayerState) => state.selectedTile
)

export const getSelectedUnit = createSelector(
    getRoot,
    (state: PlayerState) => state.selectedUnit
)
