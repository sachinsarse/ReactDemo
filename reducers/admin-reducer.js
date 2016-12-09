import initialState from './initial-state';
import * as types from '../actions/action-types';
import _ from 'lodash';

export default function AdminReducer(state = initialState, action) {
  var errors = [];
  switch (action.type) {

    case types.GET_ALBUMS:
      return Object.assign({}, state, {
         albumsData: Object.assign([], action.data)
      });

    default:
      return state;
  }
}