import { MD3LightTheme } from "react-native-paper";

export default function useTheme() {
  const theme = MD3LightTheme;

  const customTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      solidPrimary: "#2B5AF4",
      primary: "#133EC7",
      onPrimary: "#F2F0FF",
      notificationSuccess: "#04844b",
      notificationError: "#c23934",
      warning: "#ffb75d",
      information: "#706e6b",
      secondary: "#ED6B4E",
      onSecondary: "#FFFFFF",
      tertiary: "#E3C02E",
      accent: "#5899FF",
      background: "#FEFBFF",
      onBackground: "#1B1B1F",
      surface: "#fff",
      onSurface: "#1B1B1F",
      surfaceVariant: "#44464f",
      shadow: "#000000",
      outline: "#757780",
      success: "#106d20",
      onSuccess: "#ffffff",
      successContainer: "#9df898",
      onSuccessContainer: "#002204",
      primaryButton: "#2B5BB5",
      onPrimaryButton: "#FFFFFF",
      secondaryText: "#575E71",
      onSecondaryButton: "#141B2C",
      secondaryFixed: "#DCE2F9",
    },
  };

  return customTheme;
}
