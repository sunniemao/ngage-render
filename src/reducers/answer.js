import { SETANSWERS, SUBMITANSWER, SHOWANSWER } from '../actions/answer';

export function setAnswers(state = null, action) {
  switch (action.type) {
    case SETANSWERS:
      return state = action.answers;
    default:
      return state;
  }
}

export function submitAnswer(state = null, action) {
  switch (action.type) {
    case SUBMITANSWER:
      return state = action.answer;
    default:
      return state;
  }
}

export function showAnswer(state = null, action) {
  switch (action.type) {
    case SHOWANSWER:
      return state = action.answer;
    default:
      return state;
  }
}
