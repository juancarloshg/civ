import * as React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { createStructuredSelector } from 'reselect'

import { ApplicationState } from '../../../../rootReducer'
import { blinker } from '../../../styled/Blinking'
import { IconProps } from '../../../icons/icons.types'
import { ExtendedUnit } from '../../units/unit.types'
import { unitIcons } from '../../units/unit.helpers'
import { unitSize, iconWrapperRatio } from '../constants'
import { getIsSelectedUnit, getCurrentPlayerId } from '../../game.selectors'
import { actions as gameActions } from '../../game.actions'

interface StateProps {
    isSelected: boolean
    currentPlayer: string | null
}

interface DispatchProps {
    selectUnit(unit: ExtendedUnit): void
}

interface OwnProps {
    unit: ExtendedUnit
    position: number
}

type Props = StateProps & OwnProps & DispatchProps

const getHeight = (props: { isSelected: boolean }) => (props.isSelected ? unitSize.selectedHeight : unitSize.height)
const getWidth = (props: StyledUnitProps) => (props.isSelected ? unitSize.selectedWidth : unitSize.height)
const getDisplay = (props: StyledUnitProps) => (props.isSelected ? 'flex' : 'inline-block')
const getBackground = (props: StyledUnitProps) => props.unit.owner.color

type StyledUnitProps = Pick<Props, 'isSelected' | 'unit' | 'position'>
const StyledUnit = styled.span<StyledUnitProps>`
    height: ${getHeight}px;
    width: ${getWidth}px;
    left: ${props => (props.isSelected ? 0 : getWidth(props) * props.position)}px;
    top: ${props => props.isSelected && getHeight(props) / 2}px;
    display: ${getDisplay};
    border-radius: 50%;
    border: 1px solid black;
    box-sizing: border-box;
    background: ${getBackground};
    justify-content: center;
    z-index: 1;
    position: absolute;
    animation: ${({ isSelected }) =>
        isSelected &&
        css`
            ${blinker} 1.5s linear infinite
        `};
`

const getStyledIcon = (icon: React.FunctionComponent<IconProps>) => styled(icon)`
    fill: white;
    width: ${iconWrapperRatio * 100}%;
    height: ${iconWrapperRatio * 100}%;
`

const UnitBase: React.SFC<Props> = ({ selectUnit, unit, isSelected, currentPlayer, position }) => {
    const Icon = getStyledIcon(unitIcons[unit.type])
    return (
        <StyledUnit
            onClick={e => {
                e.stopPropagation()
                if (unit.owner.id === currentPlayer) {
                    selectUnit(unit)
                }
            }}
            position={position}
            isSelected={isSelected}
            unit={unit}
        >
            {isSelected && <Icon height={getHeight({ isSelected })} />}
        </StyledUnit>
    )
}

const mapState = createStructuredSelector<ApplicationState, Props, StateProps>({
    isSelected: getIsSelectedUnit,
    currentPlayer: getCurrentPlayerId
})

const mapDispatch: DispatchProps = {
    selectUnit: (unit: ExtendedUnit) => gameActions.selectUnit(unit)
}

export const Unit = connect<StateProps, DispatchProps, OwnProps>(
    mapState,
    mapDispatch
)(UnitBase)
