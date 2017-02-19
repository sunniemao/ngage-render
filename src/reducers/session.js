import { SESSION, INVALIDROOM } from '../actions/session';

export function session(state = null, action) {
  switch (action.type) {
    case SESSION:
      return state = action.session;
    default:
      return state;
  }
}

export function invalidRoom(state = 'valid', action) {
  switch (action.type) {
    case INVALIDROOM:
      return state = action.invalid ? 'invalid' : 'valid';
    default:
      return state;
  }
}