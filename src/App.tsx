import React from 'react';
import { BrowserRouter as Switch, Redirect, Route } from 'react-router-dom';
import PersonalFinance from './pages/PersonalFinance/PersonalFinance';

const App = () => {
  return (
    <Switch>
      <Route path='/'>
        <Redirect to='/personal-finance' />
        <PersonalFinance />
      </Route>
    </Switch>
  );
};

export default App;
