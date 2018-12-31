import { City } from './city.types'
import { CITY_BASE_STATS } from './city.constants'
import { Grid, Tile } from '../grid/grid.types'
import { Yield, addYields, EMPTY_YIELD } from '../shared/yield/Yield'
import { getTileByGridAndPosition, getTileYield } from '../grid/grid.helpers'

function getCityTilesYield(city: City, grid: Grid): Yield {
    const tiles: (Tile | null)[] = city.ownedTiles.map(tilePosition => getTileByGridAndPosition(grid, tilePosition))
    return tiles.reduce((totalYield, tile) => addYields(totalYield, tile ? getTileYield(tile) : EMPTY_YIELD), EMPTY_YIELD)
}

export function getCityYield(city: City, grid: Grid): Yield {
    return addYields(getCityTilesYield(city, grid), CITY_BASE_STATS)
}

export function getCityIcon(city: City) {
    if (city !== null) {
        return 'url(indian-village.svg)'
    }
    return ''
}
