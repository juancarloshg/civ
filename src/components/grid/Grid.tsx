import * as React from "react";
import styled from "styled-components";

import {repeat} from "../../utils/utils";
import {Tile, TileProps} from "./Tile";
import {TerrainType} from "../terrains/base/TerrainType";
import {TerrainModifierType} from "../terrains/modifiers/TerrainModifierType";
import {GameConfiguration} from "../configuration/GameConfiguration";
import {gridSize} from "./constants";

interface SquaresRowProps {
    length: number;
    row: number;
}

const StyledSquaresRow = styled.span`
  display: flex;
`;

const conf = new GameConfiguration()
conf.gridSize = {rows: 20, columns: 20}
const gameMap = generateMap(conf)

const TilesRow: React.FunctionComponent<SquaresRowProps> = ({
                                                                length,
                                                                row
                                                            }) => (
    <StyledSquaresRow data-testid="grid-row">
        {repeat(length, col => (
            <Tile
                col={col}
                row={row}
                terrain={gameMap[row][col].terrain}
                terrainModifiers={[TerrainModifierType.PLAIN]}
                units={[]}
            />
        ))}
    </StyledSquaresRow>
);

export const Grid: React.FunctionComponent = () => (
    <div data-testid="game-grid">
        {repeat(gridSize.height, row => (
            <TilesRow length={gridSize.width} row={row}/>
        ))}
    </div>
);

function generateMap(config: GameConfiguration): TileProps[][] {
    const map: TileProps[][] = []
    for (let row = 0; row < config.gridSize.rows; row++) {
        map[row] = []
        for (let col = 0; col < config.gridSize.columns; col++) {
            map[row][col] = {
                row: row,
                col: col,
                terrain: TerrainType[Object.keys(TerrainType)[Math.floor(Math.random() * Object.keys(TerrainType).length/2)]] as TerrainType,
                terrainModifiers: [],
                units: []
            }
        }
    }
    return map;
}
