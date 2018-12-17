import * as React from 'react'
import { connect } from 'react-redux'

import { actions } from './keys.actions'
import { FlexContainer } from '../styled/FlexContainer'

interface DispatchProps {
    keydown(key: string): void
}

type KeyListenerProps = DispatchProps

const KeyListenerBase: React.SFC<KeyListenerProps> = ({ keydown, children }) => (
    <FlexContainer
        direction="column"
        grow={1}
        tabIndex={0}
        onKeyDown={ev => {
            ev.stopPropagation()
            keydown(ev.key)
        }}
    >
        {children}
    </FlexContainer>
)

const mapDispatch: DispatchProps = {
    keydown: actions.keydown
}

export const KeyListener = connect<null, DispatchProps>(
    null,
    mapDispatch
)(KeyListenerBase)
