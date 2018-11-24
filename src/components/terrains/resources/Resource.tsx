import { YieldGenerator } from '../../yield/YieldGenerator'
import { ResourceType } from './ResourceType'
import { ResourceGroup } from './ResourceGroup'
import { Yield } from '../../yield/Yield'

export abstract class Resource implements YieldGenerator {
    public abstract type: ResourceType
    public abstract group: ResourceGroup
    public abstract yield: Yield
}
