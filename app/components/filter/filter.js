import './filter.scss';

import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export  default  class Filter extends React.Component {

  constructor() {
    super();
    this.isGanreChecked = this.isGanreChecked.bind(this);
    this.genreDisplay = this.genreDisplay.bind(this);
    this.toggleGenre = this.toggleGenre.bind(this);

    this.state = {
      genres: [],
      selectedGenres: [],
      value: {min: 1950, max: 1970},
      rateValue: 70,
      genreIsShowen: false
    }
  }

  toggleGenre() {
    this.setState({genreIsShowen: !this.state.genreIsShowen})
  }

  genreDisplay() {
    if (this.state.genreIsShowen) {
      return (<div className="genres-checkbox-list">{this.state.genres.map((genreObj) => {
        return (
          <label key={genreObj.id}>
            <input type="checkbox" key={ genreObj.id} checked={this.isGanreChecked(genreObj.id)}
                   onChange={(e) => this.props.selectGenre(genreObj.id, e.target.checked)}
            /> { genreObj.name}

          </label>
        )
      })}</div>)
    }
  }

  isGanreChecked(checkboxid) {
    for (const id of this.props.selectedGenres) {
      if (checkboxid === id) {
        return true
      }
    }
    return false
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
        <img src="../../assets/img/Logo.png" alt="" className="logo"/>
        <h1 className="filter-header">Let’s flicks you some movies</h1>

        <div className="filter-area">
          <div className="genre spacing">
            <span className="genre-title">Genre</span>
            <div className="genre-toggle-btn" onClick={this.toggleGenre}> >>></div>
            {this.genreDisplay()}
          </div>


          <div className="min-rate spacing">
            <span className="slider-header"> Years Range </span>
            <InputRange
              maxValue={2017}
              minValue={1900}
              value={this.props.value}
              onChange={value => this.props.changeValue(value)}/>
          </div>

          <div className="years-range spacing">
            <span className="slider-header"> Minimum Rating  </span>
            <InputRange
              maxValue={100}
              minValue={0}
              value={this.props.rateValue}
              onChange={value => this.props.changeRateValue(value)}/>
          </div>

          <div className="string-filter spacing">
            <input className="sarching" value={this.props.query} onChange={e => this.props.changeQuery(e.target.value)} type="text"
                   placeholder="Or search by actor, actress, director, producer"/>
          </div>
          <div className="search-btn">
            <span> START NOW </span>
          </div>
        </div>
      </div>
    )
  }

}




