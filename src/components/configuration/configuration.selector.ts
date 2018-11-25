import { ApplicationState } from 'src/rootReducer'
import { ConfigurationState } from './configuration.reducer'
import { createSelector } from 'reselect'

const getRoot = (state: ApplicationState) => state.configuration

export const getConfiguration = getRoot

export const getSize = createSelector(
    getConfiguration,
    (configuration: ConfigurationState) => configuration.size
)

export const getViewSize = createSelector(
    getConfiguration,
    (configuration: ConfigurationState) => configuration.viewSize
)
