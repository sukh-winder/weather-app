import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement, ReactNode } from "react";
import useTheme from "../hooks/useTheme";
import { WeatherData } from "../types/weatherData";
import { fahrenheitToCelsius, mphToKmph } from "../utils/conversions";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function Card2({
  weatherDetails,
}: {
  weatherDetails: WeatherData;
}) {
  const theme = useTheme(); //custom theme

  const style = StyleSheet.create({
    card: {
      elevation: 4,
      backgroundColor: theme.colors.scrim,
      width: wp(40),
      borderRadius: wp(2),
      display: "flex",
      flexDirection: "row",
      gap: wp(1),
      paddingHorizontal: wp(2),
      paddingVertical: hp(2),
    },
    tempContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    tempMax: {
      color: theme.colors.background,
      fontSize: 14,
      fontWeight: "700",
    },
    tempMin: {
      color: theme.colors.background,
      fontSize: 12,
      fontWeight: "300",
    },
    gustContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: wp(1),
      top: hp(0.5),
    },
  });
  return (
    weatherDetails && (
      <View style={style.card}>
        <View style={{ gap: hp(0.5) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "auto",
              gap: wp(4),
            }}
          >
            <View
              style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
            >
              <Text style={style.tempMax}>Max temp</Text>
              <View style={style.tempContainer}>
                <Text style={style.tempMax}>
                  {fahrenheitToCelsius(weatherDetails?.main?.temp_max)}℃
                </Text>
                <Icon name="arrow-up" color={theme.colors.background} />
              </View>
            </View>

            <View
              style={{
                marginTop: hp(2),
              }}
            >
              <Text style={style.tempMin}>Min temp</Text>

              <View
                style={[style.tempContainer, { justifyContent: "flex-end" }]}
              >
                <Text style={style.tempMin}>
                  {fahrenheitToCelsius(weatherDetails?.main?.temp_min)}℃
                </Text>

                <Icon name="arrow-down" color={theme.colors.background} />
              </View>
            </View>
          </View>

          <View style={style.gustContainer}>
            <Text
              style={[
                style.tempMax,
                {
                  fontSize: 16,
                },
              ]}
            >
              {weatherDetails?.wind?.gust ? "Gust:" : "Wind:"}
            </Text>
            <Text
              style={[
                style.tempMax,
                {
                  fontSize: 12,
                },
              ]}
            >
              {weatherDetails?.wind?.gust
                ? mphToKmph(weatherDetails?.wind?.gust)
                : weatherDetails?.wind.speed}
              km/h
            </Text>

            <Icon
              name="weather-windy-variant"
              color={theme.colors.background}
              size={28}
            />
          </View>
        </View>
        {/* <Icon
        name={weatherIcon(weatherDetails?.weather[0]?.main)}
        color={theme.colors.background}
        size={34}
      /> */}
      </View>
    )
  );
}
