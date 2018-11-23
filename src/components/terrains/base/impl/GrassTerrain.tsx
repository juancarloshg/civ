import {TerrainType} from "../TerrainType";
import {Yield} from "../../../yield/Yield";
import {Terrain} from "../Terrain";
import {ImprovementType} from "../../improvements/ImprovementType";
import {ResourceType} from "../../resources/ResourceType";

export class GrassTerrain extends Terrain {
    public type = TerrainType.GRASS
    public allowedModifiers = []
    public allowedImprovements: [ImprovementType.MINE, ImprovementType.FARM];
    public allowedResources: [ResourceType.OIL, ResourceType.IRON, ResourceType.COW, ResourceType.SHEEP];
    public yield = new Yield(0, 2, 0, 0, 0)
}