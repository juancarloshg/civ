import * as React from "react";
import styled, {css} from "styled-components";

import {squareSize} from "../constants";
import {TerrainType} from "../../terrains/base/TerrainType";
import {TerrainModifierType} from "../../terrains/modifiers/TerrainModifierType";
import {Unit} from "../../units/Unit";

const StyledTile = styled.span`
  height: ${squareSize.height};
  width: ${squareSize.width};
  display: inline-block;
  border: 1px solid black;
  box-sizing: border-box;
  ${props => props['data-terrain'] === 'SEA' && css`
    background: Aqua;
  `}
  ${props => props['data-terrain'] === 'SNOW' && css`
    background: White;
  `}
  ${props => props['data-terrain'] === 'DESERT' && css`
    background: Yellow;
  `}
  ${props => props['data-terrain'] === 'DIRT' && css`
    background: Olive;
  `}
  ${props => props['data-terrain'] === 'GRASS' && css`
    background: Green;
  `}  
`;

export interface TileProps {
  row: number;
  col: number;
  terrain: TerrainType;
  terrainModifiers: TerrainModifierType[];
  units: Unit[];
}

export const Tile: React.FunctionComponent<TileProps> = ({ row, col, terrain, terrainModifiers }) => (
  <StyledTile key={`row${row}col${col}`} data-testid="grid-square" data-terrain={terrain} data-terrain-modifier={terrainModifiers}/>
);
