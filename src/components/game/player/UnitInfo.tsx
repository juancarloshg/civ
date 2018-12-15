import * as React from 'react'
import { Unit } from '../units/units'

interface TileInfoProps {
    unit: Unit
}

export const UnitInfo: React.SFC<TileInfoProps> = ({ unit }) => (
    <>
        {unit && (
            <p>
                Selected unit: {unit.type}. Movements: {unit.movementsLeft}/{unit.movement}
            </p>
        )}
    </>
)
