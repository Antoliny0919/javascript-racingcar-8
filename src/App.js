import { Console } from "@woowacourse/mission-utils";

class App {

  validateCarName(carNameList) {
    if (carNameList.length === 0) {
      throw new Error('[ERROR] 자동차 이름을 입력하지 않았습니다.')
    }
    if (carNameList.some(name => name.trim() === '')) {
      throw new Error('[ERROR] 공백은 자동차 이름으로 사용할 수 없습니다.')
    }
    if (carNameList.some(name => name.length > 5)) {
      throw new Error('[ERROR] 자동차 이름은 5자 이하여야 합니다.')
    }
    if (new Set(carNameList).length !== carNameList.length) {
      throw new Error('[ERROR] 동일한 이름은 사용할 수 없습니다.')
    }
  }

  async run() {
    const carNames = await Console.readLineAsync('경주할 자동차 이름(이름은 쉼표(,) 기준으로 구분');
    const carNameList = carNames.split(',');
    this.validateCarName(carNameList)
  }
}

export default App;
