import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode, useCallback, useEffect, useState } from "react";

import useTheme from "../hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "react-native-paper";
import { useWeather } from "../store/weatherStore";
import { getBackgroundAnimation, weatherIcon } from "../utils/icon";
import { fahrenheitToCelsius } from "../utils/conversions";
import {
  convertUnixTimestampToAMPM,
  convertUnixTimestampToDate,
  getCurrentTime,
} from "../utils/timeAnddate";
import { LinearGradient } from "expo-linear-gradient";
import { getWeatherByCity } from "../utils/api";
import LottieView from "lottie-react-native";
import sunny from "../../assets/sunny.json";

export default function Weather() {
  const theme = useTheme();
  const weather = useWeather((state) => state.weather);
  const setWeather = useWeather((state) => state.setWeather);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [greetings, setGreeting] = useState<string>("");
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

  useEffect(() => {
    const intervalId = setInterval(
      () => getCurrentTime(setCurrentTime, setGreeting),

      1000
    ); // Update every second

    return () => {
      clearInterval(intervalId); // Cleanup on component unmount
    };
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
        <Text variant="titleMedium" style={style.user}>
          Hi! User,{greetings}.
        </Text>

        <Text variant="titleLarge" style={style.cityName}>
          {weather?.name}.
        </Text>

        <Text variant="titleMedium" style={style.user}>
          {currentTime}
        </Text>
        <View style={{ alignItems: "center" }}>
          {/* <Icon
            name={weatherIcon(weather?.weather[0]?.main)}
            color={theme.colors.background}
            size={hp(30)}
          /> */}
          <LottieView
            source={
              weather?.weather[0]?.main
                ? getBackgroundAnimation(weather)
                : sunny
            }
            autoPlay
            loop
            speed={5}
            style={{
              width: wp(100),
              height: hp(30),
            }}
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
              {convertUnixTimestampToDate(weather?.dt)}
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
