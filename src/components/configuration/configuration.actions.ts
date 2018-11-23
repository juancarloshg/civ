import { createAction, ActionsUnion } from "src/utils/actionHelpers";

export enum ActionTypes {
  CONFIGURE_GAME_SIZE = "Configure game size",
  CONFIGURE_GAME_SEA_LEVEL = "Configure game sea level",
  CONFIGURE_GAME_TECTONIC_ACTIVITY = "Configure game tectonic activity",
  CONFIGURE_GAME_HUMIDITY = "Configure game humidity",
  CONFIGURE_GAME_RESOURCES_LEVEL = "Configure game resources level",
}

export const actions = {
  configureGameSize: (value: number) => createAction(ActionTypes.CONFIGURE_GAME_SIZE, {value}),
  configureGameSeaLevel: (value: number) => createAction(ActionTypes.CONFIGURE_GAME_SEA_LEVEL, {value}),
  configureGameTectonicActivity: (value: number) => createAction(ActionTypes.CONFIGURE_GAME_TECTONIC_ACTIVITY, {value}),
  configureGameResourcesLevel: (value: number) => createAction(ActionTypes.CONFIGURE_GAME_RESOURCES_LEVEL, {value}),
  configureGameHumidity: (value: number) => createAction(ActionTypes.CONFIGURE_GAME_HUMIDITY, {value})
};

export type Actions = ActionsUnion<typeof actions>;
