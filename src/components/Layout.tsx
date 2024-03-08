import { PaperProvider, Text } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Stack } from "expo-router";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useTheme from "../hooks/useTheme";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Layout() {
  const theme = useTheme(); //custom theme

  const style = StyleSheet.create({
    notifContainer: { paddingHorizontal: wp(8) },
    notifWrapper: {
      flexDirection: "row",
      gap: wp(1),
      width: wp("94%"),
      backgroundColor: theme.colors.notificationSuccess,
      paddingLeft: wp(2),
      paddingRight: wp(10),
      marginHorizontal: wp(2),
      marginVertical: wp(2),
      paddingVertical: hp(1),
      justifyContent: "flex-start",
      alignItems: "center",
      alignSelf: "center",
      elevation: 5,
      shadowOffset: {
        height: 2,
        width: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      borderColor: theme.colors.onSuccess,
      borderRadius: 8,
      zIndex: 10,
    },

    text1: {
      color: theme.colors.onBackground,
      fontWeight: "bold",
      fontSize: 14,
    },
    successText2: {
      marginRight: wp(2),
      color: theme.colors.onBackground,
      fontSize: 12,
    },
    errorText2: { color: theme.colors.onSurface, fontSize: 12 },
    infoText1: {
      color: theme.colors.onPrimaryButton,
      fontWeight: "bold",
    },
    infoText2: {
      color: theme.colors.onPrimaryButton,
      fontSize: 12,
    },
  });

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: ({ text1, text2 }: any) => (
      <View style={style.notifContainer}>
        <View style={style.notifWrapper}>
          <Icon
            name="check-decagram"
            size={35}
            color={theme.colors.onBackground}
          />
          <View>
            <Text style={style.text1}>{text1}</Text>
            <Text style={style.successText2}>{text2}</Text>
          </View>
        </View>
      </View>
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: ({ text1, text2 }: any) => (
      <View style={{ paddingHorizontal: wp(18) }}>
        <View
          style={[
            style.notifWrapper,
            {
              backgroundColor: theme.colors.notificationError,
              borderColor: theme.colors.onError,
            },
          ]}
        >
          <Icon
            name="circle-off-outline"
            size={35}
            color={theme.colors.onPrimaryButton}
          />
          <View>
            <Text
              style={[
                style.text1,
                {
                  color: theme.colors.onPrimaryButton,
                },
              ]}
            >
              {text1}
            </Text>
            {
              <Text style={style.errorText2}>
                {text2 ? text2 : "looking into the issue please wait."}
              </Text>
            }
          </View>
        </View>
      </View>
    ),

    information: ({ text1, text2 }: any) => (
      <View style={style.notifContainer}>
        <View
          style={[
            style.notifWrapper,
            {
              backgroundColor: theme.colors.information,
              borderColor: theme.colors.onBackground,
            },
          ]}
        >
          <Icon
            name="information"
            size={35}
            color={theme.colors.onPrimaryButton}
          />
          <View>
            <Text style={style.infoText1}>{text1}</Text>
            <Text style={style.infoText2}>{text2}</Text>
          </View>
        </View>
      </View>
    ),
    warning: ({ text1, text2 }: any) => (
      <View style={[style.notifContainer, { width: wp("100%") }]}>
        <View
          style={[
            style.notifWrapper,
            {
              backgroundColor: theme.colors.warning,
              borderColor: theme.colors.onBackground,
            },
          ]}
        >
          <Icon name="alert" size={35} color={theme.colors.onPrimaryButton} />
          <View>
            <Text style={style.infoText1}>{text1}</Text>
            <Text style={style.infoText2}>{text2}</Text>
          </View>
        </View>
      </View>
    ),
  };

  return (
    <>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <Toast config={toastConfig} />
      </PaperProvider>
    </>
  );
}
