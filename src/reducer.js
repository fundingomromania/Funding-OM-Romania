import campaign from './reducers/campaign';
import campaignList from './reducers/campaignList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  campaign,
  campaignList,
  auth,
  common,
  editor,
  home,
  profile,
  settings,
  router: routerReducer
});
