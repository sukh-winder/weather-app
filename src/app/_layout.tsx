import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}
