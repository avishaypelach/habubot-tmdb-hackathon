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
    this.genreDisplay = this.genreDisplay.bind(this);
    this.toggleGenre = this.toggleGenre.bind(this);

    this.state = {
      genres: [],
      selectedGenres: [],
      value: {min: 1950, max: 1970},
      rateValue: 70,
      selectedGenres: [],
      genreIsShowen: false
    }
  }

  toggleGenre() {
    console.info('heyyyyyy');

    this.setState({genreIsShowen: !this.state.genreIsShowen})
  }

  genreDisplay(){
    if(this.state.genreIsShowen){
      return(<div className="genres-checkbox-list">{this.state.genres.map((genreObj) => {
        return (
          <label key={genreObj.id}>
            <input type="checkbox" key={ genreObj.id} checked={this.isGanreChecked(genreObj.id)}
                   onChange={(e) => this.toggleGenreChecked(e, genreObj.id)}
            /> { genreObj.name}

          </label>
        )
      })}</div>)
    }
  }

  isGanreChecked(checkboxid) {
    for (const id of this.state.selectedGenres) {
      if (checkboxid === id) {
        return true
      }
    }
    return false
  }

  toggleGenreChecked(e, objId) {
    const shouldBeSelected = e.target.checked;

    if (!shouldBeSelected) {
      //remove from state

      const indexToRemove = this.state.selectedGenres.indexOf(objId);
      const newSelectedGenres = [...this.state.selectedGenres];
      newSelectedGenres.splice(indexToRemove, 1);
      this.setState({selectedGenres: newSelectedGenres})
    } else {
      //add
      let newSelectedGenres = [...this.state.selectedGenres];
      newSelectedGenres.push(objId);
      this.setState({selectedGenres: newSelectedGenres})
    }
  }


  createGenresList() {
    function reqListener(e) {
      const genreData = JSON.parse(e.target.responseText);
      this.setState({genres: genreData.genres});
    }

    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener.bind(this));
    oReq.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=022c8dc6705c5ca51f38b984d6a5be4a&language=en-US");
    oReq.send();
  }

  componentDidMount() {
    this.createGenresList()
  }

  render() {
    console.info(this.state.genreIsShowen);

    return (
      <div className="filter">
        <img src="../../assets/img/Logo.png" alt=""/>
        <h1 className="filter-header">Let’s flicks you some movies</h1>

        <div className="filter-area">
          <div className="genre">
            <span className="genre-title">Genre</span>
            <div className="genre-toggle-btn" onClick={this.toggleGenre}> >>> </div>
            {this.genreDisplay()}
          </div>


          <div className="min-rate">
            <span className="slider-header"> Minimum Rating </span>
            <InputRange
              maxValue={2017}
              minValue={1900}
              value={this.state.value}
              onChange={value => this.setState({value: value})}/>
          </div>

          <div className="years-range">
            <span className="slider-header"> Minimum Year Range </span>
            <InputRange
              maxValue={100}
              minValue={0}
              value={this.state.rateValue}
              onChange={value => this.setState({rateValue:value})}/>
          </div>

          <div className="string-filter">
            <input ref={(input) => { this.textInput = input; }} type="text" placeholder="Or search by actor, actress, director, producer"/>
          </div>
          <div className="search-btn">
            <span> START NOW </span>
          </div>
        </div>
      </div>
    )
  }

}




