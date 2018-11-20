import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Game } from "./components/Game";

export const Router = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Menu} />
      <Route path="/game" component={Game} />
    </div>
  </BrowserRouter>
);
