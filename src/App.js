import { Console } from '@woowacourse/mission-utils';
import { RacingGame } from './Game.js';
import { MESSAGES } from './Constants.js';

class App {

  async run() {
    const carNames = await Console.readLineAsync(MESSAGES.CAR_NAME_INPUT_MESSAGE);
    const roundCount = await Console.readLineAsync(MESSAGES.ROUND_COUNT_INPUT_MESSAGE);
    const game = new RacingGame(carNames, roundCount);
    game.play();
  }
}

export default App;
