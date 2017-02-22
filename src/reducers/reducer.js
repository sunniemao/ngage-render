import { combineReducers } from 'redux';
import type from './type';
import user from './user';
import question from './question';
import {answer, submitAnswer} from './answer';
import {questions} from './questions';
import {response} from './response';
import {session, invalidRoom, presentation, pressession} from './session';

export default combineReducers({
  user,
  type,
  question,
  questions,
  answer,
  submitAnswer,
  session,
  invalidRoom,
  pressession,
  presentation,
  response
});