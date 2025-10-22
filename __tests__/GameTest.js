import { Random, Console } from '@woowacourse/mission-utils';
import { RacingGame } from '../src/Game.js';

jest.mock('@woowacourse/mission-utils', () => ({
  Random: {
    pickNumberInRange: jest.fn(),
  },
  Console: {
    print: jest.fn(),
  },
}));

let game;
let cars;

beforeEach(() => {
  const carNames = ['a', 'b', 'c'];
  game = new RacingGame(carNames, '2');
  cars = game.cars;

  Console.print.mockClear();
});

describe('RacingGame', () => {

  test('앞으로 이동할 거리 반환값 테스트', () => {
    const expectResults = [[4, 1], [3, 0], [7, 1], [1, 0]];

    for (const [number, result] of expectResults) {
      Random.pickNumberInRange.mockReturnValueOnce(number);
      expect(game.getForwardDistance()).toBe(result);
    }
  });

  test('우승자 필터 테스트', () => {
    cars[0].forwardDistance = 10;
    let winners = [];

    winners = game.getWinners();
    expect(winners.length).toBe(1);
    expect(winners[0]).toEqual({name: 'a', forwardDistance: 10});

    cars[2].forwardDistance = 10;
    winners = game.getWinners();
    expect(winners.length).toBe(2);
    expect(winners[0]).toEqual({name: 'a', forwardDistance: 10});
    expect(winners[1]).toEqual({name: 'c', forwardDistance: 10});
  });

  test('우승자 출력 테스트', () => {
    let winners;

    winners = [game.cars[1]];
    game.announceWinners(winners);

    expect(Console.print).toHaveBeenCalled();
    expect(Console.print).toHaveBeenCalledWith('최종 우승자 : b');

    winners = [...game.cars];
    game.announceWinners(winners);

    expect(Console.print).toHaveBeenCalledWith('최종 우승자 : a, b, c');
  });
});

describe('Car', () => {
  test('라운드마다 자동차 이동거리 출력 테스트', () => {
    const randomValue = [4, 5, 2, 8, 3, 1];
    randomValue.forEach((value) => Random.pickNumberInRange.mockReturnValueOnce(value));

    game.round();

    expect(Console.print).toHaveBeenCalled();
    expect(Console.print).toHaveBeenCalledWith('a : -');
    expect(Console.print).toHaveBeenCalledWith('b : -');
    expect(Console.print).toHaveBeenCalledWith('c : ');

    game.round();

    expect(Console.print).toHaveBeenCalledWith('a : --');
    expect(Console.print).toHaveBeenCalledWith('b : -');
    expect(Console.print).toHaveBeenCalledWith('c : ');
  });
});
