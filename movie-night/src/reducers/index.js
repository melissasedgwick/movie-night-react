import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import listReducer from './listReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  list: listReducer
});
