import { UnitActionType, UnitType, UnitBase } from './unit.types'

export const unitActionDescriptions: { [key in UnitActionType]: string } = {
    'create city': 'Build city'
}

export const units: { [key in UnitType]: UnitBase } = {
    archer: {
        type: 'archer',
        group: 'ranged',
        environment: 'land',
        hp: 20,
        meleeAtk: 1,
        meleeDef: 1,
        movement: 1,
        rangedAtk: 4,
        cost: 10
    },
    warrior: {
        type: 'warrior',
        group: 'melee',
        environment: 'land',
        hp: 20,
        meleeAtk: 5,
        meleeDef: 2,
        movement: 1,
        rangedDef: 1,
        cost: 8
    },
    settler: {
        type: 'settler',
        group: 'civilian',
        environment: 'land',
        hp: 1,
        movement: 1,
        actions: ['create city'],
        cost: 15
    }
}
