export function fahrenheitToCelsius(temp: number): string {
  const celsius = (temp - 276).toFixed(2);

  return celsius;
}

export function mphToKmph(mph: number) {
  const kmph = Number(mph * 1.60934).toFixed(2);

  return Number(kmph);
}
