import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import RootStackParamList from "../navigation/RootStackParamList";
import { AuthConnector, AuthProps } from "../store/auth/AuthProps";
import RootStackNavigationProp from "../navigation/RootStackNavigationProp";
import { Colors, Layout } from "../constants";
import RoundButton from "../components/RoundButton";
import { setUserInfo, UserInfo, fetchSignIn } from "../Auth/User";

type routeProp = RouteProp<RootStackParamList, "SignIn">;

const SignIn = (props: AuthProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<routeProp>();

  const [email, setEmail] = React.useState("doctor@test.com");
  const [password, setPassword] = React.useState("Passw0rd");

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (props.auth.loggedIn) navigation.replace("Home");
  }, [props.auth.loggedIn]);

  const handleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    const response = await fetchSignIn(email, password)
    if (response.ok) {
      const userInfo: UserInfo = {
        ...response.payload,
      };
      props.login({
        loggedIn: true,
        ...userInfo,
      });
      setUserInfo(userInfo);
      navigation.replace("Home");
    } else {
    }
    setLoading(false);
  };

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          borderColor: "#fff",
          borderBottomWidth: 1,
          paddingVertical: 5,
          fontSize: 18,
          color: "#fff",
          marginTop: 20,
        }}
        placeholder="Email"
        placeholderTextColor="#fff"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{
          borderColor: "#fff",
          borderBottomWidth: 1,
          paddingVertical: 5,
          fontSize: 18,
          color: "#fff",
          marginTop: 10,
        }}
        placeholder="Password"
        placeholderTextColor="#fff"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />
      <RoundButton
        title={"Sign In"}
        onPress={handleSignIn}
        loading={loading}
        containerStyle={{
          width: Layout.window.width - 80,
          backgroundColor: "#fff",
          paddingVertical: 10,
        }}
        textStyle={{
          color: Colors.tintColor,
          fontSize: 18,
        }}
        style={{
          marginTop: 30,
        }}
      />
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.replace("SignUp", { email: email })}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Create an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthConnector(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: Colors.tintColor,
  },
  button: {
    width: Layout.window.width - 80,
  },
});
