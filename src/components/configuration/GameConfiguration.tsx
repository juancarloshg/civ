import {MeasureType} from "./MeasureType";

export class GameConfiguration {
    public gridSize: {rows: number, columns: number}
    public seaLevel: MeasureType
    public tectonicActivity: MeasureType
    public humidity: MeasureType
    public resourcesLevel: MeasureType
}