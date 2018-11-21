abstract class AbstractUnit {
    abstract hp: number
    abstract meleeAtk: number
    abstract meleeDef: number
    abstract rangedAtk: number
    abstract rangedDef: number
    abstract movement: number
    abstract movementCosts: {[key in Terrain] : number}
}