import {TerrainType} from "../TerrainType";
import {Yield} from "../../../yield/Yield";
import {Terrain} from "../Terrain";
import {ResourceType} from "../../resources/ResourceType";
import {ImprovementType} from "../../improvements/ImprovementType";

export class DirtTerrain extends Terrain {
    public type = TerrainType.DIRT
    public allowedModifiers = []
    public allowedImprovements: [ImprovementType.FARM, ImprovementType.MINE];
    public allowedResources: [ResourceType.OIL, ResourceType.IRON, ResourceType.COW, ResourceType.SHEEP];
    public yield = new Yield(1, 1, 0, 0, 0)
}