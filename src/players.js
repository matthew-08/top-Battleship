// eslint-disable-next-line max-classes-per-file
import {
  gameboard, ShipFactory, playerOne, playerTwoComputer,
} from './index';
import { handleOutOfBounds, checkForValidMove } from './dom';

export class Player {
  constructor(name) {
    this.name = name;
    this.pGameboard = gameboard();
    this.playerTurn = true;
  }

  shoot() {
    if (this.playerTurn) {
      const choice = prompt('pick enemy slot to shoot');
    }
  }
}

function setupShips(ship, coordinate, horizontal, computer) {
  if (computer) {
    playerTwoComputer.pGameboard.placeShip(ship, coordinate, horizontal);
  } else playerOne.pGameboard.placeShip(ship, coordinate, horizontal);
  console.log(playerOne);
}

export const placeShipFunctions = {
  placeCarrier(coordinate, horizontal, computer) {
    const carrier = ShipFactory('carrier', 5);
    setupShips(carrier, coordinate, horizontal, computer);
  },
  placeBattleship(coordinate, horizontal, computer) {
    const battleship = ShipFactory('battleship', 4);
    setupShips(battleship, coordinate, horizontal, computer);
  },
  placeCruiser(coordinate, horizontal, computer) {
    const cruiser = ShipFactory('crusier', 3);
    setupShips(cruiser, coordinate, horizontal, computer);
  },
  placeSubmarine(coordinate, horizontal, computer) {
    const submarine = ShipFactory('submarine', 3);
    setupShips(submarine, coordinate, horizontal, computer);
  },
  placeDestroyer(coordinate, horizontal, computer) {
    const destroyer = ShipFactory('destroyer', 2);
    setupShips(destroyer, coordinate, horizontal, computer);
  },
};

function randomVerticalHorizontal() {
  return Math.random() < 0.5;
}

export function generateRandomBoard() {
  let n = 5;
  for (let i = 0; i <= 5; i++) {
    generateComputerSetup(n);
    n -= 1;
  }
}
function randomCordinate(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateComputerSetup(n) {
  const computer = true;
  if (n === 5) {
    placeShipFunctions.placeCarrier(randomCordinate(30, 35), false, computer);
  }
  if (n === 4) {
    placeShipFunctions.placeDestroyer(randomCordinate(7, 9), true, computer);
  }
  if (n === 3) {
    placeShipFunctions.placeSubmarine(randomCordinate(70, 73), false, computer);
  }
  if (n === 2) {
    placeShipFunctions.placeBattleship(randomCordinate(10, 15), false, computer);
  }
  if (n === 1) {
    placeShipFunctions.placeCruiser(randomCordinate(90, 94), false, computer);
  }
  console.log(playerTwoComputer.pGameboard);
}
