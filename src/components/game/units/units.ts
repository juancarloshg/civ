import { GridPosition } from '../grid/grid.types'
import { UnitEnvironment } from './environments'
import { UnitGroup } from './groups'

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
}

export interface UnitState {
    currentHp: number
    movementsLeft: number
    position: GridPosition
}

export type Unit = UnitBase & UnitState

export type UnitType = 'archer' | 'warrior' | 'settler'

export const units: { [key in UnitType]: UnitBase } = {
    archer: {
        type: 'archer',
        group: 'ranged',
        environment: 'land',
        hp: 20,
        meleeAtk: 1,
        meleeDef: 1,
        movement: 1,
        rangedAtk: 4
    },
    warrior: {
        type: 'warrior',
        group: 'melee',
        environment: 'land',
        hp: 20,
        meleeAtk: 5,
        meleeDef: 2,
        movement: 1,
        rangedDef: 1
    },
    settler: {
        type: 'settler',
        group: 'civilian',
        environment: 'land',
        hp: 1,
        movement: 1
    }
}
