import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import RootStackParamList from "../navigation/RootStackParamList";
import RootStackNavigationProp from "../navigation/RootStackNavigationProp";
import { Colors, Layout } from "../constants";
import RoundButton from "../components/RoundButton";
import { RootState } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { initRecord } from "../store/record/action";

type routeProp = RouteProp<RootStackParamList, "AddRecord">;

const AddRecord = ({ auth, record: { doctorId, patientId } }: RootProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<routeProp>();

  const [diagnosis, setDiagnosis] = React.useState("Test Diagnosis");
  const [medication, setMedication] = React.useState("Test Medication");
  const [fee, setFee] = React.useState("100");
  const [date, setDate] = React.useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = React.useState(moment().format("HH:mm"));
  const [followUp, setFollowUp] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    if (loading) return;
    setLoading(true);
    if (!doctorId || !patientId || !diagnosis || !medication || !fee) {
      Alert.alert("Wrong Input");
      setLoading(false);
      return;
    }
    const response = await fetch(`${process.env.URL}/consultation`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `token ${auth.accessToken}`,
      },
      body: JSON.stringify({
        doctorId: doctorId,
        patientId: patientId,
        diagnosis: diagnosis,
        medication: medication,
        consultationFee: parseFloat(fee),
        date: date,
        time: time,
        followUp: followUp,
      }),
    });
    const responseJson = await response.json();
    Alert.alert(responseJson.message, "", [
      {
        onPress: () => response.ok && navigation.goBack(),
      },
    ]);
    setLoading(false);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FindUser", {
              role: "doctor",
            })
          }
        >
          <View style={styles.cardSelect}>
            <Text>
              {doctorId === null ? "Select Doctor" : `Selected ID: ${doctorId}`}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FindUser", {
              role: "user",
            })
          }
        >
          <View style={styles.cardSelect}>
            <Text>
              {patientId === null
                ? "Select Patient"
                : `Selected ID: ${patientId}`}
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Diagnosis"
          placeholderTextColor={Colors.Gray[500]}
          onChangeText={(text) => setDiagnosis(text)}
          value={diagnosis}
        />
        <TextInput
          style={styles.input}
          placeholder="Medication"
          placeholderTextColor={Colors.Gray[500]}
          onChangeText={(text) => setMedication(text)}
          value={medication}
        />
        <TextInput
          style={styles.input}
          placeholder="Fee"
          placeholderTextColor={Colors.Gray[500]}
          onChangeText={(text) => setFee(text)}
          value={fee}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          placeholderTextColor={Colors.Gray[500]}
          onChangeText={(text) => setDate(text)}
          value={date}
        />
        <TextInput
          style={styles.input}
          placeholder="Time"
          placeholderTextColor={Colors.Gray[500]}
          onChangeText={(text) => setTime(text)}
          value={time}
        />
        <TouchableOpacity onPress={() => setFollowUp(!followUp)}>
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ fontSize: 18 }}>
              Follow Up{" "}
              <MaterialCommunityIcons
                name={followUp ? "check" : "cancel"}
                color={Colors.tintColor}
                size={20}
                style={{ marginStart: 20 }}
              />
            </Text>
          </View>
        </TouchableOpacity>
        <RoundButton
          title={"Add Record"}
          onPress={onSubmit}
          loading={loading}
          containerStyle={{
            width: Layout.window.width - 80,
            backgroundColor: Colors.tintColor,
            paddingVertical: 10,
          }}
          textStyle={{
            color: "#fff",
            fontSize: 18,
          }}
          style={{
            marginTop: 30,
          }}
        />
      </View>
    </ScrollView>
  );
};

const mapState = (state: RootState) => ({
  auth: state.auth,
  record: state.record,
});

const mapDispatch = {
  initRecord: () => initRecord(),
};

const RootConnector = connect(mapState, mapDispatch);

type RootProps = ConnectedProps<typeof RootConnector>;

export default RootConnector(AddRecord);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
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
  cardSelect: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
  },
});
