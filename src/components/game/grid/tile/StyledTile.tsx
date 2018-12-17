import styled from 'styled-components'
import { squareSize } from '../constants'
import { Props as TileProps } from './Tile'

type StyledTileProps = Pick<TileProps, 'tile' | 'isSelectedTile'>

const getColor = (props: StyledTileProps) => {
    const terrain = props.tile.terrain
    switch (terrain) {
        case 'sea':
            return '#2860ba'
        case 'snow':
            return '#f2f5f9'
        case 'desert':
            return '#edefba'
        case 'dirt':
            return 'Olive'
        case 'grass':
            return '#06891d'
        default:
            return ''
    }
}

const getBorderSize = (props: StyledTileProps) => (props.tile.city ? (props.isSelectedTile ? 8 : 7) : props.isSelectedTile ? 3 : 1)
const getBorderStyle = (props: StyledTileProps) => (props.tile.city ? 'double' : 'solid')

export const StyledTile = styled.span<StyledTileProps>`
    flex: 1 0 ${squareSize.width};
    display: inline-block;
    border-width: ${getBorderSize}px;
    border-style: ${getBorderStyle};
    border-color: black;
    box-sizing: border-box;
    background: ${getColor};
`
