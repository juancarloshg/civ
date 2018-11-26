import { GridPosition } from '../grid/grid.types'
import { Unit, UnitType, units, UnitState, UnitBase } from './units'

interface CreateUnitProps {
    type: UnitType
    position: GridPosition
}

export const createUnit = ({ type, position }: CreateUnitProps): Unit => {
    const unitBase: UnitBase = units[type]
    const unitState: UnitState = {
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
