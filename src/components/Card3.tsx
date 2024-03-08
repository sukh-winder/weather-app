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
import { convertUnixTimestampToDate } from "../utils/timeAnddate";
export default function Card3({
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
              <Text style={style.tempMax}>Feels like</Text>
              <View style={style.tempContainer}>
                <Text style={style.tempMax}>
                  {fahrenheitToCelsius(weatherDetails?.main?.temp_max)}℃
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: hp(2),
              }}
            >
              <Text style={style.tempMin}>Humidity</Text>

              <View
                style={[style.tempContainer, { justifyContent: "flex-end" }]}
              >
                <Text style={style.tempMin}>
                  {weatherDetails?.main?.humidity}%
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: wp(1),
              top: hp(0.5),
            }}
          >
            <Text
              style={[
                style.tempMax,
                {
                  fontSize: 16,
                },
              ]}
            >
              Date:
            </Text>
            <Text
              style={[
                style.tempMax,
                {
                  fontSize: 16,
                },
              ]}
            >
              {convertUnixTimestampToDate(weatherDetails?.dt)}
            </Text>

            {/* <Icon
            name="weather-windy-variant"
            color={theme.colors.background}
            size={28}
          /> */}
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
