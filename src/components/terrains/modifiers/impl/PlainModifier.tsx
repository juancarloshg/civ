import {TerrainModifier} from "../TerrainModifier";
import {TerrainModifierType} from "../TerrainModifierType";
import {Yield} from "../../../yield/Yield";

export class PlainModifier extends TerrainModifier {
    public type = TerrainModifierType.PLAIN;
    public yield = new Yield(0, 1, 0, 0, 0);
}