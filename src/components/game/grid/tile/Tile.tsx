import * as React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ApplicationState } from '../../../../rootReducer'
import { actions as gameActions } from '../../game.actions'
import { StyledTile } from './StyledTile'
import { Unit } from './Unit'
import { ExtendedTile } from '../grid.types'
import { getIsSelectedTile } from '../../game.selectors'

interface OwnProps {
    tile: ExtendedTile
}

interface DispatchProps {
    selectTile(tile: ExtendedTile): void
}

interface StateProps {
    isSelectedTile: boolean
}

export type Props = OwnProps & DispatchProps & StateProps

const TileBase: React.FunctionComponent<Props> = ({ selectTile, tile, ...passProps }) => (
    <StyledTile data-testid="grid-square" tile={tile} onClick={() => selectTile(tile)} {...passProps}>
        {tile.units && tile.units.map(unit => <Unit unit={unit} key={unit.id} />)}
    </StyledTile>
)

const mapState = createStructuredSelector<ApplicationState, Props, StateProps>({
    isSelectedTile: getIsSelectedTile
})

const mapDispatch: DispatchProps = {
    selectTile: (tile: ExtendedTile) => gameActions.selectTile(tile.id)
}

export const Tile = connect<StateProps, DispatchProps, OwnProps>(
    mapState,
    mapDispatch
)(TileBase)
