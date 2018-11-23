import {Resource} from "../Resource";
import {Yield} from "../../../yield/Yield";
import {ResourceGroup} from "../ResourceGroup";
import {ResourceType} from "../ResourceType";

export class SilverResource extends Resource {
    public yield = new Yield(2, 0, 2, 0, 0);
    public group = ResourceGroup.LUXURY;
    public type: ResourceType.SILVER;
}