import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesProvider from './context/RecipesProvider';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';

function App() {
  return (
    <Switch>
      <RecipesProvider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
      </RecipesProvider>
    </Switch>
  );
}

export default App;
