import {TerrainModifier} from "../TerrainModifier";
import {TerrainModifierType} from "../TerrainModifierType";
import {Yield} from "../../../yield/Yield";

export class HillModifier extends TerrainModifier {
    public type = TerrainModifierType.HILL;
    public yield = new Yield(1, 0, 0, 0, 0);
}