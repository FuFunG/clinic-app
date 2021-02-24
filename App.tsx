import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { getUserInfo } from "./Auth/User";
import { AuthConnector, AuthProps } from "./store/auth/AuthProps";
import Home from "./screen/Home";
import SignIn from "./screen/SignIn";
import SignUp from "./screen/SignUp";
import { Colors } from "./constants";
import AddRecord from "./screen/AddRecord";
import FindUser from "./screen/FindUser";

function App(props: AuthProps) {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("SignIn");

  useEffect(() => {
    initLoginState();
  }, []);

  const initLoginState = async () => {
    const userInfo = await getUserInfo();
    console.log("initLoginState", userInfo);
    if (userInfo != null) {
      props.login({
        ...userInfo,
        loggedIn: true,
      });
      setInitialRoute("Home");
    }
    setLoading(false);
  };

  const MyStack = createStackNavigator();

  const AuthStyle = {
    headerStyle: {
      backgroundColor: Colors.tintColor,
      shadowColor: "transparent",
      shadowRadius: 0,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      elevation: 0,
    },
    headerTintColor: "#fff",
  };

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <NavigationContainer>
          <MyStack.Navigator
            screenOptions={{ headerTintColor: "#000" }}
            initialRouteName={initialRoute}
          >
            <MyStack.Screen
              name="Home"
              component={Home}
              options={{ headerTitle: "Home" }}
            />
            <MyStack.Screen
              name="AddRecord"
              component={AddRecord}
              options={{ headerTitle: "Add Record" }}
            />
            <MyStack.Screen
              name="FindUser"
              component={FindUser}
              options={{ headerTitle: "Find User" }}
            />
            <MyStack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerTitle: "SignIn", ...AuthStyle }}
            />
            <MyStack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerTitle: "SignUp", ...AuthStyle }}
            />
          </MyStack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthConnector(App);
