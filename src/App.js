import Input from './Input.js';
import { RacingGame } from './Game.js';
import { carNameValidators, roundCountValidators } from './validators/Game.js';
import { MESSAGES } from './constants/Messages.js';
import { RACING_GAME } from './constants/Game.js';

class App {
  async run() {
    const carNames = await new Input(
      MESSAGES.CAR_NAME_INPUT_MESSAGE, carNameValidators, RACING_GAME.CAR_NAME_SEPARATOR
    ).run();
    const roundCount = await new Input(
      MESSAGES.ROUND_COUNT_INPUT_MESSAGE, roundCountValidators
    ).run();
    const game = new RacingGame(carNames, roundCount);
    game.play();
  }
}

export default App;
