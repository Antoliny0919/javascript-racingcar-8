import { Console } from '@woowacourse/mission-utils';
import Input from '../src/Input';
import Validator from '../src/validators/Validators';

jest.mock('@woowacourse/mission-utils', () => ({
  Console: {
    readLineAsync: jest.fn(),
  },
}));

describe('InputTests', () => {
  const lengthValidator = new Validator(
    (value) => value.length < 5, '이름은 5자 이상이어야 합니다.'
  );
  const NotAllowColonValidator = new Validator(
    (value) => value.includes(':'), '이름에 세미콜론은 사용할 수 없습니다.'
  );
  let inputMessage = '이름을 입력해 주세요: ';
  const input = new Input();

  test('유효한 입력 테스트', async () => {
    Console.readLineAsync.mockResolvedValueOnce('Antoliny');
    const response = await input.read(inputMessage, [lengthValidator]);

    expect(Console.readLineAsync).toHaveBeenCalled();
    expect(Console.readLineAsync).toHaveBeenCalledWith(inputMessage);
    expect(response).toBe('Antoliny');
  });

  test('유효하지 않은 입력 테스트', async () => {
    Console.readLineAsync.mockResolvedValueOnce('Lee');

    await expect(
      input.read(inputMessage, [lengthValidator])
    ).rejects.toThrow('[ERROR] 이름은 5자 이상이어야 합니다.');
  });

  test('여러개의 검증기를 사용할때 유효하지 않은 입력 테스트', async () => {
    Console.readLineAsync.mockResolvedValueOnce(':Antoliny:');

    await expect(
      input.read(inputMessage, [lengthValidator, NotAllowColonValidator])
    ).rejects.toThrow('[ERROR] 이름에 세미콜론은 사용할 수 없습니다.');
  });

  test('구분자를 사용한 입력 테스트', async () => {
    inputMessage = '이름을 입력해 주세요.(:을 기준으로 여러 이름을 입력할 수 있습니다)';
    const nameLengthValidator = new Validator(
      (value) => value.some((name) => name.length < 5), '이름은 5자 이상이어야 합니다.'
    );
    const separator = ':';

    Console.readLineAsync.mockResolvedValueOnce('Sarahboyce:Antoliny:Cliff:TomCarrick');
    const response = await input.read(inputMessage, [nameLengthValidator], separator);

    await expect(response).toEqual(['Sarahboyce', 'Antoliny', 'Cliff', 'TomCarrick']);
  });
});
