import { Console, Random } from '@woowacourse/mission-utils';
import { MESSAGES } from './constants/Messages.js';
import { RACING_GAME } from './constants/Game.js';

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

  constructor(carNames, roundCount) {
    const cars = carNames.map((name) => new Car(name));
    this.cars = cars;
    this.roundCount = roundCount;
  }

  getForwardDistance() {
    let forwardDistance = 0;
    const random = Random.pickNumberInRange(RACING_GAME.RANDOM_MIN, RACING_GAME.RANDOM_MAX);
    if (random > RACING_GAME.FORWARD_THRESHOLD) {
      forwardDistance = RACING_GAME.FORWARD_DISTANCE;
    }
    return forwardDistance;
  }

  getWinners() {
    const winnerForwardDistance = Math.max(...this.cars.map((car) => car.forwardDistance));
    const winners = this.cars.filter(car => car.forwardDistance === winnerForwardDistance);
    return winners;
  }

  announceWinners(winners) {
    const winnerNames = winners.map((winner) => winner.name);
    Console.print(MESSAGES.WINNER_ANNOUNCE_MESSAGE(winnerNames));
  }

  round() {
    this.cars.forEach((car) => {
      car.forwardDistance += this.getForwardDistance();
      car.printCurrentForwardDistance();
    });
    Console.print('');
  }

  play() {
    Console.print(MESSAGES.EXECUTE_RESULT_MESSAGE);
    for (let i = 0; i < this.roundCount; i++) {
      this.round();
    }
    const winners = this.getWinners();
    this.announceWinners(winners);
  }
}
