import { Resource } from '../Resource'
import { Yield } from '../../../yield/Yield'
import { ResourceGroup } from '../ResourceGroup'
import { ResourceType } from '../ResourceType'

export class OilResource extends Resource {
    public yield = new Yield(5, 0, 2, -2, 0)
    public group = ResourceGroup.STRATEGIC
    public type: ResourceType.OIL
}
