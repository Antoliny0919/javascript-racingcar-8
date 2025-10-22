import { Console } from "@woowacourse/mission-utils";
import { Car, RacingGame } from "./Game";

import { ERROR_MESSAGES, MESSAGES } from "./Constants";

class App {

  validateCarName(carNameList) {
    if (carNameList.length < 2) {
      throw new Error(ERROR_MESSAGES.INVALID_CAR_COUNT);
    }
    if (carNameList.some(name => name.trim() === '')) {
      throw new Error(ERROR_MESSAGES.INVALID_BLANK_NAME);
    }
    if (carNameList.some(name => name.length > 5)) {
      throw new Error(ERROR_MESSAGES.INVALID_CAR_NAME_LENGTH);
    }
    if (new Set(carNameList).size !== carNameList.length) {
      throw new Error(ERROR_MESSAGES.INVALID_SAME_NAME);
    }
  }

  validateTryCount(count) {
    if (isNaN(count)) {
      throw new Error(ERROR_MESSAGES.INVALID_NOT_NUMBER);
    }
    if (Number(count) > 100) {
      throw new Error(ERROR_MESSAGES.INVALID_EXCEEDED_MAX_VALUE);
    }
  }

  async run() {
    const carNames = await Console.readLineAsync(MESSAGES.CAR_NAME_INPUT_MESSAGE);
    const carNameList = carNames.split(',');
    const cars = carNameList.map(name => new Car(name));
    this.validateCarName(carNameList)
    const tryCount = await Console.readLineAsync(MESSAGES.ROUND_COUNT_INPUT_MESSAGE);
    this.validateTryCount(tryCount);
    const game = new RacingGame(cars, tryCount);
    game.play();
  }
}

export default App;
