import uniqueId from 'lodash.uniqueid'

import { units } from './units'
import { Unit, UnitType, UnitState, UnitBase } from './unit.types'
import { GridPosition } from '../shared/shared.types'
import { IconProps } from '../../components/icons/icons.types'
import { Archer } from '../../components/icons/units/Archer'
import { Warrior } from '../../components/icons/units/Warrior'
import { Settler } from '../../components/icons/units/Settler'

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
