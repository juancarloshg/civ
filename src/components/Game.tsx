import * as React from "react";
import { World } from "./game/World";

export const Game: React.SFC = () => (
  <div data-testid="game-container">
    <World />
  </div>
);
