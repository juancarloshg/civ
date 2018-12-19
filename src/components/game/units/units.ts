import { GridPosition } from '../grid'
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
    actions?: UnitActionType[]
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

export type UnitActionType = 'create city'

export const unitActionDescriptions: { [key in UnitActionType]: string } = {
    'create city': 'Build city'
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
        movement: 1,
        actions: ['create city']
    }
}
