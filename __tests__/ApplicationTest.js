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

describe('다양한 성공 케이스 테스트', () => {

  // 정수로된 값을 mock(`pickNumberInRange`)에 전달할 패턴으로 변환합니다.
  // e.g. [1, 2] -> [MOVING_FORWARD, MOVING_FORWARD, STOP, MOVING_FORWARD]
  const makeForwardDistancePattern = (roundCount, distances) => {
    const MOVING_FORWARD = 4;
    const STOP = 3;
    let patterns = [];

    for (let i = 0; i < roundCount; i++) {
      distances.forEach((distance) => {
        let forward = STOP;
        if (distance > i) {
          forward = MOVING_FORWARD;
        }
        patterns.push(forward);
      });
    }

    return patterns;
  }

  test.each(
    [
      {
        name: '많은 라운드 테스트',
        inputs: ['bee,honey', '10'],
        distances: [10, 3],
        logs: ['bee : ----------', 'honey : ---'],
        winners: 'bee',
      },
      {
        name: '많은 자동차 테스트',
        inputs: ['aa,bb,cc,dd,ee,ff,gg', '2'],
        distances: [2, 1, 0, 2, 1, 0, 2],
        logs: ['aa : --', 'bb : -', 'cc : ', 'dd : --', 'ee : -', 'ff : ', 'gg : --'],
        winners: 'aa, dd, gg',
      },
      {
        name: '모두 최고점 테스트',
        inputs: ['kim,lee,jung', '3'],
        distances: [3, 3, 3],
        logs: ['kim : ---', 'lee : ---', 'jung : ---'],
        winners: 'kim, lee, jung',
      },
      {
        name: '모두 최저점 테스트',
        inputs: ['**,[[]],()()', '2'],
        distances: [0, 0, 0],
        logs: ['** : ', '[[]] : ', '()() : '],
        winners: '**, [[]], ()()',
      },
    ]
  )('$name', async ({ inputs, distances, logs, winners }) => {
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    const roundCount = Number(inputs[1]);
    const forwardDistancePatterns = makeForwardDistancePattern(roundCount, distances);
    mockRandoms(forwardDistancePatterns);

    const app = new App();
    await app.run();

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(`최종 우승자 : ${winners}`));
  })
});

describe('자동차 이름 입력 예외 테스트', () => {
  test.each(['solo', ''])('한 대 이하 자동차 입력 예외', async (input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 경주를 하기 위해서는 최소한 자동차가 두 대 이상이어야 합니다.');
  });

  test.each(
    [
      'aa, ,cc',
      ' ,z,b',
      'to,ma, ',
    ]
  )('공백 자동차 이름 입력 예외', async (input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 공백은 자동차 이름으로 사용할 수 없습니다.');
  });

  test.each(
    [
      'bmw,benz,ferrari',
      'banana,strawberry,watermelon',
      'lee,siiiiiiii,hyun',
    ]
  )('5자 초과하는 자동차 이름 입력 예외', async (input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 자동차 이름은 5자 이하여야 합니다.');
  });

  test.each(
    [
      'kim,lee,lee',
      '***,[[[,***',
      'bread,bread,bread',
    ]
  )('동일한 자동차 이름 입력 예외', async (input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 동일한 이름은 사용할 수 없습니다.');
  });
});

describe('시도 횟수 입력 예외 테스트', () => {
  test.each(
    [
      '다섯',
      '나무',
      '****',
      'z[][][]z',
    ]
  )('숫자가 아닌 시도 횟수 입력 예외', async (input) => {
    mockQuestions(['aa,bb', input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 숫자만 입력해 주세요.');
  });

  test.each(['300', '100000000000', '101'])('최대 이동횟수를 초과하는 입력 예외', async (input) => {
    mockQuestions(['aa,bb', input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 최대 이동횟수는 100회 입니다.');
  });
});
