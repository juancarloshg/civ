import { UnitEnvironment } from './environments'
import { UnitGroup } from './groups'

export interface Unit {
    group: UnitGroup
    environment: UnitEnvironment
    hp: number
    meleeAtk: number
    meleeDef: number
    rangedAtk: number
    rangedDef: number
    movement: number
}

export type UnitType = 'archer' | 'warrior'

export const units: { [key in UnitType]: Unit } = {
    archer: {
        group: 'ranged',
        environment: 'land',
        hp: 20,
        meleeAtk: 1,
        meleeDef: 1,
        movement: 1,
        rangedAtk: 4,
        rangedDef: 0
    },
    warrior: {
        group: 'melee',
        environment: 'land',
        hp: 20,
        meleeAtk: 5,
        meleeDef: 2,
        movement: 1,
        rangedAtk: 0,
        rangedDef: 1
    }
}