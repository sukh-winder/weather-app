export function fahrenheitToCelsius(temp: number): number {
  const celsius = Math.ceil(temp - 276);

  return celsius;
}

export function mphToKmph(mph: number) {
  const kmph = Number(mph * 1.60934).toFixed(2);

  return Number(kmph);
}
