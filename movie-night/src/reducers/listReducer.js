import { FETCH_LISTS, CREATE_LIST, FETCH_LIST, FETCH_USER_LISTS } from '../actions/types';

const INITIAL_STATE = {
  lists: []
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return { ...state, lists: action.payload };
    case CREATE_LIST:
      return {...state, [action.payload.id]: action.payload };
    case FETCH_LIST:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_USER_LISTS:
      return { ...state, [action.payload.userid]: action.payload.lists };
    default:
      return state;
  }
};
