import { ShipFactory, gameboard } from './index';

const newShip = ShipFactory('carrier', 5);
it('Creates a new object', () => {
  expect(newShip.shipName).toEqual('carrier');
  expect(newShip.size).toEqual(5);
});

describe('methds on ship objects function property', () => {
  beforeEach(() => {
    newShip.hit();
  });

  it('subtracts length when hit', () => {
    expect(newShip.size).toEqual(4);
  });
  it('returns if sunk', () => {
    expect(newShip.isSunk()).toBe(false);
  });
});

describe('gameboard manipulation', () => {
  const testGameboard = gameboard();

  it('carrier placed horizonatally', () => {
    testGameboard.placeShip(newShip, 1, 1);
    expect(testGameboard.playerBoard[1][1]).toEqual(1);
    console.log(testGameboard);
  });
  it('battleship placed horizonatally', () => {
    const battleship = ShipFactory('battleship', 4);
    testGameboard.placeShip(battleship, 2, 2);
    console.log(testGameboard);
    expect(testGameboard.playerBoard[2][2]).toEqual(1);
  });
});
