import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import RootStackParamList from "../navigation/RootStackParamList";
import RootStackNavigationProp from "../navigation/RootStackNavigationProp";
import { Colors, Layout } from "../constants";
import { User } from "../model/User";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { updateDoctorId, updatePatientId } from "../store/record/action";

type routeProp = RouteProp<RootStackParamList, "FindUser">;

const FindUser = ({ auth, updateDoctorId, updatePatientId }: RootProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<routeProp>();

  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (auth.role?.toUpperCase() === "DOCTOR") {
      loadUser();
    }
  }, []);

  const loadUser = async () => {
    if (loading) return;
    setLoading(true);
    const response = await fetch(
      `${process.env.URL}/user?role=${route.params.role}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `token ${auth.accessToken}`,
        },
      }
    );
    const responseJson = await response.json();
    console.log(`responsea`, response);
    if (responseJson.ok) setUsers(responseJson.payload.users as User[]);
    setLoading(false);
  };

  const onSelect = (userId: number) => {
    if (route.params.role === "doctor") {
      updateDoctorId(userId);
    } else {
      updatePatientId(userId);
    }
    navigation.goBack();
  };

  return auth.role?.toUpperCase() === "DOCTOR" ? (
    loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item.id)}>
            <View style={styles.card}>
              <Text style={styles.id}>{item.id}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Address: {item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    )
  ) : (
    <View>
      <Text>Not Aollowed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: Layout.window.width - 80,
  },
  input: {
    borderColor: Colors.Gray[500],
    borderBottomWidth: 1,
    paddingVertical: 5,
    fontSize: 18,
    color: "#000",
    marginTop: 20,
  },
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  id: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const mapState = (state: RootState) => ({
  auth: state.auth,
  record: state.record,
});

const mapDispatch = {
  updateDoctorId: (id: number) => updateDoctorId(id),
  updatePatientId: (id: number) => updatePatientId(id),
};

const RootConnector = connect(mapState, mapDispatch);

type RootProps = ConnectedProps<typeof RootConnector>;

export default RootConnector(FindUser);
