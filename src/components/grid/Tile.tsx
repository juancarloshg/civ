import * as React from "react";
import styled, {css} from "styled-components";

import { squareSize } from "./constants";

const StyledTile = styled.span`
  height: ${squareSize.height};
  width: ${squareSize.width};
  display: inline-block;
  border: 1px solid black;
  box-sizing: border-box;
  ${props => props['data-terrain'] == 'grass' && css`
    background: green;
  `}
`;

interface TileProps {
  row: number;
  col: number;
  terrain: Terrain;
  terrainModifiers: TerrainModifier[];
  units: AbstractUnit[];
}

export const Tile: React.FunctionComponent<TileProps> = ({ row, col, terrain }) => (
  <StyledTile key={`row${row}col${col}`} data-testid="grid-square" data-terrain={terrain}/>
);
