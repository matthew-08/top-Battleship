/* eslint-disable radix */
import { getPlayerShipPlacement } from './controller';
import { playerOne, playerTwoComputer } from './index';
import { boardController } from './controller';

export function generateInitialGameboard() {
  const gameboard = document.querySelector('.gameboard-left');
  console.log(gameboard);
  for (let i = 0; i < 100; i++) {
    const boardpiece = document.createElement('div');
    boardpiece.classList.add('board-piece');
    boardpiece.dataset.id = i;
    gameboard.appendChild(boardpiece);
  }
  addDivClickEventListener();
}

export function handleOutOfBounds(n, vertical) {
  const divs = document.querySelectorAll('.board-piece');
  let okayMove = false;
  divs.forEach((div) => {
    if (div.classList.contains('out-of-bounds')) {
      div.classList.remove('out-of-bounds');
    }
    if (div.classList.contains('has-ship')) {
      div.classList.add('out-of-bounds');
    }
    const string = div.dataset.id;
    if (vertical) {
      // eslint-disable-next-line default-case
      switch (n) {
        case 5: if (parseInt(string) >= 60) {
          div.classList.add('out-of-bounds');
        }
          break;
        case 4: if ((parseInt(string)) >= 70) {
          div.classList.add('out-of-bounds');
        }
          break;
        case 3: if ((parseInt(string)) >= 80) {
          div.classList.add('out-of-bounds');
        }
          break;

        case 2: if ((parseInt(string)) >= 90) {
          div.classList.add('out-of-bounds');
        }
          break;
        default:
          okayMove = true;
      }
    } else {
    // eslint-disable-next-line default-case
      switch (n) {
        case 5: if (string.charAt(1) !== '' && parseInt(string.charAt(1)) >= 6) {
          div.classList.add('out-of-bounds');
        } else if (parseInt(string.charAt(0)) >= 6 && string.length === 1) {
          div.classList.add('out-of-bounds');
        }
          break;
        case 4: if (string.charAt(1) !== '' && parseInt(string.charAt(1)) >= 7) {
          div.classList.add('out-of-bounds');
        } else if (parseInt(string.charAt(0)) >= 7 && string.length === 1) {
          div.classList.add('out-of-bounds');
        }
          break;
        case 3:
          if (string.charAt(1) !== '' && parseInt(string.charAt(1)) >= 8) {
            div.classList.add('out-of-bounds');
          } else if (parseInt(string.charAt(0)) >= 8 && string.length === 1) {
            div.classList.add('out-of-bounds');
          }
          break;

        case 2: if (string.charAt(1) !== '' && parseInt(string.charAt(1)) >= 9) {
          div.classList.add('out-of-bounds');
        } else if (parseInt(string.charAt(0)) >= 9 && string.length === 1) {
          div.classList.add('out-of-bounds');
        }
          break;
        default: okayMove = true;
      }
    }
  });
  return okayMove;
}

const objectOfCurrentShipSize = {
  current: 5,
};

function determineN(ship) {
  if (ship === 'carrier') {
    return 5;
  }
  if (ship === 'battleship') {
    return 4;
  }
  if (ship === 'cruiser') {
    return 3;
  }
  if (ship === 'submarine') {
    return 3;
  }
  if (ship === 'destroyer') {
    return 2;
  }
}

function determineOutOfBounds(div) {
  if (div.classList.contains('out-of-bounds')) {
    return true;
  } return false;
}

export const rotateButton = {
  rotateButtonStatus: false,
  getRotatebutton() {
    const rotateButton = document.getElementById('rotate');
    return rotateButton;
  },
  eventListener() {
    const button = this.getRotatebutton();
    button.addEventListener('click', () => {
      this.toggleClassList();
    });
  },
  toggleClassList() {
    const button = this.getRotatebutton();
    button.classList.toggle('horizontal');
    if (this.rotateButtonStatus) {
      this.rotateButtonStatus = false;
    } else this.rotateButtonStatus = true;
    handleOutOfBounds(objectOfCurrentShipSize.current, this.rotateButtonStatus);
  },
  getStatus() {
    return this.rotateButtonStatus;
  },
};

/* function passToHandle(size, rotateButtonStatus) {

} */

export function addBoardHover(shipType) {
  const n = determineN(shipType);
  document.addEventListener('mouseover', boardHover);
  function boardHover(e) {
    const status = rotateButton.getStatus();
    const removeExistingClass = document.querySelectorAll('.carrier');
    removeExistingClass.forEach((a) => {
      a.classList.toggle('carrier');
    });
    const isDiv = e.target.matches('.board-piece');
    if (isDiv) {
      const currentDiv = e.target;
      currentDiv.classList.toggle('carrier');
      const currentDivDataset = parseInt(currentDiv.dataset.id, 10);
      const isOutOfBounds = determineOutOfBounds(currentDiv);
      if (isOutOfBounds) {
        return;
      }
      if (!status) {
        for (let i = 1; i < n; i++) {
          const blockToAdd = currentDivDataset + i;
          const div = document.querySelector(`[data-id="${blockToAdd}"]`);
          if (div.classList.contains('has-ship')) {
            return;
          }
          div.classList.add('carrier');
        }
      } else {
        let verticalIndexes = currentDivDataset;
        for (let i = 1; i < n; i++) {
          verticalIndexes += 10;
          /* handleOutOfBounds(); */
          const div = document.querySelector(`[data-id="${verticalIndexes}"]`);
          if (div.classList.contains('has-ship')) {
            return;
          }
          if (!div) {
            return;
          }
          div.classList.add('carrier');
        }
      }
    }
  }
  return { boardHover };
}

