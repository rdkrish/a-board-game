import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import Colors from 'material-ui/lib/styles/colors';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import jquery from 'jquery';
import RaisedButton from 'material-ui/lib/raised-button';
import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';

const restAPI = restful('', fetchBackend(fetch));

import Theme from '../theme.jsx';

var Board = React.createClass({
  styles: {
    card: {
      padding: 10,
      margin: 10
    },
    header: {
      fontSize: 24,
      paddingLeft: 10,
      fontFamily: Theme.font.primary1Family
    },
    button: {
      marginRight: 10
    },
    gridListStyle: {
      backgroundColor: Theme.palette.accent2Color,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 24,
      marginTop: 10,
      scrollY: 'auto',
    },
  },
  getInitialState: function() {
    return {
      unselectedColor: '#fff',
      config: null,
      userColor: null,
      userId: null,
      selectedSquares: {},
      disableBoard: false
    };
  },
  getRandomValue: function() {
    return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
  },
  componentWillMount: function() {
    var that = this;
    socket.on('square selected', function(selectedSquares) {
      that.setState({selectedSquares: selectedSquares, disableBoard: true});
      setTimeout(function() {
        that.setState({disableBoard: false});
      }, that.state.config.blockTime);
    });
    restAPI.all('config').get('').then((response) => {
      that.setState({config: response.body().data(), userColor:
        'rgb(' + this.getRandomValue() + ',' + this.getRandomValue() + ',' +
        this.getRandomValue() + ')', userId: this.getRandomValue()});
    });
  },
  startHover: function(squareId) {
    var that = this;
    return function(event) {
      var selectedSquares = that.state.selectedSquares;
      if (squareId in selectedSquares === false && that.state.disableBoard === false) {
        jquery('#' + squareId).css('background-color', that.state.userColor);
      }
    }
  },
  stopHover: function(squareId) {
    var that = this;
    return function(event) {
      var selectedSquares = that.state.selectedSquares;
      if (squareId in selectedSquares === false && that.state.disableBoard === false) {
        jquery('#' + squareId).css('background-color', that.state.unselectedColor);
      }
    }
  },
  selectSquare: function(squareId) {
    var that = this;
    return function(event) {
      var selectedSquares = that.state.selectedSquares;
      if (squareId in selectedSquares === true || that.state.disableBoard === true) {
        that.setState({selectedSquares: selectedSquares});
        return;
      }
      jquery('#' + squareId).css('background-color', that.state.userColor);
      selectedSquares[squareId] = {
        userId: that.state.userId,
        userColor: that.state.userColor,
      };
      that.setState({selectedSquares: selectedSquares});
      socket.emit('square selected', selectedSquares);
    }
  },
  getSquares: function() {
    var squares = [];
    for (var i = 0; i < this.state.config.boardSize; i++) {
      for (var j = 0; j < this.state.config.boardSize; j++) {
        var squareId = 'square' + i + j;
        squares.push(<GridTile key={i.toString() + j.toString()}
          id={squareId}
          onMouseEnter={this.startHover(squareId)}
          onMouseOut={this.stopHover(squareId)}
          onTouchTap={this.selectSquare(squareId)}
          style={{
            backgroundColor: this.state.selectedSquares[squareId] !== undefined?
              this.state.selectedSquares[squareId].userColor :
              this.state.unselectedColor,
            width: '100px',
            border: '1px solid #eeeeee',
            margin: 1
          }}>{squares.length}</GridTile>
        )
      }
    }
    return squares;
  },
  getScores: function() {
    var scores = {};
    for (var key in this.state.selectedSquares) {
      var square = this.state.selectedSquares[key];
      if (square.userId in scores) {
        scores[square.userId].count += 1;
      } else {
        scores[square.userId] = {userColor: square.userColor, count: 1};
      }
    }
    return scores;
  },
  render: function() {
    if (this.state.config === null) {
      return <div></div>;
    }
    var squares = this.getSquares();
    this.styles.gridListStyle.width = this.state.config.boardSize * 100;
    var scores = this.getScores();
    var scoresHTML = [];
    for (var score in scores) {
      scoresHTML.push(
        <RaisedButton disabled={true} style={this.styles.button}
          label={'user ' + score + ': ' + scores[score].count}
          disabledLabelColor={'#fff'}
          disabledBackgroundColor={scores[score].userColor} />
      )
    }
    return (
      <div>
        <GridList cellHeight={100} cols={this.state.config.boardSize}
          rows={this.state.config.boardSize}
          padding={1}
          style={this.styles.gridListStyle}>
          {squares}
        </GridList>
        <Card style={this.styles.card}>
          <CardText style={this.styles.header}>Scores</CardText>
          {scoresHTML}
        </Card>
      </div>
    )
  }
});

export default Board;
