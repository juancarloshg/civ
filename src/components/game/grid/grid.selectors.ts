import { createSelector, Selector } from 'reselect'

import { ApplicationState } from 'src/rootReducer'
import { GridState, ViewGridOrigin } from './grid.reducer'
import { Grid, GridWithUnits } from './grid.helpers'
import { getUnits } from '../units/unit.selectors'
import { Unit } from '../units/units'
import { getViewSize } from 'src/components/configuration/configuration.selector'

const getRoot = (state: ApplicationState): GridState => state.grid

export const getIsGridReady = createSelector(
    getRoot,
    (gameState: GridState) => gameState.isGridReady
)

export const getGrid = createSelector(
    getRoot,
    (gameState: GridState) => gameState.grid
)

export const getGridWithUnits = createSelector(
    getGrid,
    getUnits,
    (grid: Grid, units: Unit[]) => {
        const newGrid: GridWithUnits = grid.map(row => row.map(tile => ({ ...tile, units: [] })))
        units.forEach(unit => newGrid[unit.position.row][unit.position.col].units.push(unit))
        return newGrid
    }
)

export const getViewGridOrigin: Selector<ApplicationState, ViewGridOrigin> = createSelector(
    getRoot,
    (gameState: GridState) => gameState.viewGridOrigin
)

export const getViewGrid = createSelector(
    getViewGridOrigin,
    getViewSize,
    getGridWithUnits,
    (viewGridOrigin, viewSize, grid): GridWithUnits =>
        grid
            .slice(viewGridOrigin.row, viewSize + viewGridOrigin.row)
            .map(tilesRow => tilesRow.slice(viewGridOrigin.col, viewSize + viewGridOrigin.col))
)
