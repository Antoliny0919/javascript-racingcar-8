import { Console, Random } from "@woowacourse/mission-utils";
import { MESSAGES } from "./Constants";


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
