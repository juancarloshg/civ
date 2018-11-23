import {TerrainModifier} from "../TerrainModifier";
import {TerrainModifierType} from "../TerrainModifierType";
import {Yield} from "../../../yield/Yield";

export class VolcanoModifier extends TerrainModifier {
    public type = TerrainModifierType.VOLCANO;
    public yield = new Yield(3, 3, 0, -5, 1);
}