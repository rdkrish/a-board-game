import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';
import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';
import {browserHistory} from 'react-router';

const restAPI = restful('', fetchBackend(fetch));

import Theme from '../theme.jsx';

var Games = React.createClass({
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
    }
  },
  getInitialState: function() {
    return {
      games: {}
    };
  },
  componentWillMount: function() {
    var that = this;
    restAPI.all('games').get('').then((response) => {
      that.setState({games: response.body().data()});
    });
  },
  joinGame: function(gameId) {
    var that = this;
    return function(event) {
      browserHistory.push('/user/' + gameId);
    }
  },
  render: function() {
    var gamesHTML = [];
    for (var game in this.state.games) {
      gamesHTML.push(
        <RaisedButton primary={true} style={this.styles.button}
          label={'Game ' + game}
          onTouchTap={this.joinGame(game)} />
      )
    }
    return (
      <Card style={this.styles.card}>
        <CardText style={this.styles.header}>Select a Game</CardText>
        {gamesHTML}
      </Card>
    )
  }
});

export default Games;
