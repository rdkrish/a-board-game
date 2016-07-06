import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import Layout from './layout.jsx';

import Board from './board/board.jsx';
import Home from './home.jsx';

render ((
  <Layout>
    <Router history={browserHistory}>
      <Route path="/home" component={Home} />
      <Route path="/game" component={Board} />
    </Router>
  </Layout>
), document.getElementById('layout'));
