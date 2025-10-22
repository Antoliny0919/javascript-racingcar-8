export const ERROR_MESSAGES = Object.freeze({
    INVALID_CAR_COUNT: '[ERROR] 경주를 하기 위해서는 최소한 자동차가 두 대 이상이어야 합니다.',
    INVALID_BLANK_NAME: '[ERROR] 공백은 자동차 이름으로 사용할 수 없습니다.',
    INVALID_CAR_NAME_LENGTH: '[ERROR] 자동차 이름은 5자 이하여야 합니다.',
    INVALID_SAME_NAME: '[ERROR] 동일한 이름은 사용할 수 없습니다.',
    INVALID_NOT_NUMBER: '[ERROR] 숫자만 입력해 주세요.',
    INVALID_EXCEEDED_MAX_VALUE: '[ERROR] 최대 이동횟수는 100회 입니다.',
});

export const MESSAGES = Object.freeze({
    CAR_NAME_INPUT_MESSAGE: '경주할 자동차 이름(이름은 쉼표(,) 기준으로 구분\n',
    ROUND_COUNT_INPUT_MESSAGE: '시도할 횟수\n',
    EXECUTE_RESULT_MESSAGE: '\n실행 결과',
    WINNER_ANNOUNCE_MESSAGE: (winnersName) => `최종 우승자 : ${winnersName.join(', ')}`,
});
