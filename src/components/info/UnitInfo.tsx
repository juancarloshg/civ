import * as React from 'react'

import { UnitAction } from './UnitAction'
import { ExtendedUnit } from '../../core/shared/shared.types'
import { FlexContainer } from '../styled/FlexContainer'
import { StyledP } from '../styled/StyledP'

interface TileInfoProps {
    unit: ExtendedUnit
}

export const UnitInfo: React.SFC<TileInfoProps> = ({ unit }) => (
    <>
        <FlexContainer direction="column" grow={1} padding={5}>
            <StyledP>Selected unit: {unit.type}</StyledP>
            <StyledP>
                Movements: {unit.movementsLeft}/{unit.movement}
            </StyledP>
            <StyledP>
                HP: {unit.currentHp}/{unit.hp}
            </StyledP>
            <StyledP>Melee Atk: {unit.meleeAtk || 0}</StyledP>
            <StyledP>Melee Def: {unit.meleeDef || 0}</StyledP>
            <StyledP>Ranged Atk: {unit.rangedAtk || 0}</StyledP>
            <StyledP>Ranged Def: {unit.rangedDef || 0}</StyledP>
        </FlexContainer>
        <FlexContainer direction="column" grow={1} padding={5}>
            <StyledP>
                {unit.actions && unit.actions.length && unit.actions.map(action => <UnitAction key={action} unit={unit} action={action} />)}
            </StyledP>
        </FlexContainer>
    </>
)
