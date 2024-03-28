/**
 * Creates an object from an array of keys, using the values from the array as the default values.
 * @template Key The type of the keys in the array (default: `string`).
 * @template Value The type of the values in the object (default: `unknown`).
 * @param {Key[]} array The array of keys to use as object keys.
 * @param {Value} [defaultValue] The default value to use for each key in the object.
 * @returns {ArrayToObject<Key[], Value>} An object with the keys from the array as keys and the default value as values.
 */
export function arrayOfKeysToObject<Key extends string = string, Value = unknown>(
  array: Key[],
  defaultValue?: Value
): ArrayToObject<Key[], Value> {
  return array.reduce<ArrayToObject<Key[], Value>>(
    (obj, key) => ({ ...obj, [key]: defaultValue }),
    {} as ArrayToObject<Key[], Value>
  );
}
