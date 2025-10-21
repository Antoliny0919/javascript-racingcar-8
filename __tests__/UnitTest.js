import { Random, Console } from "@woowacourse/mission-utils";
import { Car, RacingGame } from "../src/App";

jest.mock('@woowacourse/mission-utils', () => ({
  Random: {
    pickNumberInRange: jest.fn(),
  },
  Console: {
    print: jest.fn(),
  },
}));

let cars;
let game;

beforeEach(() => {
  cars = [new Car('a'), new Car('b'), new Car('c')];
  game = new RacingGame(cars, 2);

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
