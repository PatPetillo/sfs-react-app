import React, { FunctionComponent } from 'react';
import { BrowserRouter as Switch, Redirect, Route } from 'react-router-dom';
import PersonalFinance from './pages/PersonalFinance/PersonalFinance';

const App: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/personal-finance" />
        <PersonalFinance />
      </Route>
    </Switch>
  );
};

export default App;
