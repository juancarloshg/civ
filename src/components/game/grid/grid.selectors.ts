import { createSelector, Selector, ParametricSelector } from 'reselect'

import { ApplicationState } from 'src/rootReducer'
import { getViewSize } from 'src/components/configuration/configuration.selector'
import { getUnits } from '../units/unit.selectors'
import { Unit } from '../units/units'
import { getCities } from '../city/city.selector'
import { City } from '../city/city.reducer'

import { GridState, ViewGridOrigin } from './grid.reducer'
import { Grid, ExtendedGrid, Tile } from './grid.helpers'
import { GridPosition } from './grid.types'
import { flatten } from 'ramda'

const getRoot = (state: ApplicationState): GridState => state.grid

export const getIsGridReady = createSelector(
    getRoot,
    (gameState: GridState) => gameState.isGridReady
)

export const getGrid = createSelector(
    getRoot,
    (gameState: GridState) => gameState.grid
)

export const getExtendedGrid: Selector<ApplicationState, ExtendedGrid> = createSelector(
    getGrid,
    getUnits,
    getCities,
    (grid: Grid, units: Unit[], cities: City[]) => {
        const newGrid: ExtendedGrid = grid.map(row => row.map(tile => ({ ...tile, units: [], city: null })))

        units.forEach(unit => newGrid[unit.position.row][unit.position.col].units.push(unit))
        cities.forEach(city => (newGrid[city.position.row][city.position.col].city = city))

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
    getExtendedGrid,
    (viewGridOrigin, viewSize, grid): ExtendedGrid =>
        grid
            .slice(viewGridOrigin.row, viewSize + viewGridOrigin.row)
            .map(tilesRow => tilesRow.slice(viewGridOrigin.col, viewSize + viewGridOrigin.col))
)

export const getTileByPosition: ParametricSelector<ApplicationState, GridPosition, Tile | null> = createSelector(
    getGrid,
    (_: ApplicationState, position: GridPosition) => position,
    (grid, { row, col }) => flatten(grid).find(tile => tile.row === row && tile.col === col) || null
)
