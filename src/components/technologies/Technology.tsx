import {TechnologyType} from "./TechnologyType";

export abstract class Technology {
    public abstract requiredTechs: TechnologyType[]
    public abstract cost: number
    public currentResearch = 0
    public onResearch(): void {
        // empty
    }
}