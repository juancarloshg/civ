import * as React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { actions as userActions } from '../../../core/user.actions'
import { StyledTile } from './StyledTile'
import { Unit } from './Unit'
import { ExtendedTile } from '../../../core/shared/shared.types'
import { ApplicationState } from '../../../rootReducer'
import { getIsSelectedTile } from '../../../core/game.selectors'

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
        {tile.units && tile.units.map((unit, index) => <Unit position={index} unit={unit} key={unit.id} />)}
    </StyledTile>
)

const mapState = createStructuredSelector<ApplicationState, Props, StateProps>({
    isSelectedTile: getIsSelectedTile
})

const mapDispatch: DispatchProps = {
    selectTile: (tile: ExtendedTile) => userActions.selectTile(tile.id)
}

export const Tile = connect<StateProps, DispatchProps, OwnProps>(
    mapState,
    mapDispatch
)(TileBase)
