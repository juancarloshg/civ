import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'

import { ExtendedGrid } from '../../grid/grid.helpers'
import { ApplicationState } from '../../../../rootReducer'
import { getExtendedGrid } from '../../grid/grid.selectors'
import { getSize } from '../../../configuration/configuration.selector'
import { getColor } from '../../grid/tile/StyledTile'
import { actions as gridActions } from '../../grid/grid.actions'
import { GridPosition } from '../../grid/grid.types'

const StyledCanvas = styled.canvas`
    height: 100%;
    width: 100%;
`

interface StateProps {
    grid: ExtendedGrid
    size: number
}

interface DispatchProps {
    setViewGridOrigin(position: GridPosition): void
}

type Props = StateProps & DispatchProps

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

        this.props.grid.forEach((tiles, row) =>
            tiles.forEach((tile, col) => {
                context.fillStyle = getColor({ tile })
                context.fillRect(row, col, 1, 1)
            })
        )
    }

    handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const x = event.clientX
        const y = event.clientY
        const canvasRect = this.canvas.current!.getBoundingClientRect()
        const canvasClickCoords = { x: x - canvasRect.left, y: y - canvasRect.top }
        const clickGridPosition = {
            row: Math.floor((canvasClickCoords.x / canvasRect.width) * this.props.size),
            col: Math.floor((canvasClickCoords.y / canvasRect.height) * this.props.size)
        }
        this.props.setViewGridOrigin(clickGridPosition)
    }

    render() {
        const { size } = this.props
        return <StyledCanvas onClick={this.handleClick} height={size} width={size} ref={this.canvas} />
    }
}

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    grid: getExtendedGrid,
    size: getSize
})

const mapDispatch: DispatchProps = {
    setViewGridOrigin: (position: GridPosition) => gridActions.setViewGridOrigin(position)
}

export const Minimap = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(MinimapBase)
