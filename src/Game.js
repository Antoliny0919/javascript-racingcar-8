import { Console, Random } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES, MESSAGES } from "./Constants.js";

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

  constructor(carNames, tryCount) {
    const carNameList = carNames.split(',');
    this.validateCarName(carNameList);
    this.validateTryCount(tryCount);
    const cars = carNameList.map(name => new Car(name));
    this.cars = cars;
    this.tryCount = tryCount;
  }

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
