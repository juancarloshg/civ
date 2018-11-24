import { Actions, ActionTypes } from './configuration.actions'

export interface ConfigurationState {
    size: number
    seaLevel: number
    tectonicActivity: number
    humidity: number
    resourcesLevel: number
}

const initialState: ConfigurationState = {
    size: 200,
    seaLevel: 3,
    tectonicActivity: 3,
    humidity: 3,
    resourcesLevel: 3
}

export const reducer = (state: ConfigurationState = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.CONFIGURE_GAME_SIZE:
            return {
                ...state,
                size: action.payload.value
            }
        case ActionTypes.CONFIGURE_GAME_SEA_LEVEL:
            return {
                ...state,
                seaLevel: action.payload.value
            }
        case ActionTypes.CONFIGURE_GAME_TECTONIC_ACTIVITY:
            return {
                ...state,
                tectonicActivity: action.payload.value
            }
        case ActionTypes.CONFIGURE_GAME_HUMIDITY:
            return {
                ...state,
                humidity: action.payload.value
            }
        case ActionTypes.CONFIGURE_GAME_RESOURCES_LEVEL:
            return {
                ...state,
                resourcesLevel: action.payload.value
            }

        default:
            return state
    }
}
