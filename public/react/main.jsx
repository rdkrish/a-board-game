import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import Layout from './layout.jsx';

import Board from './board/board.jsx';
import Home from './home.jsx';
import User from './user/user.jsx';

render ((
  <Layout>
    <Router history={browserHistory}>
      <Route path="/home" component={Home} />
      <Route path="/user" component={User} />
      <Route path="/user/:gameId" component={User} />
      <Route path="/game/:userName" component={Board} />
      <Route path="/game/:userName/:gameId" component={Board} />
    </Router>
  </Layout>
), document.getElementById('layout'));
