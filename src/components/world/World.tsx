import * as React from "react";

import { repeat } from "../../utils";
import { size } from "./constants";

interface SquareProps {
  row: number;
  col: number;
}

const Square: React.SFC<SquareProps> = ({ row, col }) => (
  <span key={`row${row}col${col}`} data-testid="world-square" />
);

interface SquaresRowProps {
  length: number;
  row: number;
}

const SquaresRow: React.SFC<SquaresRowProps> = ({ length, row }) => (
  <span data-testid="world-row">
    {repeat(length, col => (
      <Square row={row} col={col} />
    ))}
  </span>
);

export const World: React.SFC = () => (
  <div data-testid="game-world">
    {repeat(size.height, row => (
      <SquaresRow length={size.width} row={row} />
    ))}
  </div>
);
