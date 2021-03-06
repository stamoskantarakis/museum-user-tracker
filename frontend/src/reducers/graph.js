import { SET_MESSAGE, CLEAR_MESSAGE, SET_GRAPH_DATA } from '../actions/types';

const initialState = {};

const graphReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_GRAPH_DATA:
      return { graphData: payload };
    case SET_MESSAGE:
      return { message: payload };
    case CLEAR_MESSAGE:
      return { message: '' };
    default:
      return state;
  }
};

export default graphReducer;
