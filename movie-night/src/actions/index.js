import lists from '../apis/lists';
import history from '../history';
import { SIGN_IN, SIGN_OUT, FETCH_LISTS, CREATE_LIST, FETCH_LIST, EDIT_LIST, DELETE_LIST } from './types';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  history.push('/');
  
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

export const createList = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await lists.post('/lists', {...formValues, userId });

  dispatch({
    type: CREATE_LIST,
    payload: response.data
  });

  history.push('/');
}

export const fetchList = (id) => async dispatch => {
  const response = await lists.get(`/lists/${id}`, { id });

  dispatch({
    type: FETCH_LIST,
    payload: response.data
  })
}

export const editList = (id, formValues) => async dispatch => {
  const response = await lists.patch(`/lists/${id}`, { ...formValues, id });

  dispatch({
    type: EDIT_LIST,
    payload: response.data
  });

  history.push('/');
}

export const deleteList = (id) => async dispatch => {
  const response = await lists.delete(`/lists/${id}`, { id });

  dispatch({
    type: DELETE_LIST,
    payload: response.data
  });

  history.push('/')
}
