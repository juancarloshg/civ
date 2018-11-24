import { Unit } from '../Unit'
import { UnitGroup } from '../UnitGroup'
import { UnitType } from '../UnitType'
import { UnitEnvironment } from '../UnitEnvironment'

export class ArcherUnit extends Unit {
    public type = UnitType.ARCHER
    public group = UnitGroup.RANGED
    public environment = UnitEnvironment.LAND
    public hp = 20
    public meleeAtk = 1
    public meleeDef = 1
    public movement = 1
    public rangedAtk = 4
    public rangedDef = 0
}
