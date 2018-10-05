export function replace<T>(array: T[], index: number, convert: (value: T) => T | null) {
  const value = array[index];
  const newValue = convert(value);
  if (newValue === null) {
    array.splice(index, 1);
  } else {
    array.splice(index, 1, newValue);
  }
}
