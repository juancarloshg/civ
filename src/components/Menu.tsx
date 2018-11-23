import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {actions} from "./menu.actions";
import {ApplicationState} from "src/rootReducer";

interface StateProps {
  helloWorldMessage: string;
  helloWorldSuccess: boolean;
}

interface DispatchProps {
  helloWorld(message: string): void;
}

type MenuProps = StateProps & DispatchProps;

const MenuBase: React.FunctionComponent<MenuProps> = ({
  helloWorldMessage,
  helloWorldSuccess,
  helloWorld
}) => (
  <>
    <Link to="/game" data-testid="menu-start-game">
      Start<br/>
    </Link>
    <Link to="/configure" data-testid="menu-configure-game">
      Configure<br/>
    </Link>
    <button onClick={() => helloWorld("Hello!")}>Hello world</button>
    <p>
      Hello world fired - message is "{helloWorldMessage}" and success is "
      {helloWorldSuccess.toString()}"
    </p>
  </>
);

const mapState = createStructuredSelector<ApplicationState, StateProps>({
  helloWorldMessage: (state: ApplicationState) => state.menu.message,
  helloWorldSuccess: (state: ApplicationState) => state.menu.helloWorldSuccess
});

const mapDispatch = {
  helloWorld: actions.helloWorld
};

export const Menu = connect<StateProps, DispatchProps>(
  mapState,
  mapDispatch
)(MenuBase);
