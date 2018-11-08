import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'

import App from './components/app'
import Actions from './components/actions'
import Console from './components/console'
import Elements from './components/elements'
import Network from './components/network'
import Playground from './components/playground'
import Settings from './components/settings'
import NotFound from './components/404'

export default () => (
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/console" />} />
        <Route exact path="/actions" component={Actions} />
        <Route exact path="/console" component={Console} />
        <Route exact path="/elements" component={Elements} />
        <Route exact path="/playground" component={Playground} />
        <Route exact path="/network" component={Network} />
        <Route exact path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </HashRouter>
)
