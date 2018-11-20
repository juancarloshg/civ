import * as React from "react";
import { Link } from "react-router-dom";

export const Menu: React.SFC = () => (
  <>
    <Link to="/game" data-testid="menu-start-game">
      Start
    </Link>
  </>
);
