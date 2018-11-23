import {TerrainModifier} from "../TerrainModifier";
import {TerrainModifierType} from "../TerrainModifierType";
import {Yield} from "../../../yield/Yield";

export class RiverModifier extends TerrainModifier {
    public type = TerrainModifierType.RIVER;
    public yield = new Yield(1, 2, 1, 1, 0);
}