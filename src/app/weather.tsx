import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Weather from "src/components/Weather";
import { useLocalSearchParams } from "expo-router";

export default function WeatherPage() {
  return (
    <View>
      <Weather />
    </View>
  );
}
