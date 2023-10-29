import { Console, Random } from "@woowacourse/mission-utils";
import { ERROR_MSG, GAME_MSG } from "./message";

const CAR_NAME = [];
const CAR_NAME_LENGTH = [];

// 게임 시작
export const startGame = async () => {
  const carNames = await getCarsName();
  const tryTimes = await getTryTimes();
  printExecutionResult(carNames, tryTimes);
  printFinalWinner(carNames);
  endGame();
};

// 자동차 이름 입력
const getCarsName = async () => {
  const cars = await Console.readLineAsync(GAME_MSG.GET_CARS_NAME);
  Console.print(`${GAME_MSG.GET_CARS_NAME}\n${cars}`);
  const carNames = cars.split(",");
  for (let i = 0; i < carNames.length; i++) {
    if (carNames[i].length > 5) {
      throw new Error(ERROR_MSG.CAR_NAME_OVER_LENGTH);
    }
  }
  for (let i = 0; i < carNames.length; i++) {
    CAR_NAME.push(carNames[i]);
    CAR_NAME_LENGTH[i] = carNames[i].length;
    carNames[i] = carNames[i] + " : ";
  }
  return carNames;
};

// 시도 횟수 입력
const getTryTimes = async () => {
  try {
    const tryTimes = await Console.readLineAsync(GAME_MSG.GET_TRY_TIMES);
    Console.print(`${GAME_MSG.GET_TRY_TIMES}\n${tryTimes}`);
    if (isNaN(tryTimes)) {
      throw new Error(ERROR_MSG.TRY_TIMES_NUMBER);
    }
    return tryTimes;
  } catch (error) {
    return error;
  }
};

// 실행 결과 출력
const printExecutionResult = (carNames, tryTimes) => {
  Console.print(`${GAME_MSG.EXECUTION_RESULT}`);
  while (tryTimes > 0) {
    getExecution(carNames);
    Console.print(`${carNames.join("\n")}\n`);
    tryTimes--;
  }
};
// 전진-정지에 대한 결과 추가
const getExecution = (carNames) => {
  for (let i = 0; i < carNames.length; i++) {
    if (getRandomNumber()) {
      carNames[i] = carNames[i] + "-";
    }
  }
};
// 전진-정지를 위한 랜덤 숫자 받기
const getRandomNumber = () => {
  const randomNumber = Random.pickNumberInRange(1, 9);
  if (randomNumber > 3) {
    return true;
  }
  return false;
};

const printFinalWinner = (carNames) => {
  const resultLength = [];
  carNames.forEach((car, idx) => {
    resultLength.push(car.length - CAR_NAME_LENGTH[idx]);
  });

  let max = 0;
  const maxCars = [];
  resultLength.forEach((len) => {
    max < len ? (max = len) : "";
  });
  resultLength.forEach((len, idx) => {
    max == len ? maxCars.push(CAR_NAME[idx]) : "";
  });

  let gameResult = maxCars.join(", ");
  Console.print(`${GAME_MSG.GAME_WINNER}${gameResult}`);
};

const endGame = () => {
  return;
};
