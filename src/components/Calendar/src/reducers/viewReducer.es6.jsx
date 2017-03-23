import {
  DAY_VIEW,
  WEEK_VIEW,
  MONTH_VIEW
} from '../actions/viewActions';

const INITIAL_STATE = {
  type: "month"
};

export default function viewReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case DAY_VIEW:
      return Object.assign({}, state, { type: 'day' });
    case WEEK_VIEW:
      return Object.assign({}, state, { type: 'week' });
    case MONTH_VIEW:
      return Object.assign({}, state, { type: 'month' });
    default:
      return state;
  }
}