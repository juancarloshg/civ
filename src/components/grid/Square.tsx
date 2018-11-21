import * as React from "react";
import styled from "styled-components";

import { squareSize } from "./constants";

const StyledSquare = styled.span`
  height: ${squareSize.height};
  width: ${squareSize.width};
  display: inline-block;
  border: 1px solid black;
  box-sizing: border-box;
`;

interface SquareProps {
  row: number;
  col: number;
}

export const Square: React.SFC<SquareProps> = ({ row, col }) => (
  <StyledSquare key={`row${row}col${col}`} data-testid="grid-square" />
);
