import * as React from "react";
import { Grid } from "./grid/Grid";

export const Game: React.SFC = () => (
  <div data-testid="game-container">
    <Grid />
  </div>
);
