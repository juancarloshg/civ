import * as React from 'react'

import { Unit } from '../../units/units'
import { UnitAction } from './UnitAction'

interface TileInfoProps {
    unit: Unit
}

export const UnitInfo: React.SFC<TileInfoProps> = ({ unit }) => (
    <>
        <p>
            Selected unit: {unit.type}. Movements: {unit.movementsLeft}/{unit.movement}
        </p>
        {unit.actions && unit.actions.length && unit.actions.map(action => <UnitAction key={action} unit={unit} action={action} />)}
    </>
)
