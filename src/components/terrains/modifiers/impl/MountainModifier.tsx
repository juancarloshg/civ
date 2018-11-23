import {TerrainModifier} from "../TerrainModifier";
import {TerrainModifierType} from "../TerrainModifierType";
import {Yield} from "../../../yield/Yield";

export class MountainModifier extends TerrainModifier {
    public type = TerrainModifierType.MOUNTAIN;
    public yield = new Yield(2, 0, 0, -1, 0);
}