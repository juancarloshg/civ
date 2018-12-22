import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'

import { ApplicationState } from '../../../../rootReducer'
import { IconProps } from '../../../icons/icons.types'
import { ExtendedUnit } from '../../units/unit.types'
import { unitIcons } from '../../units/unit.helpers'
import { unitSize, iconWrapperRatio } from '../constants'
import { getIsSelectedUnit } from '../../game.selectors'
import { actions as gameActions } from '../../game.actions'

interface StateProps {
    isSelected: boolean
}

interface DispatchProps {
    selectUnit(unit: ExtendedUnit): void
}

interface OwnProps {
    unit: ExtendedUnit
}

type Props = StateProps & OwnProps & DispatchProps

const getHeight = (props: { isSelected: boolean }) => (props.isSelected ? unitSize.selectedHeight : unitSize.height)
const getWidth = (props: StyledUnitProps) => (props.isSelected ? unitSize.selectedWidth : unitSize.height)
const getDisplay = (props: StyledUnitProps) => (props.isSelected ? 'flex' : 'inline-block')
const getBackground = (props: StyledUnitProps) => props.unit.owner.color

type StyledUnitProps = Pick<Props, 'isSelected' | 'unit'>
const StyledUnit = styled.span<StyledUnitProps>`
    height: ${getHeight}px;
    width: ${getWidth}px;
    display: ${getDisplay};
    border-radius: 50%;
    border: 1px solid black;
    box-sizing: border-box;
    background: ${getBackground};
    justify-content: center;
    z-index: 1;
    position: absolute;
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
            unit={unit}
        >
            {isSelected && <Icon height={getHeight({ isSelected })} />}
        </StyledUnit>
    )
}

const mapState = createStructuredSelector<ApplicationState, Props, StateProps>({
    isSelected: getIsSelectedUnit
})

const mapDispatch: DispatchProps = {
    selectUnit: (unit: ExtendedUnit) => gameActions.selectUnit(unit.id)
}

export const Unit = connect<StateProps, DispatchProps, OwnProps>(
    mapState,
    mapDispatch
)(UnitBase)
