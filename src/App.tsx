import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import ExamplesPage from './pages/ExamplesPage';
import CompositionalPatterns from './pages/CompositionalPatterns';
import SlotMachinePage from './pages/SlotMachinePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Route path="/compositional-patterns">
            <CompositionalPatterns />
          </Route>
          <Route path="/slot-machine">
            <SlotMachinePage />
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
