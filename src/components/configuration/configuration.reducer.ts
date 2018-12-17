import { Actions, ActionTypes } from './configuration.actions'

export interface Size {
    height: number
    width: number
}

export interface ConfigurationState {
    size: number
    viewSize: Size
    seaLevel: number
    tectonicActivity: number
    humidity: number
    resourcesLevel: number
}

const initialState: ConfigurationState = {
    size: 50,
    viewSize: { height: 10, width: 15 },
    seaLevel: 3,
    tectonicActivity: 3,
    humidity: 3,
    resourcesLevel: 3
}

export const reducer = (state: ConfigurationState = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.CONFIGURE_GAME:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}
