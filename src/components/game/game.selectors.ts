import { createSelector } from 'reselect'

import { ApplicationState } from 'src/rootReducer'
import { GameState } from './game.reducer'

const getRoot = (state: ApplicationState): GameState => state.game

export const getGrid = createSelector(
    getRoot,
    (gameState: GameState) => gameState.grid
)
