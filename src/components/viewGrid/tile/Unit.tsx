import * as React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { createStructuredSelector } from 'reselect'

import { actions as userActions } from '../../../core/user.actions'
import { ExtendedUnit } from '../../../core/shared/shared.types'
import { unitSize, iconWrapperRatio } from '../../../core/grid/constants'
import { blinker } from '../../styled/Blinking'
import { ApplicationState } from '../../../rootReducer'
import { getIsSelectedUnit, getCurrentPlayerId } from '../../../core/game.selectors'
import { IconProps } from '../../icons/icons.types'
import { unitIcons } from '../../../core/units/unit.helpers'

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
            ${blinker} 1s linear infinite
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
    selectUnit: (unit: ExtendedUnit) => userActions.selectUnit(unit)
}

export const Unit = connect<StateProps, DispatchProps, OwnProps>(
    mapState,
    mapDispatch
)(UnitBase)
