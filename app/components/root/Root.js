import React from 'react';
import Filter from '../filter/filter';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Filter }/>
        </Switch>
      </BrowserRouter>
    )
  }
}
