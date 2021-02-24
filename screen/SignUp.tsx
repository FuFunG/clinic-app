import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import RootStackParamList from "../navigation/RootStackParamList";
import { AuthConnector, AuthProps } from "../store/auth/AuthProps";
import RootStackNavigationProp from "../navigation/RootStackNavigationProp";
import { Colors, Layout } from "../constants";
import RoundButton from "../components/RoundButton";
import { fetchSignIn, fetchSignUp, setUserInfo, UserInfo } from "../Auth/User";

type routeProp = RouteProp<RootStackParamList, "SignUp">;

const SignUp = (props: AuthProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<routeProp>();

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Passw0rd");
  const [confirmPassword, setConfirmPassword] = useState("Passw0rd");
  const [name, setName] = useState("Mr Chan");
  const [clinic, setClinic] = useState("Clinic A");
  const [phoneNumber, setPhoneNumber] = useState("61231234");
  const [address, setAddress] = useState("address");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, []);

  const InputStyle = {
    borderColor: "#fff",
    borderBottomWidth: 1,
    paddingVertical: 5,
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
  };

  const vaildInput = (): boolean => {
    if (!email || !password || !confirmPassword || !name || !clinic || !phoneNumber || !address) return false
    if (password != confirmPassword) return false
    return checkEmailValidity(email)
  }

  const checkEmailValidity = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSignUp = async () => {
    if (!vaildInput) {
      Alert.alert("Wrong Input")
      return
    }
    if (loading) return
    setLoading(true)
    const response = await fetchSignUp(email, password, name, clinic, phoneNumber, address)
    if (response.ok) {
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
          Alert.alert('auto login fail')
        }
    } else {
      Alert.alert(response.message)
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...InputStyle,
          marginTop: 20,
        }}
        placeholder="Email"
        placeholderTextColor="#fff"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={InputStyle}
        placeholder="Password"
        placeholderTextColor="#fff"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />
      <TextInput
        style={InputStyle}
        placeholder="Comfirm Password"
        placeholderTextColor="#fff"
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
        value={confirmPassword}
      />
      <TextInput
        style={InputStyle}
        placeholder="Name"
        placeholderTextColor="#fff"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        style={InputStyle}
        placeholder="Clinic"
        placeholderTextColor="#fff"
        onChangeText={(text) => setClinic(text)}
        value={clinic}
      />
      <TextInput
        style={InputStyle}
        placeholder="Phone Number"
        placeholderTextColor="#fff"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <TextInput
        style={InputStyle}
        placeholder="Address"
        placeholderTextColor="#fff"
        onChangeText={(text) => setAddress(text)}
        value={address}
      />
      <RoundButton
        title={"Sign Up"}
        onPress={handleSignUp}
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
          marginTop: 20,
        }}
      />
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.replace("SignIn", { email: email })}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          I have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthConnector(SignUp);

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
