import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement, ReactNode } from "react";
import useTheme from "../hooks/useTheme";
import { WeatherData } from "../types/weatherData";
import { fahrenheitToCelsius } from "../utils/conversions";
import { weatherIcon } from "../utils/icon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function Card1({
  weatherDetails,
}: {
  weatherDetails: WeatherData;
}) {
  const theme = useTheme(); //custom theme

  function bgColor(weatherDesc: string) {
    switch (weatherDesc) {
      case "clear":
        return theme.colors.solidPrimary;
      case "rain":
        return theme.colors.surfaceVariant;
      case "snow":
        return theme.colors.secondaryFixed;
      case "haze":
        return theme.colors.onSecondaryContainer;
      default:
        return theme.colors.solidPrimary;
    }
  }

  const style = StyleSheet.create({
    card: {
      elevation: 4,
      backgroundColor: theme.colors.solidPrimary,
      width: wp(40),
      borderRadius: wp(2),
      display: "flex",
      flexDirection: "row",
      gap: wp(1),
      paddingHorizontal: wp(2),
      paddingVertical: hp(2),
    },
  });
  return (
    weatherDetails && (
      <View style={style.card}>
        <View style={{ gap: hp(0.5) }}>
          <Text
            style={{
              color:
                weatherDetails?.weather[0]?.main == "snow"
                  ? theme.colors.onBackground
                  : theme.colors.background,
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            {fahrenheitToCelsius(weatherDetails?.main?.temp)}℃
          </Text>
          <Text
            style={{
              color:
                weatherDetails?.weather[0]?.main == "snow"
                  ? theme.colors.onBackground
                  : theme.colors.background,
              fontSize: 12,
              fontWeight: "300",
            }}
          >
            {weatherDetails?.weather[0]?.main}
          </Text>
          <Text
            style={{
              color:
                weatherDetails?.weather[0]?.main == "snow"
                  ? theme.colors.onBackground
                  : theme.colors.background,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            {weatherDetails?.name}
          </Text>
        </View>
        <Icon
          name={weatherIcon(weatherDetails?.weather[0]?.main)}
          color={
            weatherDetails?.weather[0]?.main == "snow"
              ? theme.colors.onBackground
              : theme.colors.background
          }
          size={34}
        />
      </View>
    )
  );
}
