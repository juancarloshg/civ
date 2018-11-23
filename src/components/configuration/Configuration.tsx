import * as React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import Slider from '@material-ui/lab/Slider';

import {actions} from "./configuration.actions";
import {ApplicationState} from "src/rootReducer";

interface StateProps {
    size: number;
    seaLevel: number;
    tectonicActivity: number;
    humidity: number;
    resourcesLevel: number;
}

interface DispatchProps {
    configureGameSize(value: number): void;
    configureGameSeaLevel(value: number): void;
    configureGameTectonicActivity(value: number): void;
    configureGameResourcesLevel(value: number): void;
    configureGameHumidity(value: number): void;
}

type ConfigurationProps = StateProps & DispatchProps;

const ConfigurationBase: React.FunctionComponent<ConfigurationProps> = ({
                                                        size,
                                                        seaLevel,
                                                        tectonicActivity,
                                                        humidity,
                                                        resourcesLevel,
                                                        configureGameSize,
                                                        configureGameSeaLevel,
                                                        configureGameTectonicActivity,
                                                        configureGameResourcesLevel,
                                                        configureGameHumidity
                                                      }) => (
    <div data-testid="game-configuration-container">
        <b>Configuration</b> <br/>

        Size
        <Slider
            value={size}
            min={0}
            max={5}
            step={1}
            onChange={(event, value) => {configureGameSize(value); console.log('kk')}}
        /><br/>
        Sea Level
        <Slider
            value={size}
            min={0}
            max={5}
            step={1}
            onChange={(event, value) => configureGameSeaLevel(value)}
        /><br/>
        Tectonic Activity
        <Slider
            value={size}
            min={0}
            max={5}
            step={1}
            onChange={(event, value) => configureGameTectonicActivity(value)}
        /><br/>
        Resources Level
        <Slider
            value={size}
            min={0}
            max={5}
            step={1}
            onChange={(event, value) => configureGameResourcesLevel(value)}
        /><br/>
        Humidity
        <Slider
            value={size}
            min={0}
            max={5}
            step={1}
            onChange={(event, value) => configureGameHumidity(value)}
        /><br/>
    </div>
);

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    size: (state: ApplicationState) => state.configuration.size,
    seaLevel: (state: ApplicationState) => state.configuration.seaLevel,
    tectonicActivity: (state: ApplicationState) => state.configuration.tectonicActivity,
    resourcesLevel: (state: ApplicationState) => state.configuration.resourcesLevel,
    humidity: (state: ApplicationState) => state.configuration.humidity,
});

const mapDispatch = {
    configureGameSize: actions.configureGameSize,
    configureGameSeaLevel: actions.configureGameSeaLevel,
    configureGameTectonicActivity: actions.configureGameTectonicActivity,
    configureGameResourcesLevel: actions.configureGameResourcesLevel,
    configureGameHumidity: actions.configureGameHumidity
};

export const Configuration = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(ConfigurationBase);
