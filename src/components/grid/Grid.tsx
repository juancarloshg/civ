import * as React from "react";
import styled from "styled-components";

import { repeat } from "../../utils";
import { gridSize } from "./constants";
import { Tile } from "./Tile";

interface SquaresRowProps {
  length: number;
  row: number;
}

const StyledSquaresRow = styled.span`
  display: flex;
`;

const TilesRow: React.FunctionComponent<SquaresRowProps> = ({ length, row }) => (
  <StyledSquaresRow data-testid="grid-row">
    {repeat(length, col => (
      <Tile row={row} col={col} terrain={'grass'} terrainModifiers={['plain']} units={[]}/>
    ))}
  </StyledSquaresRow>
);

export const Grid: React.FunctionComponent = () => (
  <div data-testid="game-grid">
    {repeat(gridSize.height, row => (
      <TilesRow length={gridSize.width} row={row} />
    ))}
  </div>
);
