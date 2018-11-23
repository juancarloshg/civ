import {YieldGenerator} from "../../yield/YieldGenerator";
import {ImprovementType} from "./ImprovementType";
import {Yield} from "../../yield/Yield";
import {TechnologyType} from "../../technologies/TechnologyType";

export abstract class Improvement implements YieldGenerator {
    public abstract type: ImprovementType
    public abstract yield: Yield
    public abstract requiredTechs: TechnologyType[]
}