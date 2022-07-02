import {combineReducers} from 'redux';

//Import All Reducers
import {authReducer} from './auth';
import {appReducer} from './app';

export default combineReducers({
  auth: authReducer,
  app: appReducer,
});
