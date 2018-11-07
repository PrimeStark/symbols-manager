import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'

import App from './components/app'
import Console from './components/console'
import NotFound from './components/404'

export default () => (
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/console" />} />
        <Route exact path="/console" component={Console} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </HashRouter>
)
