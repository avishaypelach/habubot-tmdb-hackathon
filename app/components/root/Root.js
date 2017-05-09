import React from 'react';
import Filter from '../filter/filter';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class Root extends React.Component {
  constructor() {
    super()
    this.state = {
      value: {min: 1950, max: 1970},
      rateValue: 70,
      selectedGenres: []
    }
  }

  toggleGenreSelected(genreId, shouldBeSelected) {
    if (!shouldBeSelected) {
      const indexToRemove = this.state.selectedGenres.indexOf(genreId);
      const newSelectedGenres = [...this.state.selectedGenres];
      newSelectedGenres.splice(indexToRemove, 1);
      this.setState({selectedGenres: newSelectedGenres})
    } else {
      //add
      let newSelectedGenres = [...this.state.selectedGenres];
      newSelectedGenres.push(genreId);
      this.setState({selectedGenres: newSelectedGenres})
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) =>
            <Filter
              value={this.state.value}
              rateValue={this.state.rateValue}
              selectedGenres={this.state.selectedGenres}
              changeValue={(v) => this.setState({value: v})}
              changeRateValue={(v) => this.setState({rateValue: v})}
              selectGenre={(genre, shouldBeSelected) => this.toggleGenreSelected(genre, shouldBeSelected)}
              {...props} /> }/>
        </Switch>
      </BrowserRouter>
    )
  }
}
