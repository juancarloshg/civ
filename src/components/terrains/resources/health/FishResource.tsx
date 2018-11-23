import {Resource} from "../Resource";
import {Yield} from "../../../yield/Yield";
import {ResourceGroup} from "../ResourceGroup";
import {ResourceType} from "../ResourceType";

export class FishResource extends Resource {
    public yield = new Yield(0, 3, 1, 0, 0);
    public group = ResourceGroup.HEALTH;
    public type: ResourceType.FISH;
}