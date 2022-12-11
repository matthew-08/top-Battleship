// eslint-disable-next-line max-classes-per-file
import {
  gameboard, ShipFactory, playerOne, playerTwoComputer,
} from './index';

export class Player {
  constructor(name) {
    this.name = name;
    this.pGameboard = gameboard();
    this.playerTurn = false;
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
    const destroyer = ShipFactory('submarine', 2);
    setupShips(destroyer, coordinate, horizontal, computer);
  },
};

function randomVerticalHorizontal() {
  return Math.random() < 0.5;
}

export function generateComputerSetup() {
  const computer = true;
  placeShipFunctions.placeCarrier(40, false, computer);
  placeShipFunctions.placeDestroyer(30, false, computer);
  placeShipFunctions.placeSubmarine(20, false, computer);
  placeShipFunctions.placeDestroyer(10, false, computer);
  placeShipFunctions.placeBattleship(90, false, computer);
  // initialize computer
  // script for randomizing vertical vs horizontal
  // script for randomizing number
  /* function randomCordinate(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  function carrier() {
    let potentialPosition
    vertical = randomVerticalHorizontal()
    if (vertical) {
       potentialPosition = randomCordinate(100, 41);
    } else potentialPosition = random
    if (playerTwoComputer.pGameboard.playerBoard[potentialPosition].hasShip)
  } */
}
