import lists from '../apis/lists';
import { SIGN_IN, SIGN_OUT, FETCH_LISTS } from './types';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const fetchLists = () => async dispatch => {
  const response = await lists.get('/lists');

  dispatch({
    type: FETCH_LISTS,
    payload: response.data
  });
};
