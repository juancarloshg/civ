import * as React from 'react'
import { ExtendedGrid } from '../../grid/grid.helpers'
import { createStructuredSelector } from 'reselect'
import { ApplicationState } from '../../../../rootReducer'
import { getExtendedGrid } from '../../grid/grid.selectors'
import { getSize } from '../../../configuration/configuration.selector'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getColor } from '../../grid/tile/StyledTile'

const StyledCanvas = styled.canvas`
    height: 100%;
    width: 100%;
`

interface StateProps {
    grid: ExtendedGrid
    size: number
}

type Props = StateProps

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
    render() {
        const { size } = this.props
        return <StyledCanvas height={size} width={size} ref={this.canvas} />
    }
}

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    grid: getExtendedGrid,
    size: getSize
})

export const Minimap = connect<StateProps>(mapState)(MinimapBase)
