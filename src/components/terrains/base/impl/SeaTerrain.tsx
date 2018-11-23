import {TerrainType} from "../TerrainType";
import {Yield} from "../../../yield/Yield";
import {Terrain} from "../Terrain";
import {ResourceType} from "../../resources/ResourceType";
import {ImprovementType} from "../../improvements/ImprovementType";

export class SeaTerrain extends Terrain {
    public type = TerrainType.SEA
    public allowedModifiers = []
    public allowedImprovements: [ImprovementType.FISHING_SHIP];
    public allowedResources: [ResourceType.FISH];
    public yield = new Yield(0, 2, 1, 0, 0)
}