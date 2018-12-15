import * as React from 'react'
import { TileWithUnits } from '../grid/grid.helpers'
import { Unit } from '../units/units'

interface TileInfoProps {
    tile: TileWithUnits
    selectUnit(unit: Unit): void
}

export const TileInfo: React.SFC<TileInfoProps> = ({ tile, selectUnit }) => (
    <>
        <p>
            Selected tile [{tile.row}, {tile.col}]
        </p>
        <br />
        <p>Tile details:</p>
        <p>Terrain - {tile.terrain}</p>
        <br />
        {tile.units.length > 0 && (
            <>
                <p>Units:</p>
                {tile.units.map((u, i) => (
                    <p key={i}>
                        {u.type} - {u.currentHp}/{u.hp} - <span onClick={() => selectUnit(u)}>USE</span>
                    </p>
                ))}
                <br />
            </>
        )}
    </>
)
