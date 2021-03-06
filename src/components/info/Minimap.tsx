import * as React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { actions as gridActions } from '../../core/grid/grid.actions'
import { ExtendedGrid, ExtendedTile, GridPosition } from '../../core/shared/shared.types'
import { ApplicationState } from '../../rootReducer'
import { getExtendedGrid, getMainViewGridBorders } from '../../core/shared/shared.selectors'
import { getSize } from '../../core/shared/configuration/configuration.selector'
import { getColor } from '../viewGrid/tile/StyledTile'

const pixelRatio = 10

interface StateProps {
    grid: ExtendedGrid
    size: number
    viewGridBorders: GridPosition[]
}

interface OwnProps {
    className?: string
}

interface DispatchProps {
    setViewGridOrigin(position: GridPosition): void
}

type Props = StateProps & DispatchProps & OwnProps

export class MinimapBase extends React.Component<Props> {
    canvas: React.RefObject<HTMLCanvasElement>

    constructor(props: Props) {
        super(props)
        this.canvas = React.createRef()
    }

    componentDidMount() {
        this.draw()
    }

    componentDidUpdate() {
        this.draw()
    }

    draw() {
        const context = this.canvas.current!.getContext('2d')!
        this.drawGrid(context)
        this.drawViewGridBorders(context)
    }

    getColor(tile: ExtendedTile) {
        return tile.owner ? tile.owner.color : getColor({ tile })
    }

    drawGrid(context: CanvasRenderingContext2D) {
        this.props.grid.forEach((tiles, row) => tiles.forEach((tile, col) => this.paint(context, row, col, this.getColor(tile))))
    }

    drawViewGridBorders(context: CanvasRenderingContext2D) {
        this.props.viewGridBorders.forEach(({ row, col }) => this.paint(context, row, col, 'black'))
    }

    paint(context: CanvasRenderingContext2D, row: number, col: number, color: string) {
        context.fillStyle = color
        context.fillRect(col * pixelRatio, row * pixelRatio, pixelRatio, pixelRatio)
    }

    handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const x = event.clientX
        const y = event.clientY
        const canvasRect = this.canvas.current!.getBoundingClientRect()
        const canvasClickCoords = { x: x - canvasRect.left, y: y - canvasRect.top }
        const clickGridPosition = {
            col: Math.floor((canvasClickCoords.x / canvasRect.width) * this.props.size),
            row: Math.floor((canvasClickCoords.y / canvasRect.height) * this.props.size)
        }
        this.props.setViewGridOrigin(clickGridPosition)
    }

    render() {
        const { size, className } = this.props
        return <canvas onClick={this.handleClick} className={className} height={size * pixelRatio} width={size * pixelRatio} ref={this.canvas} />
    }
}

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    grid: getExtendedGrid,
    size: getSize,
    viewGridBorders: getMainViewGridBorders
})

const mapDispatch: DispatchProps = {
    setViewGridOrigin: (position: GridPosition) => gridActions.setViewGridOrigin(position)
}

export const Minimap = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(MinimapBase)
