import { expect, describe, it, expectTypeOf } from 'vitest';
import { isRoomGame } from '$lib/methods/isType';

describe('Method: isRoomGame()', () => {
  it('should be a function with 1 parameter and return a boolean', () => {
    expect(isRoomGame).toBeTypeOf('function');
    expectTypeOf(isRoomGame).parameter(0).toBeString();
    expectTypeOf(isRoomGame).returns.toBeBoolean();
  });

  it('should return false if parameter is not a string', () => {
    // @ts-expect-error: Ignoring type error for this specific test case where we pass a number instead of a string to isRoomGame function
    expect(isRoomGame(666)).toBeFalsy();
    // @ts-expect-error: Ignoring type error for this specific test case where we pass a boolean instead of a string to isRoomGame function
    expect(isRoomGame(true)).toBeFalsy();
    // @ts-expect-error: Ignoring type error for this specific test case where we pass an object instead of a string to isRoomGame function
    expect(isRoomGame({})).toBeFalsy();
  });

  it('should throw if parameter is empty', () => {
    // @ts-expect-error: Ignoring type error for this specific test case where we don't pass a parameter to isRoomGame function
    expect(() => isRoomGame()).toThrow();
    // @ts-expect-error: Ignoring type error for this specific test case where we don't pass a parameter to isRoomGame function
    expect(() => isRoomGame()).toThrowError('isRoomGame() requires 1 parameter');
  });

  it('should return true if parameter is a valid room game', () => {
    const numberOfTests = 10;

    const roomIds = Array.from({ length: numberOfTests }, () => 'game#' + crypto.randomUUID());
    for (const roomId of roomIds) {
      expect(isRoomGame(roomId as Room)).toBeTruthy();
    }
  });

  it('should return false if parameter is not a valid room game', () => {
    expect(isRoomGame('waiting')).toBeFalsy();
    expect(isRoomGame('game#')).toBeFalsy();
    expect(isRoomGame('game#1234')).toBeFalsy();
    // @ts-expect-error: Ignoring type error for this specific test case where we pass an invalid room game id to isRoomGame function
    expect(isRoomGame('not a room game')).toBeFalsy();
  });
});
