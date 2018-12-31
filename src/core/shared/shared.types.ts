import { City, Progress } from '../city/city.types'
import { Tile } from '../grid/grid.types'
import { Player } from '../game.types'
import { Yield } from './yield/Yield'
import { Unit } from '../units/unit.types'

export interface ExtendedCity extends City {
    yield: Yield
    icon: string
    currentBuild?: Progress
    prodSurplus: number
}

export interface GridPosition {
    row: number
    col: number
}

export interface ExtendedTile extends Tile {
    units: ExtendedUnit[]
    city: ExtendedCity | null
    owner: Player | null
}

export type ExtendedGrid = ExtendedTile[][]

export interface ExtendedUnit extends Unit {
    owner: Player
}

export interface Size {
    height: number
    width: number
}

export interface GridPosition {
    row: number
    col: number
}
