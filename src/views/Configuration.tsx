import * as React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Slider } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { ApplicationState } from '../rootReducer'
import { ConfigurationState } from '../core/shared/configuration/configuration.reducer'
import { getConfiguration } from '../core/shared/configuration/configuration.selector'
import { actions } from '../core/shared/configuration/configuration.actions'

interface StateProps {
    configuration: ConfigurationState
}

interface DispatchProps {
    configureGame(configuration: Partial<ConfigurationState>): void
}

type ConfigurationProps = StateProps & DispatchProps

const ConfigurationBase: React.FunctionComponent<ConfigurationProps> = ({ configuration, configureGame }) => (
    <div data-testid="game-configuration-container">
        <b>Configuration</b> <br />
        Size
        <Slider value={configuration.size} min={0} max={500} step={1} onChange={(_, value) => configureGame({ size: value })} />
        <br />
        Sea Level
        <Slider value={configuration.seaLevel} min={0} max={5} step={1} onChange={(_, value) => configureGame({ seaLevel: value })} />
        <br />
        Tectonic Activity
        <Slider value={configuration.tectonicActivity} min={0} max={5} step={1} onChange={(_, value) => configureGame({ tectonicActivity: value })} />
        <br />
        Resources Level
        <Slider value={configuration.resourcesLevel} min={0} max={5} step={1} onChange={(_, value) => configureGame({ resourcesLevel: value })} />
        <br />
        Humidity
        <Slider value={configuration.humidity} min={0} max={5} step={1} onChange={(_, value) => configureGame({ humidity: value })} />
        <br />
        <Link to="/game" data-testid="menu-start-game">
            Start
            <br />
        </Link>
    </div>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    configuration: getConfiguration
})

const mapDispatch = {
    configureGame: actions.configureGame
}

export const Configuration = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(ConfigurationBase)
