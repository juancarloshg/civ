import * as React from 'react'
import styled from 'styled-components'

import { squareSize } from '../constants'
import { TerrainType } from 'src/components/terrains/base/terrains'
import { Tile as ITile } from '../grid.helpers'

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

const StyledTile = styled.span<TileProps>`
    height: ${squareSize.height};
    width: ${squareSize.width};
    display: inline-block;
    border: 1px solid black;
    box-sizing: border-box;
    background: ${props => getColor(props.terrain)};
`

type TileProps = ITile

export const Tile: React.FunctionComponent<TileProps> = props => <StyledTile data-testid="grid-square" {...props} />
