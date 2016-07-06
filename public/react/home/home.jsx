import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';

import {browserHistory} from 'react-router';

import Theme from '../theme.jsx';

var Home = React.createClass({
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
    actionButton: {
      margin: 10
    }
  },
  startGame: function() {
    browserHistory.push('/user')
  },
  joinGame: function() {
    console.log('Join a game');
  },
  render: function() {
    return (
      <Card style={this.styles.card}>
        <CardText style={this.styles.header}>Welcome To Board Game!</CardText>
        <RaisedButton label="Start a new game" primary={true}
          style={this.styles.actionButton}
          onTouchTap={this.startGame} />
        <RaisedButton label="Join a game" primary={true}
          style={this.styles.actionButton}
          onTouchTap={this.joinGame} />
      </Card>
    )
  }
});

export default Home;
