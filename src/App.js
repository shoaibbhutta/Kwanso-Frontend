import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';


import ListTask from './component/ListTask';
import NewList from './component/NewList';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={ListTask} />
      <Route exact path="/list-tasks" component={ListTask} />
      <Route exact path="/create-tasks" component={NewList} />
      <Redirect to="/" />
    </Switch>
  );
}

export default App
