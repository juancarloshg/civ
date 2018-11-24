import * as React from 'react'
import styled from 'styled-components'

import { repeat } from '../../utils/utils'
import { Tile, TileProps } from './tile/Tile'
import { TerrainType } from '../terrains/base/TerrainType'
import { TerrainModifierType } from '../terrains/modifiers/TerrainModifierType'

interface SquaresRowProps {
    length: number
    row: number
}

const StyledSquaresRow = styled.span`
    display: flex;
`

const size = 50 // TODO get from configuration
const gameMap = generateMap()

const TilesRow: React.FunctionComponent<SquaresRowProps> = ({ length, row }) => (
    <StyledSquaresRow data-testid="grid-row">
        {repeat(length, col => (
            <Tile col={col} row={row} terrain={gameMap[row][col].terrain} terrainModifiers={[TerrainModifierType.PLAIN]} units={[]} />
        ))}
    </StyledSquaresRow>
)

export const Grid: React.FunctionComponent = () => (
    <div data-testid="game-grid">
        {repeat(size, row => (
            <TilesRow length={size} row={row} />
        ))}
    </div>
)

function generateMap(): TileProps[][] {
    const map: TileProps[][] = []
    for (let row = 0; row < size; row++) {
        map[row] = []
        for (let col = 0; col < size; col++) {
            map[row][col] = {
                row,
                col,
                terrain: getRandomTerrain(),
                terrainModifiers: [],
                units: []
            }
        }
    }
    return map
}

function getRandomTerrain() {
    return TerrainType[Object.keys(TerrainType)[Math.floor((Math.random() * Object.keys(TerrainType).length) / 2)]];
}
