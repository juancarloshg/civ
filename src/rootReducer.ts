import { combineReducers } from "redux";

import { reducer as menuReducer, MenuState } from "./components/menu.reducer";

export interface ApplicationState {
  menu: MenuState;
}

export const rootReducer = combineReducers({
  menu: menuReducer
});
