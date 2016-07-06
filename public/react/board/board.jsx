import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import jquery from 'jquery';
import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';

const restAPI = restful('', fetchBackend(fetch));

import Theme from '../theme.jsx';

var Board = React.createClass({
  styles: {
    gridListStyle: {
      backgroundColor: Theme.palette.accent2Color,
      marginLeft: 100,
      marginRight: 100,
      marginBottom: 24,
      marginTop: 10,
      scrollY: 'auto',
    },
  },
  getInitialState: function() {
    return {
      unselectedColor: '#fff',
      config: null,
      userColor: null
    };
  },
  getRandomValue: function() {
    return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
  },
  componentWillMount: function() {
    var that = this;
    restAPI.all('config').get('').then((response) => {
      that.setState({config: response.body().data(), userColor:
        'rgb(' + this.getRandomValue() + ',' + this.getRandomValue() + ',' +
        this.getRandomValue() + ')'});
    });
  },
  startHover: function(squareId) {
    var that = this;
    return function(event) {
      jquery(squareId).css('background-color', '#ff0000');
    }
  },
  stopHover: function(squareId) {
    var that = this;
    return function(event) {
      jquery(squareId).css('background-color', that.state.unselectedColor);
    }
  },
  selectSquare: function(squareId) {
    var that = this;
    return function(event) {
      jquery(squareId).css('background-color', that.state.userColor);
    }
  },
  render: function() {
    if (this.state.config === null) {
      return <div></div>;
    }
    var squares = [];
    for (var i = 0; i < this.state.config.boardSize; i++) {
      for (var j = 0; j < this.state.config.boardSize; j++) {
        squares.push(<GridTile key={i.toString() + j.toString()}
          id={'square' + i + j}
          onMouseEnter={this.startHover('#square' + i + j)}
          onMouseOut={this.stopHover('#square' + i + j)}
          onTouchTap={this.selectSquare('#square' + i + j)}
          disabled={true}
          style={{
            backgroundColor: this.state.unselectedColor,
            width: '100px',
            border: '1px solid #eeeeee',
            margin: 1
          }}>{squares.length}</GridTile>
        )
      }
    }
    return (
      <div>
        <GridList cellHeight={100} cols={this.state.config.boardSize}
          rows={this.state.config.boardSize}
          padding={1}
          style={this.styles.gridListStyle}>
          {squares}
        </GridList>
      </div>
    )
  }
});

export default Board;
