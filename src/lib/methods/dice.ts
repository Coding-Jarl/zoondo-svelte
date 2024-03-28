export function roll(nbFaces: number, startValue = 0) {
  if (nbFaces < 1) throw new Error('Invalid number of faces');
  return Math.floor(Math.random() * nbFaces + startValue);
}
