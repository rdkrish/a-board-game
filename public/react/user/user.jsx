import React from 'react';
import Card from 'material-ui/lib/card/card';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';

const restAPI = restful('', fetchBackend(fetch));

import {browserHistory} from 'react-router';

var User = React.createClass({
  styles: {
    card: {
      padding: 10,
      margin: 10
    }
  },
  getInitialState: function() {
    return {
      user: {}
    };
  },
  onChange: function(key) {
    var that = this;
    return function(event) {
      var user = that.state.user;
      user[key] = event.target.value;
      that.setState({user: user});
    }
  },
  submit: function() {
    var that = this;
    if (this.state.user.name === undefined || this.state.user.name === '') {
      return;
    }
    var url = '/game/' + this.state.user.name;
    if (this.props.params.gameId !== undefined) {
      url += '/' + this.props.params.gameId;
      restAPI.one('games', '').put({gameId: this.props.params.gameId, user:
        {userName: this.state.user.name}}).then((response) => {
        socket.emit('players joined', that.props.params.gameId);
      });
    }
    browserHistory.push(url);
  },
  render: function() {
    return (
      <Card style={this.styles.card}>
        <TextField
          defaultValue={this.state.user.name}
          value={this.state.user.name}
          floatingLabelText="Enter your name"
          onChange={this.onChange('name')} />
        <RaisedButton label="Submit" primary={true}
          onTouchTap={this.submit} />
      </Card>
    )
  }
});

export default User;
