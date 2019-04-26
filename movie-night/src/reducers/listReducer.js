import { FETCH_LISTS, CREATE_LIST, FETCH_LIST } from '../actions/types';

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
    default:
      return state;
  }
};
