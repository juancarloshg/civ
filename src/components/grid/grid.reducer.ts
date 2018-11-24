import { Actions, ActionTypes } from "./grid.actions";
import {TileState} from "./tile/tile.reducer";

export interface GridState {
  grid: TileState[][]
}

export const reducer = (state: GridState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.INIT_GRID_STATE:
      return {
        ...state
      };
    case ActionTypes.INIT_GRID_STATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
};
