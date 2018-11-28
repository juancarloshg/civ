import { GridPosition } from '../grid/grid.types'
import { Unit, UnitType, units, UnitState, UnitBase } from './units'
import { uniqueId } from 'lodash'

interface CreateUnitProps {
    type: UnitType
    position: GridPosition
}

export const createUnit = ({ type, position }: CreateUnitProps): Unit => {
    const unitBase: UnitBase = units[type]
    const unitState: UnitState = {
        id: uniqueId('unit'),
        currentHp: unitBase.hp,
        movementsLeft: unitBase.movement,
        position
    }

    return {
        ...unitBase,
        ...unitState
    }
}

export const createUnits = (unitTypes: UnitType[], position: GridPosition): Unit[] => unitTypes.map(type => createUnit({ type, position }))
