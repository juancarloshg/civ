import * as React from 'react'
import { connect } from 'react-redux'

import { actions } from './keys.actions'

interface DispatchProps {
    keydown(key: string): void
}

type KeyListenerProps = DispatchProps

class KeyListenerBase extends React.Component<KeyListenerProps> {
    componentDidMount() {
        document.addEventListener('keydown', ev => this.props.keydown(ev.key))
    }

    render() {
        return this.props.children || null
    }
}

const mapDispatch: DispatchProps = {
    keydown: actions.keydown
}

export const KeyListener = connect<null, DispatchProps>(
    null,
    mapDispatch
)(KeyListenerBase)
