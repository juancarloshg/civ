import * as React from 'react'
import styled, { css } from 'styled-components'

import { squareSize } from '../constants'
import { Unit } from '../../units/Unit'
import { TerrainType } from 'src/components/terrains/base/terrains'
import { TerrainModifierType } from 'src/components/terrains/modifiers/terrainModifiers'

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
    ${props =>
        css`
            background: ${getColor(props.terrain)};
        `}
`

export interface TileProps {
    terrain: TerrainType
    terrainModifiers: TerrainModifierType[]
    units: Unit[]
}

export const Tile: React.FunctionComponent<TileProps> = props => <StyledTile data-testid="grid-square" {...props} />
