class Validator {
	/**
	 * @param {function(*): boolean} condition - 유효하지 않은 조건을 판별하는 함수
	 * @param {string} message - 검사 실패시 에러 메시지
	 */
	constructor(condition, message) {
		this.condition = condition;
		this.message = message;
	}

	validate(value) {
		if (this.condition(value)) {
			throw new Error(`[ERROR] ${this.message}`);
		}
	}
}

export default Validator;
