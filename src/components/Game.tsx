import * as React from "react";
import { World } from "./world/World";

export const Game: React.SFC = () => (
  <div data-testid="game-container">
    <World />
  </div>
);
