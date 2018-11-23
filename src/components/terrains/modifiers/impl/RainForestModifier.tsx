import {TerrainModifier} from "../TerrainModifier";
import {TerrainModifierType} from "../TerrainModifierType";
import {Yield} from "../../../yield/Yield";

export class RainForestModifier extends TerrainModifier {
    public type = TerrainModifierType.RAINFOREST;
    public yield = new Yield(2, 1, 0, -2, 2);
}