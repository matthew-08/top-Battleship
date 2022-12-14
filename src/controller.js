import { placeShipFunctions } from './players';
import { playerOne, playerTwoComputer } from './index';
import {
  hideOptions, generateEnemyBoard, playerTurnDom, updateEnemyboardDom,
  removePlayerboardEventListeners,
  updatePlayerboard,
  generateEndingDOM,
} from './dom';

function gameLoop() {
  if (playerOne.playerTurn) {
    playerTurnDom();
  }
}
export function checkForPlacementEnding(n) {
  if (n === 1) {
    hideOptions();
    generateEnemyBoard();
    gameLoop();
    removePlayerboardEventListeners();
  }
}
export function getPlayerShipPlacement(id, n, horizontal) {
  // eslint-disable-next-line default-case
  switch (n) {
    case 5: {
      placeShipFunctions.placeCarrier(id, horizontal);
      break;
    }
    case 4: {
      placeShipFunctions.placeBattleship(id, horizontal);
      break;
    }
    case 3: {
      placeShipFunctions.placeCruiser(id, horizontal);
      break;
    }
    case 2: {
      placeShipFunctions.placeSubmarine(id, horizontal);
      break;
    }
    case 1: {
      placeShipFunctions.placeDestroyer(id, horizontal);
      break;
    }
  }
  checkForPlacementEnding(n);
}

export const boardController = {
  storedShipCoordinates: [],
  hitEnemyBoard(coordinate) {
    const blockHit = playerTwoComputer.pGameboard.gameboardHit(coordinate);
    updateEnemyboardDom(blockHit);
    this.enemyShoot();
    this.checkForAllSunk();
  },
  enemyShoot() {
    const coordinate = Math.floor(Math.random() * 100);
    const blockhit = playerOne.pGameboard.gameboardHit(coordinate);
    updatePlayerboard(blockhit);
  },
  checkForAllSunk() {
    if (playerTwoComputer.pGameboard.allSunk()) {
      generateEndingDOM();
    }
    /* if (playerOne.pGameboard.allSunk()) {
    } */
  },
  enemyStoreShip(number, size) {
    let a = number;
    for (let i = 1; i <= size; i++) {
      this.storedShipCoordinates.push(a += 1);
    }
    for (let i = 1; i <= size; i++) {
      this.storedShipCoordinates.push(a -= 1);
    }
    for (let i = 1; i <= size; i++) {
      this.storedShipCoordinates.push(a += 10);
    }
    for (let i = 1; i <= size; i++) {
      this.storedShipCoordinates.push(a -= 10);
    }
  },
};
