import Input from './Input.js';
import { RacingGame } from './Game.js';
import { carNameValidators, roundCountValidators } from './validators/Game.js';
import { MESSAGES } from './constants/Messages.js';
import { RACING_GAME } from './constants/Game.js';

class App {
  constructor() {
    this.inputHandler = new Input();
  }

  async run() {
    const carNames = await this.inputHandler.read(
      MESSAGES.CAR_NAME_INPUT_MESSAGE,
      carNameValidators,
      RACING_GAME.CAR_NAME_SEPARATOR,
    )
    const roundCount = await this.inputHandler.read(
      MESSAGES.ROUND_COUNT_INPUT_MESSAGE,
      roundCountValidators,
    )
    const game = new RacingGame(carNames, roundCount);
    game.play();
  }
}

export default App;
