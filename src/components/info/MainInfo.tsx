import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { min } from 'ramda'

import { actions as userActions } from '../../core/user.actions'
import { actions as cityActions } from '../../core/city/city.actions'

import { NextTurn } from './NextTurn'
import { Minimap } from './Minimap'
import { CityInfo } from './CityInfo'
import { ExtendedTile, ExtendedUnit } from '../../core/shared/shared.types'
import { Unit } from '../../core/units/unit.types'
import { City } from '../../core/city/city.types'
import { TileInfo } from './TileInfo'
import { UnitInfo } from './UnitInfo'
import { ApplicationState } from '../../rootReducer'
import { getSelectedExtendedTile, getSelectedUnit, getTurn, getCurrentPlayerId } from '../../core/game.selectors'
import { Grid } from '../../core/grid/grid.types'
import { getGrid } from '../../core/grid/grid.selectors'
import { getSize } from '../../core/shared/configuration/configuration.selector'
import { FlexContainer } from '../styled/FlexContainer'
import { FlexItem } from '../styled/FlexItem'

const MainInfoWrapper = styled(FlexContainer)`
    border: 5px solid black;
    background: #596869ef;
    color: white;
    padding: 10px;
    position: absolute;
    width: 100%;
    height: 25%;
    bottom: 0;
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

class MainInfoBase extends React.Component<Props, State> {
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
            <MainInfoWrapper grow={1} basis="0">
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
                </FlexContainer>
                <FlexContainer grow={1} basis="0" ref={this.minimapWrapper}>
                    <StyledMinimap size={min(miniwrapperSize.height, miniwrapperSize.width)} />
                </FlexContainer>
            </MainInfoWrapper>
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
    selectUnit: (unit: Unit) => userActions.selectUnit(unit),
    build: (city: City, buildKey: string) => cityActions.build(city, buildKey)
}

export const MainInfo = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(MainInfoBase)
