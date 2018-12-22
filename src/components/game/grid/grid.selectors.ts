import { createSelector, Selector, ParametricSelector } from 'reselect'
import { flatten, pick } from 'ramda'

import { ApplicationState } from '../../../rootReducer'
import { getViewSize } from '../../configuration/configuration.selector'
import { getExtendedUnits } from '../units/unit.selectors'
import { getCities } from '../city/city.selector'

import { GridState } from './grid.reducer'
import { getCircularView } from './grid.helpers'
import { GridPosition, ExtendedGrid, Tile } from './grid.types'
import { getPlayers } from '../player/player.selectors'

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
    getExtendedUnits,
    getCities,
    getPlayers,
    (grid, units, cities, players) => {
        const newGrid: ExtendedGrid = grid.map(row => row.map(tile => ({ ...tile, units: [], city: null, owner: null })))

        units.forEach(unit => newGrid[unit.position.row][unit.position.col].units.push(unit))
        cities.forEach(city => {
            newGrid[city.position.row][city.position.col].city = city
            const owner = players.find(player => player.cityIds.includes(city.id)) || null
            city.ownedTiles.forEach(position => (newGrid[position.row][position.col].owner = owner))
        })

        return newGrid
    }
)

export const getViewGridOrigin: Selector<ApplicationState, GridPosition> = createSelector(
    getRoot,
    (gameState: GridState) => gameState.viewGridOrigin
)

export const getMainViewGrid = createSelector(
    getViewGridOrigin,
    getViewSize,
    getExtendedGrid,
    getCircularView
)

export const getMainViewGridBorders = createSelector(
    getMainViewGrid,
    (grid: ExtendedGrid): GridPosition[] =>
        grid.reduce<GridPosition[]>(
            (borders, tiles, rowIndex) =>
                borders.concat(
                    rowIndex === 0 || rowIndex === grid.length - 1
                        ? tiles.map(({ row, col }) => ({ row, col }))
                        : [tiles[0], tiles[tiles.length - 1]].map(pick(['row', 'col']))
                ),
            []
        )
)

export const getTileByPosition: ParametricSelector<ApplicationState, GridPosition, Tile | null> = createSelector(
    getGrid,
    (_: ApplicationState, position: GridPosition) => position,
    (grid, { row, col }) => flatten(grid).find(tile => tile.row === row && tile.col === col) || null
)
