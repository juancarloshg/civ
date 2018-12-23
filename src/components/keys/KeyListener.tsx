import * as React from 'react'
import { connect } from 'react-redux'

import { actions } from './keys.actions'
import { FlexContainer } from '../styled/FlexContainer'

interface DispatchProps {
    keydown(key: string): void
    wheel(direction: 'in' | 'out'): void
}

type KeyListenerProps = DispatchProps

const KeyListenerBase: React.SFC<KeyListenerProps> = ({ wheel, keydown, children }) => (
    <FlexContainer
        direction="column"
        grow={1}
        tabIndex={0}
        onKeyDown={ev => {
            ev.stopPropagation()
            ev.preventDefault()
            keydown(ev.key)
        }}
        onWheel={ev => {
            ev.stopPropagation()
            ev.preventDefault()
            const direction = ev.deltaY < 0 ? 'in' : 'out'
            wheel(direction)
        }}
    >
        {children}
    </FlexContainer>
)

const mapDispatch: DispatchProps = {
    keydown: actions.keydown,
    wheel: actions.wheel
}

export const KeyListener = connect<null, DispatchProps>(
    null,
    mapDispatch
)(KeyListenerBase)
