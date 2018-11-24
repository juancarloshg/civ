import * as React from 'react'
import styled, { css } from 'styled-components'

import { squareSize } from '../constants'
import { TerrainType } from '../../terrains/base/TerrainType'
import { TerrainModifierType } from '../../terrains/modifiers/TerrainModifierType'
import { Unit } from '../../units/Unit'

const getColor = (terrain: TerrainType) => {
    switch (terrain) {
        case TerrainType.SEA:
            return 'Aqua'
        case TerrainType.SNOW:
            return 'White'
        case TerrainType.DESERT:
            return 'Yellow'
        case TerrainType.DIRT:
            return 'Olive'
        case TerrainType.GRASS:
            return 'Green'
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
