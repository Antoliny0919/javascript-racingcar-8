import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('자동차 경주', () => {
  test('기능 테스트', async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ['pobi,woni', '1'];
    const logs = ['pobi : -', 'woni : ', '최종 우승자 : pobi'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('예외 테스트', async () => {
    // given
    const inputs = ['pobi,javaji'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});

describe('입력 예외 테스트', () => {
  test.each(
    [
      ['aa, ,cc', '공백은 자동차 이름으로 사용할 수 없습니다.'],
      ['seoul,,gwangju', '빈 자동차 이름은 사용할 수 없습니다.'],
      ['bmw,benz,ferrari', '자동차 이름은 5자 이하여야 합니다.'],
      ['kim,lee,lee', '동일한 이름은 사용할 수 없습니다.'],
    ]
  )('자동차 이름 입력 예외', async (input, message) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow(`[ERROR] ${message}`);
  });

  test.each(
    [
      ['다섯', '숫자만 입력해 주세요.'],
      ['300', '최대 이동횟수는 100회 입니다.'],
    ]
  )('이동횟수 입력 예외', async (input, message) => {
    mockQuestions(['aa,bb' ,input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow(`[ERROR] ${message}`);
  });
});
