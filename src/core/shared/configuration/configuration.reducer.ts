import { Actions, ActionTypes } from './configuration.actions'
import { Configuration } from './configuration.types'

export type ConfigurationState = Configuration

const initialState: ConfigurationState = {
    size: 50,
    viewSize: { height: 11, width: 15 },
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
