import './filter.scss';

import React from 'react';
import {connect} from 'react-redux';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export  default  class Filter extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (<div className="filter">
        <h1>Filter....</h1>

        <div className="genre">
          <span className="genre-title">Genre</span>
          <span className="ganres-selected">All</span>
          <div> > </div>
        </div>

        <div className="lang">
          <span className="lang-title">Language</span>
          <span className="lang-selected">All</span>
          <div> > </div>
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
        <div className="search-btn">Find me some movies!</div>
      </div>
    )
  }

}

class MinMax extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 1950, max: 1970 },
    };
  }

  render() {
    return (
      <InputRange
        maxValue={2017}
        minValue={1900}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
    );
  }
}

class YearsRange extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: 5 };
  }

  render() {
    return (
      <InputRange
        maxValue={10}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
    );
  }
}


