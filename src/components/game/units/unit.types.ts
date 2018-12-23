import { Player } from '../game.types'
import { UnitGroup } from './groups'
import { UnitEnvironment } from './environments'
import { GridPosition } from '../grid'

export interface UnitBase {
    type: UnitType
    group: UnitGroup
    environment: UnitEnvironment
    hp: number
    meleeAtk?: number
    meleeDef?: number
    rangedAtk?: number
    rangedDef?: number
    movement: number
    actions?: UnitActionType[]
    cost: number
}

export interface UnitState {
    id: string
    currentHp: number
    movementsLeft: number
    position: GridPosition
}

export interface UnitAction {
    type: UnitActionType
    description: string
}

export type Unit = UnitBase & UnitState

export interface ExtendedUnit extends Unit {
    owner: Player
}

export type UnitActionType = 'create city'

export type UnitType = 'archer' | 'warrior' | 'settler'
