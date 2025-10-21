import { Random } from "@woowacourse/mission-utils";
import { RacingGame } from "../src/App";

jest.mock('@woowacourse/mission-utils', () => ({
  Random: {
    pickNumberInRange: jest.fn(),
  },
}));

describe('RacingGame', () => {
  test('앞으로 이동할 거리 반환값 테스트', () => {
    const game = new RacingGame();

    const expectResults = [[4, 1], [3, 0], [7, 1], [1, 0]];

    for (const [number, result] of expectResults) {
        Random.pickNumberInRange.mockReturnValueOnce(number);
        expect(game.getForwardDistance()).toBe(result);
    }
  });
});
