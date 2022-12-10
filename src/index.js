class GameboardPiece {
  constructor(number) {
    this.number = number;
    this.hit = false;
    this.hasShip = false;
    this.connectedShip = null;
  }
}

export const ShipFactory = (shipName, length, direction) => ({
  shipName,
  size: length,
  hit() {
    this.size -= 1;
  },
  isSunk() {
    return this.length === 0;
  },
  direction,
});

function generateGameboard() {
  // Generates 100 numbers each representing a block on the gameboard.
  const array = [];
  for (let i = 0; i <= 100; i++) {
    const piece = new GameboardPiece(i);
    array.push(piece);
  }
  return array;
}

export const gameboard = () => ({
  playerBoard: generateGameboard(),
  allShips: [],
  // Method that takes a ship class and coordinates in which ship should be placed.
  placeShip(ship, coordinates, vertical) {
    checkMoveLegality(this.playerBoard, coordinates);
    const shipLength = ship.size; // Determines how long the loops should run
    const shipCoordinates = [];
    const holdName = ship.shipName;
    if (vertical) {
      let counter = shipLength;
      let coordinatesHolder = coordinates;
      while (counter > 0) {
        checkMoveLegality(this.playerBoard, coordinatesHolder);
        this.playerBoard[coordinatesHolder].hasShip = true;
        this.playerBoard[coordinatesHolder].connectedShip = ship;
        shipCoordinates.push(this.playerBoard[coordinatesHolder]);
        coordinatesHolder -= 10;
        counter -= 1;
      }
    } else {
      for (let i = coordinates; i < coordinates + shipLength; i++) { // gather coordinates
        shipCoordinates.push(this.playerBoard[i]);
        this.playerBoard[i].hasShip = true;
        this.playerBoard[i].connectedShip = ship;
      }
    }
    this[holdName] = shipCoordinates;
    this.allShips.push(this[holdName]);
  },
  gameboardHit(coordinate) {
    const boardSpace = this.playerBoard[coordinate];
    boardSpace.hit = true;
    if (boardSpace.connectedShip) {
      boardSpace.connectedShip.hit();
    }
  },
});

function checkMoveLegality(playerBoard, coordinates) {
  const passedCoordinate = coordinates;
  const initalCoordinate = playerBoard[passedCoordinate];
  if (initalCoordinate.hasShip) {
    throw 'error';
  }
}

export default ShipFactory;
