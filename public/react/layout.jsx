import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from 'material-ui/lib/icon-button';
import LayoutLess from './layout.less';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import {emitter} from './globalEmitter.jsx';
import Theme from './theme.jsx';
import AppBar from 'material-ui/lib/app-bar';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const Layout = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(Theme)};
  },

  styles: {
    logo: {
      minHeight: 45,
      height: 45,
      fontFamily: Theme.font.primary1Family
    },
    titleStyle: {
      lineHeight: '40px'
    }
  },

  render() {
    return <div className="page">
      <AppBar title="Board Game"
        className="app-bar"
        showMenuIconButton={false}
        style={this.styles.logo}
        titleStyle={this.styles.titleStyle} />
      <div className="main-container">{this.props.children}</div>
    </div>;
  }
});

export default Layout;
