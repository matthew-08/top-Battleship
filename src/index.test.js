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

describe('gameboard manipulation with carrier', () => {
  let testGameboard;
  let newShip;
  beforeEach(() => {
    testGameboard = gameboard();
    newShip = ShipFactory('carrier', 5);
  });

  it('carrier placed horizonatally', () => {
    testGameboard.placeShip(newShip, 50);
    expect(testGameboard.carrier.length).toEqual(5);
    expect(testGameboard.playerBoard[54].hasShip).toEqual(true);
  });

  it('carrier placed vertically', () => {
    testGameboard.placeShip(newShip, 50, true);
    expect(testGameboard.carrier.length).toEqual(5);
    expect(testGameboard.playerBoard[10].hasShip).toEqual(true);
  });
  it('does not allow placement on blocks which already have a ship', () => {
    testGameboard.placeShip(newShip, 50, true);
    const testShip = ShipFactory('battleship', 4);
    expect(() => testGameboard.placeShip(testShip, 30)).toThrow();
  });
  it('does not allow placement on blocks which already have a ship', () => {
    testGameboard.placeShip(newShip, 50, true);
    const testShip = ShipFactory('battleship', 4);
    expect(() => testGameboard.placeShip(testShip, 10)).toThrow();
  });
});

describe('gameboards receive and record attacks', () => {
  let testGameboard;
  let newShip;
  beforeEach(() => {
    testGameboard = gameboard();
    newShip = ShipFactory('carrier', 5);
    testGameboard.placeShip(newShip, 50, true);
  });
  it('records a hit on a ship', () => {
    testGameboard.gameboardHit(40);
    expect(testGameboard.playerBoard[40].hit).toEqual(true);
    testGameboard.gameboardHit(10);
    expect(testGameboard.playerBoard[10].hit).toEqual(true);
  });
  it('records hits on clear spaces', () => {
    testGameboard.gameboardHit(1);
    expect(testGameboard.playerBoard[1].hit).toEqual(true);
  });
  it('sends hit to corresponding ship', () => {
    testGameboard.gameboardHit(40);
    expect(newShip.size).toEqual(4);
  });
});
it('displays an array of ships on the gameboard', () => {
  const testGameboard = gameboard();
  const carrier = ShipFactory('carrier', 5);
  const battleship = ShipFactory('battleship', 4);
  const cruiser = ShipFactory('crusier', 3);
  testGameboard.placeShip(carrier, 20);
  testGameboard.placeShip(battleship, 30);
  testGameboard.placeShip(cruiser, 10);
  expect(testGameboard.allShips.length).toEqual(3);
});
