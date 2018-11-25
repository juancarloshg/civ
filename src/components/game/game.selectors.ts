import { createSelector } from 'reselect'

import { ApplicationState } from 'src/rootReducer'
import { GameState } from './game.reducer'

const getRoot = (state: ApplicationState): GameState => state.game

export const getIsGridReady = createSelector(
    getRoot,
    (gameState: GameState) => gameState.isGridReady
)

export const getGrid = createSelector(
    getRoot,
    (gameState: GameState) => gameState.grid
)

export const getViewGrid = createSelector(
    getRoot,
    (gameState: GameState) => gameState.viewGrid
)
