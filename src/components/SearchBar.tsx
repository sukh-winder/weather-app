import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput, Text } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getWeatherByCity } from "../utils/api";
import { WeatherData } from "../types/weatherData";
import * as Location from "expo-location";
import { getLocation } from "../utils/locationPermission";
import { SafeAreaView } from "react-native-safe-area-context";

import useTheme from "../hooks/useTheme";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import { router } from "expo-router";
import Card4 from "./Card4";
import { useWeather } from "../store/weatherStore";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const initialState = {
  base: "",
  clouds: {
    all: 0,
  },
  cod: 0,
  coord: {
    lat: 0,
    lon: 0,
  },
  dt: 0,
  id: 0,
  main: {
    feels_like: 0,
    grnd_level: 0,
    humidity: 0,
    pressure: 0,
    sea_level: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
  name: "",
  sys: {
    country: "",
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  visibility: 0,
  weather: [
    {
      description: "",
      icon: "",
      id: 0,
      main: "",
    },
  ],
  wind: {
    deg: 0,
    gust: 0,
    speed: 0,
  },
  message: "" || undefined,
};

export default function SearchBar() {
  const theme = useTheme();
  const [weatherDetails, setWeatherDetails] =
    useState<WeatherData>(initialState);
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setWeather = useWeather((state) => state.setWeather);

  const handleSearchedCity = useCallback(
    async function (searchedCity: string) {
      setLoading(true);
      try {
        const weatherData = await getWeatherByCity(searchedCity);
        console.log("weather", weatherData);
        setWeatherDetails(weatherData);
        setWeather(weatherData);

        setSearchedCity("");
        Keyboard.dismiss();
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    },
    [searchedCity]
  );

  useEffect(() => {
    getLocation(Location, setWeatherDetails, setWeather);
  }, [Location]);

  const style = StyleSheet.create({
    safeAreaView: {
      // flex: 1,
      marginTop: StatusBar.currentHeight,
      // backgroundColor: theme.colors.onBackground,
      // alignItems: "center",
    },
    headerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: hp(2),
      gap: hp(1),
    },
    headDesc: {
      textAlign: "center",
      width: wp(70),
      color: theme.colors.onPrimaryContainer,
    },
    cityInput: {
      width: wp(90),
      alignSelf: "center",
    },
    contentContainer: {
      margin: hp(2),
      gap: hp(2),
    },

    currentLocation: { color: theme.colors.background, textAlign: "center" },
  });

  return (
    <SafeAreaView style={style.safeAreaView}>
      <LinearGradient
        colors={[theme.colors.onPrimary, theme.colors.primary]}
        // start={{ x: 0, y: 0.9 }}
        // end={{ x: 0.9, y: 0.5 }}
        start={{ x: 0.9, y: 0.1 }}
        end={{ x: 0, y: 1 }}
        style={{
          width: wp(100),
          height: hp(100),
          paddingVertical: hp(1),
          paddingBottom: hp(3),
          paddingHorizontal: wp(2),
        }}
      >
        <View style={style.headerContainer}>
          <Text variant="titleLarge" style={style.headDesc}>
            Pick a location
          </Text>
          <Text variant="labelSmall" style={style.headDesc}>
            Find the area or the city you want to know the detailed weather info
            at this time
          </Text>
        </View>

        <TextInput
          mode="outlined"
          value={searchedCity}
          onChangeText={(text) => setSearchedCity(text)}
          style={style.cityInput}
          right={
            <TextInput.Icon
              icon="magnify"
              onPress={() => handleSearchedCity(searchedCity)}
            />
          }
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              height: wp(100),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={style.contentContainer}>
              <TouchableOpacity
                onPress={() => router.push("/weather")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: wp(4),
                }}
              >
                <Text variant="titleMedium" style={style.currentLocation}>
                  Your city is {weatherDetails?.name}
                </Text>
                <Icon name="arrow-right" size={24} />
              </TouchableOpacity>
              {weatherDetails && (
                <View style={{ flexDirection: "row", gap: wp(4) }}>
                  <Card1 weatherDetails={weatherDetails} />
                  <View style={{ top: hp(4), marginLeft: wp(2) }}>
                    <Card2 weatherDetails={weatherDetails} />
                  </View>
                </View>
              )}
            </View>
            {weatherDetails && (
              <View
                style={[
                  style.contentContainer,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <Card3 weatherDetails={weatherDetails} />
                <View style={{ top: hp(4), marginLeft: wp(2) }}>
                  <Card4 weatherDetails={weatherDetails} />
                </View>
              </View>
            )}
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}
