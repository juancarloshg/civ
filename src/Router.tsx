import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Menu } from './components/Menu'
import { Game } from './components/Game'
import { Configuration } from './components/configuration/Configuration'

export const Router = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Menu} />
            <Route path="/game" component={Game} />
            <Route path="/configure" component={Configuration} />
        </div>
    </BrowserRouter>
)
