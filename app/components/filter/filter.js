import './filter.scss';

import React from 'react';
import {connect} from 'react-redux';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export  default  class Filter extends React.Component {

  constructor() {
    super();
    this.isGanreChecked = this.isGanreChecked.bind(this);
    this.toggleGenreChecked = this.toggleGenreChecked.bind(this);


    this.state = {
      genres: [],
      selectedGenres: []
    }
  }

  isGanreChecked(checkboxid) {
    for (const id of this.state.selectedGenres) {
      console.info(id, this.state.selectedGenres);
      if (checkboxid === id) {
        return true
      }
    }
    return false
  }

  toggleGenreChecked(e, objId) {
    console.info(e.target,  objId);
    const shouldBeSelected = e.target.checked;

    if (!shouldBeSelected) {
      //remove from state

      const indexToRemove = this.state.selectedGenres.indexOf(objId);
      console.info(indexToRemove);
      const newSelectedGenres = [...this.state.selectedGenres];
      newSelectedGenres.splice(indexToRemove, 1);
      console.info('remoooooooove', newSelectedGenres);
      this.setState( {selectedGenres : newSelectedGenres})
    } else {
      //add
      console.info('adddddddddd');
      let newSelectedGenres = [...this.state.selectedGenres];
      newSelectedGenres.push(objId);
      console.info(newSelectedGenres);
      this.setState( {selectedGenres : newSelectedGenres})
    }
  }



  createGenresList() {
    function reqListener (e) {
      const genreData = JSON.parse(e.target.responseText);
      this.setState({genres : genreData.genres});

    }

    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener.bind(this));
    oReq.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=022c8dc6705c5ca51f38b984d6a5be4a&language=en-US");
    oReq.send();
  }
  componentDidMount () {
    this.createGenresList()
  }

  render() {

    return (
      <div className="filter">
        <h1>Filter....</h1>

        <div className="genre">
          <span className="genre-title">Genre</span>
          <span className="ganres-selected">All</span>
          <div className="lang-toggler-btn"> > </div>
          <div className="genres-checkbox-list">{this.state.genres.map((genreObj) => {
            // console.info(genreObj);
            return (
              <label  key = { genreObj.id}>
                { genreObj.name}
                <input type = "checkbox" key ={ genreObj.id} checked={this.isGanreChecked(genreObj.id)}
                       onChange={(e)=> this.toggleGenreChecked(e, genreObj.id )}
                />
              </label>
            )
          })}</div>
        </div>

        <div className="lang">
          <span className="lang-title">Language</span>
          <span className="lang-selected">All</span>
          <div> ></div>
        </div>

        <div className="min-rate">
          <MinMax />
        </div>

        <div className="years-range">
          <YearsRange />
        </div>

        <div className="string-filter">
          <input type="text" placeholder="Find movie by name/actor/director"/>
        </div>
        <div className="search-btn"><span>Find me movies!</span></div>
      </div>
    )
  }

}

class MinMax extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {min: 1950, max: 1970},
    };
  }

  render() {
    return (
      <InputRange
        maxValue={2017}
        minValue={1900}
        value={this.state.value}
        onChange={value => this.setState({value})}/>
    );
  }
}

class YearsRange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: 5};
  }

  render() {
    return (
      <InputRange
        maxValue={10}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({value})}/>
    );
  }
}


