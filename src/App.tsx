import * as React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import { Router } from './Router'
import { rootReducer } from './rootReducer'
import { rootSaga } from './rootSaga'
import { Footer } from './components/Footer'
import { SiteWrapper } from './components/SiteWrapper'
import { Main } from './components/Main'

const sagaMiddleware = createSagaMiddleware()

// tslint:disable-next-line:no-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, logger)))
sagaMiddleware.run(rootSaga)

export const App: React.FunctionComponent = () => (
    <Provider store={store}>
        <SiteWrapper>
            <Main>
                <Router />
            </Main>
            <Footer />
        </SiteWrapper>
    </Provider>
)
