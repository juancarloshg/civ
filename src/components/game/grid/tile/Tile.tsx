import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { TerrainType } from 'src/components/game/terrains/base/terrains'
import { Tile as ITile } from '../../game.helpers'
import { actions as playerActions } from '../../player/player.actions'
import { squareSize } from '../constants'

const getColor = (terrain: TerrainType) => {
    switch (terrain) {
        case 'sea':
            return 'Aqua'
        case 'snow':
            return 'White'
        case 'desert':
            return 'Yellow'
        case 'dirt':
            return 'Olive'
        case 'grass':
            return 'Green'
        default:
            return ''
    }
}

type StyledTileProps = Pick<Props, 'tile'>

const StyledTile = styled.span<StyledTileProps>`
    height: ${squareSize.height};
    width: ${squareSize.width};
    display: inline-block;
    border: 1px solid black;
    box-sizing: border-box;
    background: ${props => getColor(props.tile.terrain)};
`

interface OwnProps {
    tile: ITile
}

interface DispatchProps {
    selectTile(tile: ITile): void
}

type Props = OwnProps & DispatchProps

const TileBase: React.FunctionComponent<Props> = ({ selectTile, tile, ...passProps }) => (
    <StyledTile data-testid="grid-square" tile={tile} onClick={() => selectTile(tile)} {...passProps} />
)

const mapDispatch: DispatchProps = {
    selectTile: (tile: ITile) => playerActions.selectTile(tile)
}

export const Tile = connect<{}, DispatchProps, OwnProps>(
    null,
    mapDispatch
)(TileBase)
