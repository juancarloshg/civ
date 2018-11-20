import * as React from "react";

import { repeat } from "../../utils";
import { size } from "./constants";
import { Square } from "./Square";

interface SquaresRowProps {
  length: number;
  row: number;
}

const SquaresRow: React.SFC<SquaresRowProps> = ({ length, row }) => (
  <span data-testid="grid-row">
    {repeat(length, col => (
      <Square row={row} col={col} />
    ))}
  </span>
);

export const Grid: React.SFC = () => (
  <div data-testid="game-grid">
    {repeat(size.height, row => (
      <SquaresRow length={size.width} row={row} />
    ))}
  </div>
);
