import { Image, StyleSheet, Text, View } from "react-native";
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
import { BlurView } from "expo-blur";
export default function Card1({
  weatherDetails,
}: {
  weatherDetails: WeatherData;
}) {
  const theme = useTheme(); //custom theme

  function bgColor(weatherDesc: string) {
    switch (weatherDesc) {
      case "Clear":
        return theme.colors.solidPrimary;
      case "Rain":
        return theme.colors.surfaceVariant;
      case "Snow":
        return theme.colors.secondaryFixed;
      case "Haze":
        return theme.colors.onSecondaryContainer;
      default:
        return theme.colors.solidPrimary;
    }
  }

  const style = StyleSheet.create({
    card: {
      elevation: 4,
      shadowColor: "transparent",
      // backgroundColor: theme.colors.solidPrimary,
      width: wp(40),
      borderRadius: wp(2),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: wp(2),
      paddingHorizontal: wp(2),
      paddingVertical: hp(2),
    },
  });
  return (
    weatherDetails && (
      <BlurView style={{ borderRadius: wp(2), overflow: "hidden" }}>
        <View style={style.card}>
          <View style={{ gap: hp(0.5) }}>
            <Text
              style={{
                color:
                  weatherDetails?.weather[0]?.main == "Snow"
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
                  weatherDetails?.weather[0]?.main == "Snow"
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
                  weatherDetails?.weather[0]?.main == "Snow"
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
              weatherDetails?.weather[0]?.main == "Snow"
                ? theme.colors.onBackground
                : theme.colors.background
            }
            style={{ alignSelf: "flex-end" }}
            size={60}
          />
          {/* icon provided by the api */}
          {/* <Image
            style={{
              height: hp(6),
              width: wp(30),
              alignSelf: "center",
              marginLeft: 4,
            }}
            source={{
              uri: `https://openweathermap.org/img/w/${weatherDetails?.weather[0]?.icon}.png`,
            }}
          /> */}
        </View>
      </BlurView>
    )
  );
}
