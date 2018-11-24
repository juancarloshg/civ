import { UnitType } from './UnitType'
import { UnitGroup } from './UnitGroup'
import { TileProps } from '../grid/tile/Tile'
import { TerrainType } from '../terrains/base/TerrainType'
import { UnitEnvironment } from './UnitEnvironment'
import { TerrainModifierType } from '../terrains/modifiers/TerrainModifierType'

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

    private terrainMovement = new Map([
        [TerrainType.GRASS, 1],
        [TerrainType.DIRT, 1],
        [TerrainType.DESERT, 2],
        [TerrainType.SNOW, 2],
        [TerrainType.SEA, 3]
    ])

    private modifierMovement = new Map([
        [TerrainModifierType.PLAIN, 0],
        [TerrainModifierType.RAINFOREST, 3],
        [TerrainModifierType.FOREST, 2],
        [TerrainModifierType.ICE, 0],
        [TerrainModifierType.MOUNTAIN, 3],
        [TerrainModifierType.HILL, 1],
        [TerrainModifierType.RIVER, 1],
        [TerrainModifierType.VOLCANO, 3],
        [TerrainModifierType.SHORE, 0],
        [TerrainModifierType.COAST, 0]
    ])
}
