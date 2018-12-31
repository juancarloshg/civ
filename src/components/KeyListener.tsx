import * as React from 'react'
import { connect } from 'react-redux'

import { actions } from '../core/user.actions'
import { FlexContainer } from './styled/FlexContainer'

interface DispatchProps {
    keydown(key: string): void
    wheel(direction: 'in' | 'out'): void
}

type KeyListenerProps = DispatchProps

class KeyListenerBase extends React.Component<KeyListenerProps> {
    componentDidMount() {
        document.addEventListener('keydown', ev => {
            ev.stopPropagation()
            ev.preventDefault()
            this.props.keydown(ev.key)
        })

        document.addEventListener('wheel', ev => {
            ev.stopPropagation()
            ev.preventDefault()
            const direction = ev.deltaY < 0 ? 'in' : 'out'
            this.props.wheel(direction)
        })
    }

    render() {
        return (
            <FlexContainer direction="column" grow={1} tabIndex={0}>
                {this.props.children}
            </FlexContainer>
        )
    }
}

const mapDispatch: DispatchProps = {
    keydown: actions.keydown,
    wheel: actions.wheel
}

export const KeyListener = connect<null, DispatchProps>(
    null,
    mapDispatch
)(KeyListenerBase)
