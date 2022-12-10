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
  const array = [];
  for (let i = 0; i <= 9; i++) {
    const nestedArray = [];
    for (let i = 0; i <= 9; i++) {
      nestedArray.push(0);
    }
    array.push(nestedArray);
  }
  return array;
}

export const gameboard = () => ({
  playerBoard: generateGameboard(),
  placeShip(ship, initialIndexHorizontal, initialIndexVertical) {
    const shipLength = ship.size;
    for (let i = initialIndexHorizontal; i <= shipLength; i++) {
      this.playerBoard[initialIndexVertical][i] = 1;
    }
  },
});
export default ShipFactory;
