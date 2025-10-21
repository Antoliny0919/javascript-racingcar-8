import { Random } from "@woowacourse/mission-utils";
import { Car, RacingGame } from "../src/App";

jest.mock('@woowacourse/mission-utils', () => ({
  Random: {
    pickNumberInRange: jest.fn(),
  },
}));

let cars;
let game;

beforeEach(() => {
  cars = [new Car('a'), new Car('b'), new Car('c')];
  game = new RacingGame(cars, 2);
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
  test('라운드마다 자동차 이동거리 테스트', () => {
    const randomValue = [4, 5, 2, 8, 3, 1];
    randomValue.forEach((value) => Random.pickNumberInRange.mockReturnValueOnce(value));

    game.round();

    const car1 = cars[0];
    const car2 = cars[1];
    const car3 = cars[2];

    expect(car1.forwardDistance).toBe(1);
    expect(car2.forwardDistance).toBe(1);
    expect(car3.forwardDistance).toBe(0);

    game.round();

    expect(car1.forwardDistance).toBe(2);
    expect(car2.forwardDistance).toBe(1);
    expect(car3.forwardDistance).toBe(0);
  });
});
