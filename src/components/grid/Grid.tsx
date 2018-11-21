import * as React from "react";
import styled from "styled-components";

import { repeat } from "../../utils";
import { gridSize } from "./constants";
import { Square } from "./Square";

interface SquaresRowProps {
  length: number;
  row: number;
}

const StyledSquaresRow = styled.span`
  display: flex;
`;

const SquaresRow: React.FunctionComponent<SquaresRowProps> = ({ length, row }) => (
  <StyledSquaresRow data-testid="grid-row">
    {repeat(length, col => (
      <Square row={row} col={col} />
    ))}
  </StyledSquaresRow>
);

export const Grid: React.FunctionComponent = () => (
  <div data-testid="game-grid">
    {repeat(gridSize.height, row => (
      <SquaresRow length={gridSize.width} row={row} />
    ))}
  </div>
);
