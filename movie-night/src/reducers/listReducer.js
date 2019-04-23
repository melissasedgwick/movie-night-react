import { FETCH_LISTS } from '../actions/types';

const INITIAL_STATE = {
  lists: []
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return { ...state, lists: action.payload };
    default:
      return state;
  }
};
