import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={SearchView} />
      <Route path="/items" component={SearchView}>
        <Route path=":id" component={DetailsView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
