import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesProvider from './context/RecipesProvider';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <RecipesProvider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route
          exact
          path="/meals/:id"
          //component={ RecipeDetails }
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id"
          //component={ RecipeDetails }
          render={ (props) => <RecipeDetails { ...props } /> }
        />
      </RecipesProvider>
    </Switch>
  );
}

export default App;
