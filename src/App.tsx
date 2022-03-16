import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import ExamplesPage from './pages/ExamplesPage';
import CompositionalPatterns from './pages/CompositionalPatterns';
import JavascriptPatterns from './pages/JavascriptPatterns';
import { TraylorsOnly } from './pages/TraylorsOnly';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Route path="/TraylorsOnly">
            <TraylorsOnly />
          </Route>
          <Route path="/compositional-patterns">
            <CompositionalPatterns />
          </Route>
          <Route path="/js-patterns">
            <JavascriptPatterns />
          </Route>
          <Route path="/:segment">
            <ExamplesPage />
          </Route>
          <Route path="/">
            <ExamplesPage />
          </Route>
        </Switch>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default App;