export function checkForValidMove(id, counter, notDom, computer) {
  let horizontal;
  let board;
  if (notDom) {
    horizontal = notDom;
  } else horizontal = document.getElementById('rotate').classList.contains('horizontal');
  if (computer) {
    board = playerTwoComputer.pGameboard.playerBoard;
  } else board = playerOne.pGameboard.playerBoard;
  let hasShip = false;
  let coordinatesHolder = parseInt(id, 10);
  let verticalCounter = counter;
  if (!horizontal) {
    for (let i = id; i < counter; i++) {
      if (board[i].hasShip) {
        hasShip = true;
        return;
      }
    }
  } else {
    while (verticalCounter > 0) {
      if (board[coordinatesHolder].hasShip) {
        hasShip = true;
        return;
      }
      verticalCounter -= 1;
      coordinatesHolder += 10;
    }
  }
  return hasShip;
}

function updateShipLength(counter) {
  let shipType;
  if (counter === 5) {
    shipType = 'carrier';
  } else if (counter === 4) {
    shipType = 'battleship';
  } else if (counter === 3) {
    shipType = 'cruiser';
  } else if (counter === 2) {
    shipType = 'submarine';
  } else if (counter === 1) {
    shipType = 'destroyer';
  }
  addBoardHover(shipType);
  const outOfBoundsPass = determineN(shipType);
  handleOutOfBounds(outOfBoundsPass, rotateButton.rotateButtonStatus);
}
export function addDivClickEventListener() {
  let counter = 5;
  const arrayOfDivs = document.getElementsByClassName('board-piece');
  Array.from(arrayOfDivs).forEach((div) => {
    div.addEventListener('click', (e) => {
      if (checkForValidMove(e.target.dataset.id, counter)) {
        return;
      }
      handleUserShipSelection(parseInt(e.target.dataset.id, 10), counter, rotateButton.getStatus());
      counter -= 1;
      updateShipLength(counter);
      objectOfCurrentShipSize.current -= 1;
    });
  });
}

function handleUserShipSelection(id, counter, horizontal) {
  /* let horizontal = true;
  const button = document.getElementById('rotate');
  if (button.classList.contains('horizontal')) {
    horizontal = false;
  } */
  getPlayerShipPlacement(id, counter, horizontal);
}

export function displayGameboard() {
  const ships = playerOne.pGameboard.playerBoard.filter((e) => e.hasShip);
  for (let i = 0; i < ships.length; i++) {
    const ok = document.querySelector(`[data-id="${ships[i].number}"]`);
    ok.classList.add('has-ship');
  }
}
export function updatePlayerboard({
  number, hit, hasShip, connectedShip,
}) {
  const divs = document.querySelectorAll('.board-piece');
  const hitDiv = Array.from(divs).find((div) => parseInt(div.dataset.id) === number);
  if (hasShip) {
    console.log(`The enemy hit your ${connectedShip.shipName}`);
    hitDiv.classList.add('enemy-hit-ship');
  } else {
    hitDiv.classList.add('enemy-hit');
    console.log('you missed');
  }
}
export function hideOptions() {
  const options = document.querySelector('.gameboard-options');
  options.style.display = 'none';
}

export function generateEnemyBoard() {
  const container = document.querySelector('.gameboards-container-right');
  container.style.display = 'flex ';

  const gameboard = document.querySelector('.gameboard-right');
  for (let i = 0; i < 100; i++) {
    const boardpiece = document.createElement('div');
    boardpiece.classList.add('board-piece-enemy');
    boardpiece.dataset.idE = i;
    gameboard.appendChild(boardpiece);
  }
  const ships = playerTwoComputer.pGameboard.playerBoard.filter((e) => e.hasShip);
  for (let i = 0; i < ships.length; i++) {
    const ok = document.querySelector(`[data-id-e="${ships[i].number}"]`);
    ok.classList.add('has-ship');
  }
}

export function playerTurnDom() {
  const enemyPieces = document.getElementsByClassName('board-piece-enemy');
  Array.from(enemyPieces).forEach((div) => {
    div.addEventListener('click', (e) => {
      boardController.hitEnemyBoard(parseInt(e.target.dataset.idE));
    });
  });
}

export function updateEnemyboardDom({
  number, hit, hasShip, connectedShip,
}) {
  const enemyDivs = document.querySelectorAll('.board-piece-enemy');
  const hitDiv = Array.from(enemyDivs).find((div) => parseInt(div.dataset.idE) === number);
  if (hasShip) {
    console.log(`You hit the enemy's ${connectedShip.shipName}`);
    hitDiv.classList.add('enemy-hit-ship');
  } else {
    hitDiv.classList.add('enemy-hit');
    console.log('you missed');
  }
}

export function removePlayerboardEventListeners() {
  const playerDivs = document.querySelectorAll('.board-piece');
  /* Array.from(playerDivs).forEach((div) => {
    div.classList.add('player-hover');
  }); */
  const outOfBounds = document.querySelectorAll('.out-of-bounds');
  Array.from(outOfBounds).forEach((div) => {
    if (div.classList.contains('out-of-bounds')) {
      div.classList.toggle('out-of-bounds');
    }
  });
}

export function generateEndingDOM(winner) {
  const container = document.querySelector('.gameboards-container-right');
  container.style.display = 'none';
  const endingContainer = document.querySelector('.ending');
  endingContainer.style.display = 'flex';
  const winnerName = document.getElementById('winner');
  if (winner === 'Computer') {
    winnerName.textContent = 'Computer won!';
  } else winnerName.textContent = 'You won!';
}
