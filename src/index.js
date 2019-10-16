import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import ComingSoon from './components/ComingSoon';


ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history} basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" component={ComingSoon} />
      </Switch>
    </ConnectedRouter>
  </Provider>

), document.getElementById('root'));
