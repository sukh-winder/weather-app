import {
  ActivityIndicator,
  Alert,
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
import { alert } from "../utils/Toast";
import LottieView from "lottie-react-native";
import { getBackgroundAnimation } from "../utils/icon";
import sunny from "../../assets/sunny.json";
import notFound from "../../assets/not-found.json";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

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

  function handleCurrentCity() {
    getLocation(Location, setWeatherDetails, setWeather);
  }

  useEffect(() => {
    getLocation(Location, setWeatherDetails, setWeather);
  }, [Location]);

  const style = StyleSheet.create({
    safeAreaView: {
      // flex: 1,
      // marginTop: StatusBar.currentHeight,
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
        {!weatherDetails?.name ? (
          <LottieView
            source={notFound}
            autoPlay
            loop
            style={{
              width: wp(100),
              height: hp(100),
              position: "absolute",
              zIndex: 1,
              top: hp(28),
            }}
          />
        ) : (
          <LottieView
            source={
              weatherDetails?.weather[0]?.main
                ? getBackgroundAnimation(weatherDetails)
                : sunny
            }
            autoPlay
            loop
            style={{
              width: wp(100),
              height: hp(100),
              position: "absolute",
              zIndex: 1,
              top: hp(28),
            }}
          />
        )}
        <View
          style={{
            width: wp(100),
            height: hp(100),
            position: "absolute",
            zIndex: 2,
          }}
        >
          {/* <LinearGradient
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
        > */}
          <View style={style.headerContainer}>
            <Text variant="titleLarge" style={style.headDesc}>
              Pick a location
            </Text>
            <Text variant="labelSmall" style={style.headDesc}>
              Find the area or the city you want to know the detailed weather
              info at this time
            </Text>
          </View>

          <TextInput
            mode="outlined"
            placeholder="Search city"
            value={searchedCity}
            onChangeText={(text) => setSearchedCity(text)}
            style={style.cityInput}
            right={
              <TextInput.Icon
                icon="magnify"
                onPress={() => {
                  if (searchedCity.length > 1) {
                    handleSearchedCity(searchedCity);
                  } else {
                    Alert.alert("warning", "enter a valid city name");
                  }
                }}
              />
            }
          />

          {/* <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: "",
              language: "en",
            }}
            styles={{
              container: {
                width: wp(80),
                alignItems: "center",
                left: wp(8),
                // justifyContent: "center",
              },
            }}
          /> */}

          {loading ? (
            <ActivityIndicator />
          ) : !weatherDetails?.name ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: hp(2),
                marginVertical: hp(4),
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  width: wp(80),
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                Either You searched an Invalid city or it does not exist in
                Database
              </Text>

              <TouchableOpacity
                onPress={() => handleCurrentCity()}
                style={{
                  backgroundColor: theme.colors.backdrop,
                  paddingHorizontal: wp(4),
                  paddingVertical: hp(1.5),
                  borderRadius: wp(2),
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    // width: wp(80),
                    fontWeight: "700",
                    fontSize: 16,
                    color: theme.colors.background,
                  }}
                >
                  Fetch Your current city
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  textAlign: "center",
                  width: wp(80),
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                Or search the valid/other city
              </Text>
            </View>
          ) : (
            <View
              style={{
                height: wp(100),
                justifyContent: "center",
                alignItems: "center",
                // position: "absolute",
                // top: hp(18),
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
        </View>
        {/* </LinearGradient> */}
      </LinearGradient>
    </SafeAreaView>
  );
}
