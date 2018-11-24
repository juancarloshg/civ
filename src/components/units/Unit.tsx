import { UnitType } from './UnitType'
import { UnitGroup } from './UnitGroup'
import { TileProps } from '../grid/tile/Tile'
import { TerrainModifierType } from '../terrains/modifiers/terrainModifiers'
import { TerrainType } from '../terrains/base/terrains'
import { UnitEnvironment } from './UnitEnvironment'

export abstract class Unit {
    public abstract type: UnitType
    public abstract group: UnitGroup
    public abstract environment: UnitEnvironment
    public abstract hp: number
    public abstract meleeAtk: number
    public abstract meleeDef: number
    public abstract rangedAtk: number
    public abstract rangedDef: number
    public abstract movement: number
    public turnMovement: number

    public move(tile: TileProps): boolean {
        let mvCost = 1
        if (this.environment === UnitEnvironment.LAND) {
            mvCost = this.terrainMovement[tile.terrain]
            tile.terrainModifiers.forEach(modifier => {
                mvCost += this.modifierMovement[modifier]
            })
            // TODO calculate impenetrable terrains, allow at least 1 movement
        }

        if (mvCost <= this.turnMovement) {
            tile.units.push(this)
            this.turnMovement -= mvCost
            return true
        } else {
            return false
        }
    }

    public initTurn(): void {
        this.turnMovement = this.movement
    }

    private terrainMovement = new Map<TerrainType, number>([['grass', 1], ['dirt', 1], ['desert', 2], ['snow', 2], ['sea', 3]])

    private modifierMovement = new Map<TerrainModifierType, number>([
        ['plain', 0],
        ['rainforest', 3],
        ['forest', 2],
        ['ice', 0],
        ['mountain', 3],
        ['hill', 1],
        ['river', 1],
        ['volcano', 3],
        ['shore', 0],
        ['coast', 0]
    ])
}
