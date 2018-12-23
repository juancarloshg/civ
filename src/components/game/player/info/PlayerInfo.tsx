import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { min } from 'ramda'

import { ApplicationState } from '../../../../rootReducer'
import { FlexContainer } from '../../../styled/FlexContainer'
import { FlexItem } from '../../../styled/FlexItem'
import { getSize } from '../../../configuration/configuration.selector'
import { Unit, ExtendedUnit } from '../../units/unit.types'
import { getGrid, ExtendedTile, Grid } from '../../grid'
import { actions as gameActions } from '../../game.actions'
import { actions as cityActions } from '../../city/city.actions'

import { TileInfo } from './TileInfo'
import { UnitInfo } from './UnitInfo'
import { NextTurn } from './NextTurn'
import { Minimap } from './Minimap'
import { getSelectedExtendedTile, getSelectedUnit, getTurn, getCurrentPlayerId } from '../../game.selectors'
import { CityInfo } from './CityInfo'
import { City } from '../../city/city.types'

const StyledFlexContainer = styled(FlexContainer)`
    border: 5px solid black;
    background: #596869;
    color: white;
    padding: 10px;
`

const StyledMinimap = styled(Minimap)<{ size: number }>`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
`

export interface Size {
    height: number
    width: number
}

interface StateProps {
    tile: ExtendedTile | null
    unit: ExtendedUnit | null
    turn: number
    viewGrid: Grid
    size: number
    currentPlayer: string | null
}

interface DispatchProps {
    selectUnit(unit: Unit): void
    build(city: City, key: string): void
}

type Props = StateProps & DispatchProps

interface State {
    miniwrapperSize: Size
}

class PlayerInfoBase extends React.Component<Props, State> {
    minimapWrapper: React.RefObject<HTMLDivElement>
    observer: ResizeObserver
    constructor(props: Props) {
        super(props)
        this.minimapWrapper = React.createRef()
        this.state = { miniwrapperSize: { height: 0, width: 0 } }
        this.updateMinimapWrapperSize = this.updateMinimapWrapperSize.bind(this)
    }

    componentDidMount() {
        this.observer = new ResizeObserver(this.updateMinimapWrapperSize)
        this.observer.observe(this.minimapWrapper.current!)
    }

    componentWillUnmount() {
        this.observer.disconnect()
    }

    updateMinimapWrapperSize() {
        const minimapWrapper = this.minimapWrapper.current
        if (minimapWrapper) {
            this.setState({
                miniwrapperSize: {
                    height: minimapWrapper.getBoundingClientRect().height,
                    width: minimapWrapper.getBoundingClientRect().width
                }
            })
        }
    }

    render() {
        const { tile, unit, selectUnit, turn, currentPlayer, build } = this.props
        const { miniwrapperSize } = this.state
        return (
            <StyledFlexContainer grow={1} basis="0">
                <FlexContainer direction="column" grow={1} padding={5}>
                    <h3>Player {currentPlayer}</h3>
                    {tile && <TileInfo tile={tile} selectUnit={selectUnit} currentPlayer={currentPlayer} />}
                </FlexContainer>
                <FlexContainer direction="row" grow={2} padding={5}>
                    {unit && <UnitInfo unit={unit} />}
                    {tile && tile.city && <CityInfo city={tile.city} build={build} />}
                </FlexContainer>
                <FlexContainer direction="column" grow={1} padding={5}>
                    <FlexItem>
                        <NextTurn />
                        <h3>Turn {turn}</h3>
                    </FlexItem>
                    <FlexContainer grow={1} ref={this.minimapWrapper} basis="auto">
                        <StyledMinimap size={min(miniwrapperSize.height, miniwrapperSize.width)} />
                    </FlexContainer>
                </FlexContainer>
            </StyledFlexContainer>
        )
    }
}

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    tile: getSelectedExtendedTile,
    unit: getSelectedUnit,
    turn: getTurn,
    viewGrid: getGrid,
    size: getSize,
    currentPlayer: getCurrentPlayerId
})

const mapDispatch: DispatchProps = {
    selectUnit: (unit: Unit) => gameActions.selectUnit(unit),
    build: (city: City, buildKey: string) => cityActions.build(city, buildKey)
}

export const PlayerInfo = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(PlayerInfoBase)
