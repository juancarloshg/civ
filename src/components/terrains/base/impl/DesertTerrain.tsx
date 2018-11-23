import {TerrainType} from "../TerrainType";
import {Yield} from "../../../yield/Yield";
import {Terrain} from "../Terrain";
import {ResourceType} from "../../resources/ResourceType";

export class DesertTerrain extends Terrain {
    public type = TerrainType.DESERT
    public allowedModifiers = []
    public allowedImprovements: [];
    public allowedResources: [ResourceType.OIL];
    public yield = new Yield(0, 0, 0, -1, 0)
}