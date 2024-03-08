import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode, useCallback, useState } from "react";

import useTheme from "../hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "react-native-paper";
import { useWeather } from "../store/weatherStore";
import { weatherIcon } from "../utils/icon";
import { fahrenheitToCelsius } from "../utils/conversions";
import { convertUnixTimestampToAMPM } from "../utils/timeAnddate";
import { LinearGradient } from "expo-linear-gradient";
import { getWeatherByCity } from "../utils/api";

export default function Weather() {
  const theme = useTheme();
  const weather = useWeather((state) => state.weather);
  const setWeather = useWeather((state) => state.setWeather);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const style = StyleSheet.create({
    safeAreaView: {
      // flex: 1,
      marginTop: StatusBar.currentHeight,
      // backgroundColor: theme.colors.onBackground,
      // alignItems: "center",
    },
    gradientContainer: {
      width: wp(100),
      height: hp(100),
      paddingVertical: hp(1),
      paddingBottom: hp(3),
      paddingHorizontal: wp(2),
    },
    tempAndTimeContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: wp(4),
    },
    cityName: {
      color: theme.colors.onPrimaryContainer,
      alignSelf: "flex-start",
      paddingHorizontal: wp(2),
    },
    user: {
      color: theme.colors.onPrimaryContainer,
      alignSelf: "flex-start",
      paddingHorizontal: wp(2),
    },
    scrollView: { marginVertical: hp(2) },
    scrollViewContent: { gap: hp(4) },
    cardContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: wp(2),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.background,
      paddingBottom: hp(0.5),
    },
    leftDataContainer: { flexDirection: "row", alignItems: "center" },
    IconAndInfoContainer: {
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    rightDataContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    rightdataWrapper: {
      alignItems: "flex-end",
      justifyContent: "flex-end",
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      (async function () {
        const weatherData = await getWeatherByCity(weather?.name);
        setWeather(weatherData);
        setRefreshing(false);
      })();
    }, 2000);
  }, []);

  return refreshing ? (
    <SafeAreaView style={style.safeAreaView}>
      <LinearGradient
        colors={[theme.colors.onPrimary, theme.colors.primary]}
        start={{ x: 0.9, y: 0.1 }}
        end={{ x: 0, y: 1 }}
        style={style.gradientContainer}
      >
        <ActivityIndicator color={theme.colors.onBackground} size={"large"} />
      </LinearGradient>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={style.safeAreaView}>
      <LinearGradient
        colors={[theme.colors.onPrimary, theme.colors.primary]}
        start={{ x: 0.9, y: 0.1 }}
        end={{ x: 0, y: 1 }}
        style={style.gradientContainer}
      >
        <Text variant="titleLarge" style={style.cityName}>
          {weather?.name}.
        </Text>

        <Text variant="titleMedium" style={style.user}>
          Hi! User.
        </Text>
        <View style={{ alignItems: "center" }}>
          <Icon
            name={weatherIcon(weather?.weather[0]?.main)}
            color={theme.colors.background}
            size={hp(30)}
          />
          <Text
            variant="displayLarge"
            style={{ color: theme.colors.background }}
          >
            {fahrenheitToCelsius(weather?.main?.temp)}℃
          </Text>
          <Text
            variant="displayMedium"
            style={{ color: theme.colors.background }}
          >
            {weather?.weather[0]?.main}
          </Text>

          <View style={style.tempAndTimeContainer}>
            <Text
              variant="displaySmall"
              style={{ color: theme.colors.background }}
            >
              {convertUnixTimestampToAMPM(weather?.dt)}
            </Text>

            <TouchableOpacity onPress={() => onRefresh()}>
              <Icon name="refresh" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={style.scrollView}
          contentContainerStyle={style.scrollViewContent}
        >
          {/* 1 */}
          <View style={style.cardContainer}>
            <View style={style.leftDataContainer}>
              <Icon
                name={"weather-sunny"}
                color={theme.colors.background}
                size={28}
              />

              <View style={style.IconAndInfoContainer}>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  Sunrise
                </Text>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  {convertUnixTimestampToAMPM(weather?.sys.sunrise)}
                </Text>
              </View>
            </View>

            <View style={style.rightDataContainer}>
              <Icon
                name={"weather-night"}
                color={theme.colors.background}
                size={28}
              />

              <View style={style.rightdataWrapper}>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  Sunset
                </Text>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  {convertUnixTimestampToAMPM(weather?.sys.sunset)}
                </Text>
              </View>
            </View>
          </View>

          {/* 2 */}
          <View style={style.cardContainer}>
            <View style={style.leftDataContainer}>
              <Icon
                name={"weather-sunny"}
                color={theme.colors.background}
                size={28}
              />

              <View style={style.IconAndInfoContainer}>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  Feels like
                </Text>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  {fahrenheitToCelsius(weather?.main?.feels_like)}℃
                </Text>
              </View>
            </View>

            <View style={style.rightDataContainer}>
              <Icon
                name={"air-humidifier"}
                color={theme.colors.background}
                size={28}
              />

              <View style={style.rightdataWrapper}>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  Humidity
                </Text>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  {weather?.main.humidity}%
                </Text>
              </View>
            </View>
          </View>

          {/* 3 */}
          <View style={style.cardContainer}>
            <View style={style.leftDataContainer}>
              <Icon
                name={"weather-windy-variant"}
                color={theme.colors.background}
                size={28}
              />

              <View style={style.IconAndInfoContainer}>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  Wind
                </Text>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  {weather?.wind.speed}km/h
                </Text>
              </View>
            </View>

            <View style={style.rightDataContainer}>
              <Icon
                name={"weather-windy"}
                color={theme.colors.background}
                size={28}
              />

              <View style={style.rightdataWrapper}>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  Gust
                </Text>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  {weather?.wind.gust} km/h
                </Text>
              </View>
            </View>
          </View>

          {/* 4 */}
          <View style={style.cardContainer}>
            <View style={style.leftDataContainer}>
              <Icon
                name={"thermometer-chevron-up"}
                color={theme.colors.background}
                size={28}
              />

              <View style={style.IconAndInfoContainer}>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  Max Temp
                </Text>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  {fahrenheitToCelsius(weather?.main?.temp_max)}℃
                </Text>
              </View>
            </View>

            <View style={style.rightDataContainer}>
              <Icon
                name={"thermometer-chevron-down"}
                color={theme.colors.background}
                size={28}
              />

              <View style={style.rightdataWrapper}>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  Min Temp
                </Text>
                <Text
                  style={[
                    style.tempMax,
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  {fahrenheitToCelsius(weather?.main?.temp_max)}℃
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
