import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'

import { ApplicationState } from 'src/rootReducer'
import { IconProps } from 'src/components/icons/icons.types'
import { getIsSelectedUnit } from '../../player/player.selectors'
import { actions as playerActions } from '../../player/player.actions'
import { Unit as IUnit } from '../../units/units'
import { unitIcons } from '../../units/unit.helpers'
import { unitSize, iconWrapperRatio } from '../constants'

interface StateProps {
    isSelected: boolean
}

interface DispatchProps {
    selectUnit(unit: IUnit): void
}

interface OwnProps {
    unit: IUnit
}

type Props = StateProps & OwnProps & DispatchProps

const getHeight = (props: StyledUnitProps) => (props.isSelected ? unitSize.selectedHeight : unitSize.height)
const getWidth = (props: StyledUnitProps) => (props.isSelected ? unitSize.selectedWidth : unitSize.height)
const getDisplay = (props: StyledUnitProps) => (props.isSelected ? 'flex' : 'inline-block')

type StyledUnitProps = Pick<Props, 'isSelected'>
const StyledUnit = styled.span<StyledUnitProps>`
    height: ${getHeight}px;
    width: ${getWidth}px;
    display: ${getDisplay};
    border-radius: 50%;
    border: 1px solid black;
    box-sizing: border-box;
    background: green;
    justify-content: center;
`

const getStyledIcon = (icon: React.FunctionComponent<IconProps>) => styled(icon)`
    fill: white;
    width: ${iconWrapperRatio * 100}%;
    height: ${iconWrapperRatio * 100}%;
`

const UnitBase: React.SFC<Props> = ({ selectUnit, unit, isSelected }) => {
    const Icon = getStyledIcon(unitIcons[unit.type])
    return (
        <StyledUnit
            onClick={e => {
                e.stopPropagation()
                selectUnit(unit)
            }}
            isSelected={isSelected}
        >
            {isSelected && <Icon height={getHeight({ isSelected })} />}
        </StyledUnit>
    )
}

const mapState = createStructuredSelector<ApplicationState, Props, StateProps>({
    isSelected: getIsSelectedUnit
})

const mapDispatch: DispatchProps = {
    selectUnit: (unit: IUnit) => playerActions.selectUnit(unit.id)
}

export const Unit = connect<StateProps, DispatchProps, OwnProps>(
    mapState,
    mapDispatch
)(UnitBase)
