import { City, CITY_BASE_STATS } from './city.types'
import { Tile, getTileByGridAndPosition, getTileYield, Grid } from '../grid'
import { addYields, EMPTY_YIELD, Yield } from '../yield/Yield'

function getCityTilesYield(city: City, grid: Grid): Yield {
    const tiles: (Tile | null)[] = city.ownedTiles.map(tilePosition => getTileByGridAndPosition(grid, tilePosition))
    return tiles.reduce((totalYield, tile) => addYields(totalYield, tile ? getTileYield(tile) : EMPTY_YIELD), EMPTY_YIELD)
}

function getCityBaseStats(): Yield {
    return CITY_BASE_STATS
}

export function getCityYield(city: City, grid: Grid): Yield {
    return addYields(getCityTilesYield(city, grid), getCityBaseStats())
}
