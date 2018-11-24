import { createAction, ActionsUnion } from "src/utils/actionHelpers";

export enum ActionTypes {
  INIT_GRID_STATE = "Init grid state",
  INIT_GRID_STATE_SUCCESS = "Init grid state success"
}

export const actions = {
  initGridState: () => createAction(ActionTypes.INIT_GRID_STATE),
  initGridStateSuccess: () => createAction(ActionTypes.INIT_GRID_STATE_SUCCESS)
};

export type Actions = ActionsUnion<typeof actions>;
