import { GridPosition } from '../grid/grid.types'
import { Yield } from '../yield/Yield'

export interface City {
    id: string
    position: GridPosition
    ownedTiles: GridPosition[]
}

export interface ExtendedCity extends City {
    yield: Yield
}

export const CITY_BASE_STATS = {
    production: 1,
    food: 1,
    gold: 0,
    health: 0,
    science: 0
}
