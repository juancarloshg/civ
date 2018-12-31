import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Menu } from './views/Menu'
import { Game } from './views/Game'
import { Configuration } from './views/Configuration'

export const Router = () => (
    <BrowserRouter>
        <>
            <Route exact path="/" component={Menu} />
            <Route path="/game" component={Game} />
            <Route path="/configure" component={Configuration} />
        </>
    </BrowserRouter>
)
