import { Console } from '@woowacourse/mission-utils';
import Validator from './validators/Validators.js';

/**
 * 사용자 입력을 받고 유효성 검사를 수행합니다.
 * 
 * @example
 * const input = new Input();
 * const name = await input.read('이름을 입력하세요: ', [Validator((value) => value.length > 4)]);
 */
class Input {

  /**
   * @param {string} message - 사용자에게 표시할 입력 메시지
   * @param {Validator[]} validators - 입력값을 검증할 Validator 객체 배열
   * @param {string|null} separator - 입력값을 분리할 구분자
   */
  async read(message, validators=[], separator=null) {
	let response = await Console.readLineAsync(message);
    if (separator) {
      response = response.split(separator);
    }
	this.#runValidators(response, validators);
	return response;
  }

  #runValidators(value, validators) {
	for (const validator of validators) {
	  validator.validate(value);
	}
  }
}

export default Input;
