import * as React from "react";

interface SquareProps {
  row: number;
  col: number;
}

export const Square: React.SFC<SquareProps> = ({ row, col }) => (
  <span key={`row${row}col${col}`} data-testid="grid-square" />
);
