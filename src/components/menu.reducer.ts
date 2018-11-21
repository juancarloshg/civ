import { Actions, ActionTypes } from "./menu.actions";

export interface MenuState {
  helloWorldSuccess: boolean;
  message: string;
}

const initialState: MenuState = {
  helloWorldSuccess: false,
  message: ""
};

export const reducer = (state: MenuState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.HELLO_WORLD:
      return {
        ...state,
        helloWorldSuccess: true,
        message: action.payload.message
      };
    default:
      return state;
  }
};
