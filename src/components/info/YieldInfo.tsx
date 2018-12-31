import * as React from 'react'
import { Yield } from '../../core/shared/yield/Yield'
import { FlexContainer } from '../../components/styled/FlexContainer'
import { StyledP } from '../../components/styled/StyledP'

interface OwnProps {
    _yield: Yield
}

export const YieldInfo: React.SFC<OwnProps> = ({ _yield }) => (
    <>
        <FlexContainer direction="column" grow={1} padding={5}>
            <StyledP>Production: {_yield.production}</StyledP>
            <StyledP>Food: {_yield.food}</StyledP>
            <StyledP>Gold: {_yield.gold}</StyledP>
            <StyledP>Health: {_yield.health}</StyledP>
            <StyledP>Science: {_yield.science}</StyledP>
        </FlexContainer>
    </>
)
