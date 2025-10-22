import { Console, Random } from "@woowacourse/mission-utils";

import { ERROR_MESSAGES, MESSAGES } from "./Constants";

export class Car {
  constructor(name) {
    this.name = name;
    this.forwardDistance = 0;
  }

  printCurrentForwardDistance() {
    Console.print(`${this.name} : ${'-'.repeat(this.forwardDistance)}`);
  }
}

export class RacingGame {

  constructor(cars, tryCount) {
    this.cars = cars;
    this.tryCount = tryCount;
  }

  getForwardDistance() {
    let forwardDistance = 0;
    const random = Random.pickNumberInRange(0, 9);
    if (random > 3) {
      forwardDistance = 1;
    }
    return forwardDistance;
  }

  getWinners() {
    const winnerForwardDistance = Math.max(...this.cars.map(car => car.forwardDistance));
    const winners = this.cars.filter(car => car.forwardDistance === winnerForwardDistance);
    return winners;
  }

  announceWinners(winners) {
    const winnerNames = winners.map(winner => winner.name);
    Console.print(MESSAGES.WINNER_ANNOUNCE_MESSAGE(winnerNames));
  }

  round() {
    this.cars.forEach(car => {
      car.forwardDistance += this.getForwardDistance();
      car.printCurrentForwardDistance();
    });
    Console.print('');
  }

  play() {
    Console.print(MESSAGES.EXECUTE_RESULT_MESSAGE);
    for (let i = 0; i < this.tryCount; i++) {
      this.round();
    }
    const winners = this.getWinners();
    this.announceWinners(winners);
  }
}

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
