import * as React from 'react'
import { Link } from 'react-router-dom'

export const Menu: React.FunctionComponent = () => (
    <>
        <Link to="/game" data-testid="menu-start-game">
            Start
            <br />
        </Link>
        <Link to="/configure" data-testid="menu-configure-game">
            Configure
            <br />
        </Link>
    </>
)
