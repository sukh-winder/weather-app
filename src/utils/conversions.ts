export function fahrenheitToCelsius(temp: number): string {
  const celsius = (temp - 276).toFixed(2);

  return celsius;
}

export function mphToKmph(mph: number): string {
  const kmph = (mph * 1.60934).toFixed(2);

  return kmph;
}
