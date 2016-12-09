import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import './styles.scss';
import rootReducer from './reducers';
import album from './components/album.view';
import albumAddEdit from './components/albumAddEdit.view';

function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

const store = configureStore()

var routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={album} />
      <Route path='/albumAddEdit/:id' component={albumAddEdit} />  
       <Route path='/albumAddEdit' component={albumAddEdit} />   
    </Router>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('root'))