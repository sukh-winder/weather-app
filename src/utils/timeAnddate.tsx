export function convertUnixTimestampToAMPM(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000); // Convert from seconds to milliseconds
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert from 24-hour to 12-hour format
  const formattedMinutes = minutes.slice(-2); // Extract last two characters of minutes

  return formattedHours + ":" + formattedMinutes + " " + ampm;
}

export function convertUnixTimestampToDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000); // Convert from seconds to milliseconds
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
  const year = date.getFullYear();

  // Format the date
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function getCurrentUnixTimestamp(): number {
  // Create a new Date object with the current date and time
  const currentDate = new Date();

  // Get the Unix timestamp by dividing milliseconds since January 1, 1970, by 1000
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000);

  return unixTimestamp;
}
