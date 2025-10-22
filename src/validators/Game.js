import Validator from './Validators.js';
import { ERROR_MESSAGES } from '../constants/Messages.js';
import { RACING_GAME } from '../constants/Game.js';

export const carNameValidators = [
  // 자동차 수 검증
  new Validator(
    (value) => value.length < RACING_GAME.MIN_CAR_LENGTH,
    ERROR_MESSAGES.INVALID_CAR_COUNT,
  ),
  // 공백 자동차 이름 검증
  new Validator(
    (value) => value.some((name) => name.trim() === ''),
    ERROR_MESSAGES.INVALID_BLANK_NAME,
  ),
  // 자동차 이름 자릿수 검증
  new Validator(
    (value) => value.some((name) => name.length > RACING_GAME.MAX_CAR_NAME_LENGTH),
    ERROR_MESSAGES.INVALID_CAR_NAME_LENGTH,
  ),
  // 중복 자동차 이름 검증
  new Validator(
    (value) => new Set(value).size !== value.length,
    ERROR_MESSAGES.INVALID_SAME_NAME,
  ),
];

export const roundCountValidators = [
  // 숫자 외 입력 검증
  new Validator(
    (value) => isNaN(value),
    ERROR_MESSAGES.INVALID_NOT_NUMBER,
  ),
  // 한계값 검증
  new Validator(
    (value) => Number(value) > RACING_GAME.LIMIT_ROUND_COUNT,
    ERROR_MESSAGES.INVALID_EXCEEDED_MAX_VALUE,
  ),
];
