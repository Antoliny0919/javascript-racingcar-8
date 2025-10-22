import { Console } from '@woowacourse/mission-utils';
import Validator from './Validators';

/**
 * 사용자 입력을 받고 유효성 검사를 수행합니다.
 * 
 * @example
 * const input = new Input('이름을 입력하세요: ', [Validator((value) => value.length > 4)]);
 * const name = await input.run();
 */
class Input {

  /**
   * @param {string} message - 사용자에게 표시할 입력 메시지
   * @param {Validator[]} validators - 입력값을 검증할 Validator 객체 배열
   * @param {string|null} separator - 입력값을 분리할 구분자
   */
	constructor(message, validators=[], separator=null) {
		this.message = message;
		this.validators = validators;
    this.separator = separator;
	}

	async run() {
		let response = await Console.readLineAsync(this.message);
    if (this.separator) {
      response = response.split(this.separator);
    }
		this.runValidators(response);
		return response;
	}

	runValidators(value) {
		for (const validator of this.validators) {
			validator.validate(value);
		}
	}
}

export default Input;
