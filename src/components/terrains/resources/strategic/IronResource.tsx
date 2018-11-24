import { Resource } from '../Resource'
import { Yield } from '../../../yield/Yield'
import { ResourceGroup } from '../ResourceGroup'
import { ResourceType } from '../ResourceType'

export class IronResource extends Resource {
    public yield = new Yield(3, 0, 0, 0, 0)
    public group = ResourceGroup.STRATEGIC
    public type: ResourceType.IRON
}
