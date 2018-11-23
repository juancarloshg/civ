import {Resource} from "../Resource";
import {Yield} from "../../../yield/Yield";
import {ResourceGroup} from "../ResourceGroup";
import {ResourceType} from "../ResourceType";

export class CowResource extends Resource {
    public yield = new Yield(1, 3, 0, 0, 0);
    public group = ResourceGroup.HEALTH;
    public type: ResourceType.COW;
}