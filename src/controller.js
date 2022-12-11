import { placeShipFunctions } from './players';
import { playerOne, playerTwoComputer } from './index';
import { hideOptions, generateEnemyBoard } from './dom';

function gameLoop() {
  if (playerOne.playerTurn) {

  }
}
export function checkForPlacementEnding(n) {
  if (n === 1) {
    hideOptions();
    generateEnemyBoard();
  }
  gameLoop();
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
