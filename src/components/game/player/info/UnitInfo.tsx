import * as React from 'react'

import { UnitAction } from './UnitAction'
import { ExtendedUnit } from '../../units/unit.types'

interface TileInfoProps {
    unit: ExtendedUnit
}

export const UnitInfo: React.SFC<TileInfoProps> = ({ unit }) => (
    <>
        <p>
            Selected unit: {unit.type}. Movements: {unit.movementsLeft}/{unit.movement}
        </p>
        {unit.actions && unit.actions.length && unit.actions.map(action => <UnitAction key={action} unit={unit} action={action} />)}
    </>
)
