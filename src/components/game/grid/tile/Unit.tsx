import { unitSize } from '../constants'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ApplicationState } from 'src/rootReducer'
import { Unit as IUnit } from '../../units/units'
import { getIsSelectedUnit } from '../../player/player.selectors'

interface StateProps {
    isSelected: boolean
}

interface OwnProps {
    unit: IUnit
}

type Props = StateProps & OwnProps

const getHeight = (props: Props) => (props.isSelected ? unitSize.selectedHeight : unitSize.height)
const getWidth = (props: Props) => (props.isSelected ? unitSize.selectedWidth : unitSize.height)

const UnitBase = styled.span<Props>`
    height: ${getHeight};
    width: ${getWidth};
    display: inline-block;
    border-radius: 50%;
    border: 1px solid black;
    box-sizing: border-box;
    background: green;
`

const mapState = createStructuredSelector<ApplicationState, Props, StateProps>({
    isSelected: getIsSelectedUnit
})

export const Unit = connect<StateProps, {}, OwnProps>(mapState)(UnitBase)
