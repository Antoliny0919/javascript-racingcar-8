import { Console, Random } from "@woowacourse/mission-utils";

export class Car {
  constructor(name) {
    this.name = name;
    this.forwardDistance = 0;
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

  round() {
    this.cars.forEach(car => {
      car.forwardDistance += this.getForwardDistance();
    });
  }

  play() {
    for (let i = 0; i < this.tryCount; i++) {
      this.round();
    }
  }
}

class App {

  validateCarName(carNameList) {
    if (carNameList.length < 2) {
      throw new Error('[ERROR] 경주를 하기 위해서는 최소한 자동차가 두 대 이상이어야 합니다.')
    }
    if (carNameList.some(name => name.trim() === '')) {
      throw new Error('[ERROR] 공백은 자동차 이름으로 사용할 수 없습니다.')
    }
    if (carNameList.some(name => name.length > 5)) {
      throw new Error('[ERROR] 자동차 이름은 5자 이하여야 합니다.')
    }
    if (new Set(carNameList).size !== carNameList.length) {
      throw new Error('[ERROR] 동일한 이름은 사용할 수 없습니다.')
    }
  }

  validateTryCount(count) {
    if (isNaN(count)) {
      throw new Error('[ERROR] 숫자만 입력해 주세요.');
    }
    if (Number(count) > 100) {
      throw new Error('[ERROR] 최대 이동횟수는 100회 입니다.');
    }
  }

  async run() {
    const carNames = await Console.readLineAsync('경주할 자동차 이름(이름은 쉼표(,) 기준으로 구분');
    const carNameList = carNames.split(',');
    const cars = carNameList.map(name => new Car(name));
    this.validateCarName(carNameList)
    const tryCount = await Console.readLineAsync('시도할 횟수');
    this.validateTryCount(tryCount);
    const game = new RacingGame(cars, tryCount);
    game.play();
  }
}

export default App;
