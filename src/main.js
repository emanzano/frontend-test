import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from './configureStore';
require('fetch-everywhere');

// Views Components
import SearchView from './components/search/SearchViewContainer.jsx';
import DetailsView from './components/details/DetailsViewContainer.jsx';

// Styles import
import './public/styles/main.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Search} />
      <Route path="/items(?search=:query)" component={Search}>
        <Route path=":id" component={Details} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
