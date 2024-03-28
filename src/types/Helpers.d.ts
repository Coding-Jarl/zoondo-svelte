declare global {
  /**
   * Represents an object with keys from `T` and values of `Value`.
   * @template Keys - An array of string literals.
   * @template TValue - The type of the values in the object. Defaults to `unknown`.
   * @example
   * const colors: ArrayToObject<['red', 'green', 'blue'], string> = {
   *   red: '#ff0000',
   *   green: '#00ff00',
   *   blue: '#0000ff',
   * };
   */
  type ArrayToObject<Keys extends readonly string[], TValue = unknown> = {
    [K in Keys[number]]: TValue;
  };
}

export {};
