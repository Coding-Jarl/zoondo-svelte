import { describe, expect, it } from 'vitest';
import { arrayOfKeysToObject } from '$lib/methods/array';

describe('arrayOfKeysToObject', () => {
  it('should be a function', () => {
    expect(arrayOfKeysToObject).toBeTypeOf('function');
  });

  it('should return an object', () => {
    expect(arrayOfKeysToObject([])).toBeTypeOf('object');
  });

  it("should have the argument's elements as keys", () => {
    expect(arrayOfKeysToObject([''])).toBeTypeOf('object');
    expect(arrayOfKeysToObject([''])).toHaveProperty('');

    let testValue = 'red';
    let testRes = arrayOfKeysToObject([testValue, 'dog']);
    expect(testRes).toHaveProperty('dog');
    expect(testRes).not.toHaveProperty('cat');

    testValue = (Math.random() + 1).toString(36).substring(7); // Bad practice ?
    expect(arrayOfKeysToObject([testValue])).toHaveProperty(testValue);

    testRes = arrayOfKeysToObject([testValue, 'dog']);
    expect(testRes).toHaveProperty(testValue);
    expect(testRes).toHaveProperty('dog');
  });

  it('should return an object with undefined as default values', () => {
    expect(arrayOfKeysToObject(['key1', 'key2', 'key3'])).toEqual({
      key1: undefined,
      key2: undefined,
      key3: undefined
    });
  });

  it('should return an object with simple values', () => {
    expect(arrayOfKeysToObject(['key1', 'key2'], true)).toEqual({
      key1: true,
      key2: true
    });
  });

  it('should return an object with complex values', () => {
    expect(arrayOfKeysToObject(['key1', 'key2'], { firstname: 'John', lastname: 'Doe' })).toEqual({
      key1: { firstname: 'John', lastname: 'Doe' },
      key2: { firstname: 'John', lastname: 'Doe' }
    });
  });

  it('should handle an array with duplicate keys', () => {
    expect(arrayOfKeysToObject(['key1', 'key2', 'key1', 'key3'])).toEqual({
      key1: undefined,
      key2: undefined,
      key3: undefined
    });
  });
});
