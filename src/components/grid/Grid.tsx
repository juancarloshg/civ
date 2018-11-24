import * as React from 'react'
import styled from 'styled-components'

import { repeat } from '../../utils/utils'
import { Tile, TileProps } from './tile/Tile'
import { terrains, TerrainType } from '../terrains/base/terrains'

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
            <Tile key={`row${row}col${col}`} terrain={gameMap[row][col].terrain} terrainModifiers={['plain']} units={[]} />
        ))}
    </StyledSquaresRow>
)

export const Grid: React.FunctionComponent = () => (
    <div data-testid="game-grid">
        {repeat(size, row => (
            <TilesRow key={`row${row}`} length={size} row={row} />
        ))}
    </div>
)

function generateMap(): TileProps[][] {
    const map: TileProps[][] = []
    for (let row = 0; row < size; row++) {
        map[row] = []
        for (let col = 0; col < size; col++) {
            map[row][col] = {
                terrain: getRandomTerrainType(),
                terrainModifiers: [],
                units: []
            }
        }
    }
    return map
}

function getRandomTerrainType(): TerrainType {
    return Object.keys(terrains)[Math.floor(Math.random() * Object.keys(terrains).length)] as TerrainType
}
