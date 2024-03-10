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
import {
  convertUnixTimestampToAMPM,
  convertUnixTimestampToDate,
  getCurrentUnixTimestamp,
} from "../utils/timeAnddate";
import { BlurView } from "expo-blur";
export default function Card4({
  weatherDetails,
}: {
  weatherDetails: WeatherData;
}) {
  const theme = useTheme(); //custom theme

  const style = StyleSheet.create({
    card: {
      elevation: 4,
      shadowColor: "transparent",
      // backgroundColor: theme.colors.scrim,
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
      color: theme.colors.onPrimaryContainer,
      fontSize: 12,
      fontWeight: "300",
    },
  });
  return (
    weatherDetails && (
      <BlurView
        style={{
          borderRadius: wp(2),
          overflow: "hidden",
        }}
      >
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
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={style.tempMax}>Pressure</Text>
                <View style={style.tempContainer}>
                  <Text style={style.tempMax}>
                    {weatherDetails?.main?.pressure}mb
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: hp(2),
                }}
              >
                {
                  <Icon
                    name={
                      weatherDetails?.sys?.sunrise <=
                        getCurrentUnixTimestamp() &&
                      getCurrentUnixTimestamp() < weatherDetails?.sys?.sunrise
                        ? "weather-sunny"
                        : "weather-night"
                    }
                    color={theme.colors.background}
                    size={28}
                  />
                }
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
              {weatherDetails?.sys?.sunrise <= getCurrentUnixTimestamp() &&
              getCurrentUnixTimestamp() < weatherDetails?.sys?.sunrise ? (
                <>
                  <Text
                    style={[
                      style.tempMax,
                      {
                        fontSize: 16,
                      },
                    ]}
                  >
                    Sunrise:
                  </Text>
                  <Text
                    style={[
                      style.tempMax,
                      {
                        fontSize: 16,
                      },
                    ]}
                  >
                    {convertUnixTimestampToAMPM(weatherDetails?.sys.sunrise)}
                  </Text>
                </>
              ) : (
                // weatherDetails?.sys?.sunset <= getCurrentUnixTimestamp() &&
                // getCurrentUnixTimestamp() > weatherDetails?.sys?.sunrise &&
                <>
                  <Text
                    style={[
                      style.tempMax,
                      {
                        fontSize: 16,
                      },
                    ]}
                  >
                    Sunset:
                  </Text>
                  <Text
                    style={[
                      style.tempMax,
                      {
                        fontSize: 16,
                      },
                    ]}
                  >
                    {convertUnixTimestampToAMPM(weatherDetails?.sys.sunset)}
                  </Text>
                </>
              )}
            </View>
          </View>
          {/* <Icon
        name={weatherIcon(weatherDetails?.weather[0]?.main)}
        color={theme.colors.background}
        size={34}
      /> */}
        </View>
      </BlurView>
    )
  );
}
