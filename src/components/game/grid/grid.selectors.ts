import { createSelector, Selector, ParametricSelector } from 'reselect'

import { ApplicationState } from '../../../rootReducer'
import { getViewSize } from '../../configuration/configuration.selector'
import { getUnits } from '../units/unit.selectors'
import { Unit } from '../units/units'
import { getCities } from '../city/city.selector'
import { City } from '../city/city.reducer'

import { GridState, ViewGridOrigin } from './grid.reducer'
import { Grid, ExtendedGrid, Tile, ExtendedTile } from './grid.helpers'
import { GridPosition } from './grid.types'
import { flatten } from 'ramda'
import { Size } from '../../configuration/configuration.reducer'

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

const getCircularView = (viewGridOrigin: ViewGridOrigin, viewSize: Size, grid: ExtendedTile[][]): ExtendedGrid => {
    const vPadding = viewSize.height / 2
    const rowStart = viewGridOrigin.row - vPadding
    const rowEnd = viewGridOrigin.row + vPadding
    const hPadding = viewSize.width / 2
    const colStart = viewGridOrigin.col - hPadding
    const colEnd = viewGridOrigin.col + hPadding
    return circularSlice(grid, rowStart, rowEnd).map(tilesRow => circularSlice(tilesRow, colStart, colEnd))
}

const circularSlice = <T>(array: T[], start: number, end: number): T[] => {
    const rows = []
    if (start < 0) {
        rows.push(...array.slice(array.length + start))
    }
    rows.push(...array.slice(Math.max(0, start), Math.min(end, array.length)))
    if (end > array.length) {
        rows.push(...array.slice(0, end - array.length))
    }

    return rows
}

export const getMainViewGrid = createSelector(
    getViewGridOrigin,
    getViewSize,
    getExtendedGrid,
    getCircularView
)

export const getTileByPosition: ParametricSelector<ApplicationState, GridPosition, Tile | null> = createSelector(
    getGrid,
    (_: ApplicationState, position: GridPosition) => position,
    (grid, { row, col }) => flatten(grid).find(tile => tile.row === row && tile.col === col) || null
)
