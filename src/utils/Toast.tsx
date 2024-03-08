import Toast from "react-native-toast-message";

export async function alert(type: string, message1: string, message2: string) {
  return Toast.show({
    type: type,
    text1: message1,
    text2: message2,
  });
}
