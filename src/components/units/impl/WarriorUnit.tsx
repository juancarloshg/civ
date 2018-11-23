import {Unit} from "../Unit";
import {UnitGroup} from "../UnitGroup";
import {UnitType} from "../UnitType";
import {UnitEnvironment} from "../UnitEnvironment";

export class WarriorUnit extends Unit {
    public type = UnitType.WARRIOR
    public group = UnitGroup.MELEE
    public environment: UnitEnvironment.LAND;
    public hp = 20
    public meleeAtk = 5
    public meleeDef = 2
    public movement = 1
    public rangedAtk = 0
    public rangedDef = 1
}