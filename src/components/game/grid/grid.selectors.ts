import { createSelector, Selector } from 'reselect'

import { ApplicationState } from 'src/rootReducer'
import { GridState, ViewGrid } from './grid.reducer'

const getRoot = (state: ApplicationState): GridState => state.grid

export const getIsGridReady = createSelector(
    getRoot,
    (gameState: GridState) => gameState.isGridReady
)

export const getGrid = createSelector(
    getRoot,
    (gameState: GridState) => gameState.grid
)

export const getViewGrid: Selector<ApplicationState, ViewGrid> = createSelector(
    getRoot,
    (gameState: GridState) => gameState.viewGrid
)
