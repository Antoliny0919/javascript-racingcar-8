import { Console, Random } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES, MESSAGES } from "./Constants.js";

const CAR_NAME_SEPARATOR = ',';
const RANDOM_MIN = 0;
const RANDOM_MAX = 9;
const FORWARD_THRESHOLD = 3;
const FORWARD_DISTANCE = 1;

const MIN_CAR_LENGTH = 2;
const MAX_CAR_NAME_LENGTH = 5;
const LIMIT_ROUND_COUNT = 100;

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
    const carNameList = carNames.split(CAR_NAME_SEPARATOR);
    this.validateCarName(carNameList);
    this.validateTryCount(tryCount);
    const cars = carNameList.map(name => new Car(name));
    this.cars = cars;
    this.tryCount = tryCount;
  }

  validateCarName(carNameList) {
    if (carNameList.length < MIN_CAR_LENGTH) {
      throw new Error(ERROR_MESSAGES.INVALID_CAR_COUNT);
    }
    if (carNameList.some(name => name.trim() === '')) {
      throw new Error(ERROR_MESSAGES.INVALID_BLANK_NAME);
    }
    if (carNameList.some(name => name.length > MAX_CAR_NAME_LENGTH)) {
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
    if (Number(count) > LIMIT_ROUND_COUNT) {
    throw new Error(ERROR_MESSAGES.INVALID_EXCEEDED_MAX_VALUE);
    }
  }

  getForwardDistance() {
    let forwardDistance = 0;
    const random = Random.pickNumberInRange(RANDOM_MIN, RANDOM_MAX);
    if (random > FORWARD_THRESHOLD) {
      forwardDistance = FORWARD_DISTANCE;
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
