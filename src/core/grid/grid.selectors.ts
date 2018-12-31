import { createSelector, Selector, ParametricSelector } from 'reselect'
import { flatten } from 'ramda'

import { GridState } from './grid.reducer'
import { Tile } from './grid.types'
import { ApplicationState } from '../../rootReducer'
import { GridPosition } from '../shared/shared.types'

const getRoot = (state: ApplicationState): GridState => state.grid

export const getIsGridReady = createSelector(
    getRoot,
    (gameState: GridState) => gameState.isGridReady
)

export const getGrid = createSelector(
    getRoot,
    (gameState: GridState) => gameState.grid
)

export const getViewGridOrigin: Selector<ApplicationState, GridPosition> = createSelector(
    getRoot,
    (gameState: GridState) => gameState.viewGridOrigin
)

export const getTileByPosition: ParametricSelector<ApplicationState, GridPosition, Tile | null> = createSelector(
    getGrid,
    (_: ApplicationState, position: GridPosition) => position,
    (grid, { row, col }) => flatten(grid).find(tile => tile.row === row && tile.col === col) || null
)
