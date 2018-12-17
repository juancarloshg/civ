import { uniqueId } from 'lodash'

import { Archer } from '../../icons/Archer'
import { Warrior } from '../../icons/Warrior'
import { Settler } from '../../icons/Settler'
import { IconProps } from '../../icons/icons.types'

import { GridPosition } from '../grid/grid.types'
import { Unit, UnitType, units, UnitState, UnitBase } from './units'

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

export const unitIcons: { [key in UnitType]: React.FunctionComponent<IconProps> } = {
    archer: Archer,
    warrior: Warrior,
    settler: Settler
}
