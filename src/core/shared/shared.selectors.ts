import { pick } from 'ramda'
import { createSelector, Selector } from 'reselect'

import { getCities } from '../city/city.selector'
import { City } from '../city/city.types'
import { getCityYield, getCityIcon } from '../city/city.helper'
import { getPlayers } from '../player/player.selectors'
import { ExtendedCity, ExtendedGrid, GridPosition, ExtendedUnit } from './shared.types'
import { ApplicationState } from '../../rootReducer'
import { getGrid, getViewGridOrigin } from '../grid/grid.selectors'
import { Grid } from '../grid/grid.types'
import { getViewSize } from './configuration/configuration.selector'
import { getCircularView } from './shared.helpers'
import { getUnits } from '../units/unit.selectors'
import { Unit } from '../units/unit.types'

export const getExtendedCities: Selector<ApplicationState, ExtendedCity[]> = createSelector(
    getCities,
    getGrid,
    (cities: City[], grid: Grid) => {
        return cities.map(city => ({ ...city, yield: getCityYield(city, grid), icon: getCityIcon(city), prodSurplus: 0 }))
    }
)

export const getExtendedUnits = createSelector(
    getUnits,
    getPlayers,
    (units, players): ExtendedUnit[] => {
        return players.reduce((extendedUnits, player) => {
            const extendedPlayerUnits: ExtendedUnit[] = player.unitIds.map(unitId => {
                const baseUnit: Unit = units.find(u => u.id === unitId)!
                return { ...baseUnit, owner: player }
            })
            return [...extendedUnits, ...extendedPlayerUnits]
        }, [])
    }
)

export const getExtendedGrid: Selector<ApplicationState, ExtendedGrid> = createSelector(
    getGrid,
    getExtendedUnits,
    getExtendedCities,
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
