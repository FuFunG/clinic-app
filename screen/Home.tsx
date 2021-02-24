import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";

import RootStackParamList from "../navigation/RootStackParamList";
import { AuthConnector, AuthProps } from "../store/auth/AuthProps";
import RootStackNavigationProp from "../navigation/RootStackNavigationProp";
import { Colors, Layout } from "../constants";

import { removeUserInfo } from "../Auth/User";
import DateSelectHeader from "../components/DateSelectHeader";
import EmptyLoading from "../components/EmptyLoading";
import ConsultationsList from "../components/ConsultationsList";
import { BasicResponse } from "../model/BasicResponse";
import { Consultation } from "../model/Consultations";

const dateFormat = "YYYY-MM-DD";

const Home = ({ auth, logout }: AuthProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [current, setCurrent] = useState(moment().format(dateFormat));
  const [selected, setSelected] = useState(moment().format(dateFormat));
  const [type, setType] = useState("date");
  const [markedDates, setMarkedDate] = useState({});
  const [consultations, setConsultation] = useState<[Consultation] | []>([]);
  const [loading, setLoading] = useState(false);
  const [markLoading, setMarkLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        auth.loggedIn &&
        auth.accessToken && (
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color={"#000"}
            style={{ marginEnd: 10 }}
            onPress={handleLogout}
          />
        ),
      headerLeft: () =>
        auth.loggedIn &&
        auth.accessToken &&
        auth.role?.toUpperCase() === "DOCTOR" && (
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color={"#000"}
            style={{ marginStart: 10 }}
            onPress={() => navigation.navigate("AddRecord")}
          />
        ),
    });
  }, [auth.loggedIn, auth.accessToken]);

  const handleLogout = () => {
    removeUserInfo();
    logout();
    navigation.replace("SignIn");
  };

  // get marks
  useEffect(() => {
    fetchMarks();
    onDayChange(current);
  }, []);

  const defaultMark = {
    selected: false,
    marked: true,
    dotColor: Colors.tintColor,
    selectedDotColor: "#fff",
  };

  const defaultSelect = {
    selected: true,
    selectedColor: Colors.tintColor,
  };

  const fetchMarks = async () => {
    if (markLoading) return;
    setMarkLoading(true);
    setConsultation([]);
    const response = await fetch(`${process.env.URL}/consultation`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `token ${auth.accessToken}`,
      },
    });
    const responseJson = await response.json();
    if (responseJson.ok) {
      const result: any = {};
      responseJson.payload.consultations.map((consultation: any) => {
        result[moment(consultation.date).format(dateFormat)] = defaultMark;
      });
      result[selected] = {
        ...result[selected],
        ...defaultSelect,
      };
      setMarkedDate(result);
    }
    setMarkLoading(false);
  };

  const fetchConsultations = async (date: string, curType = type) => {
    if (loading) return;
    setLoading(true);
    setConsultation([]);
    try {
      const response = await fetch(
        `${process.env.URL}/consultation?date=${date}&type=${curType}`,
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
      console.log(responseJson, auth.accessToken);
      if (responseJson.ok) {
        setConsultation(responseJson.payload.consultations as [Consultation]);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const onDayChange = (date: string) => {
    console.log(date.toString());
    setCurrent(date);
    fetchConsultations(date);
    const marks: any = { ...markedDates };
    marks[selected] = {
      ...marks[selected],
      selected: false,
    };
    marks[date] = {
      ...marks[date],
      ...defaultSelect,
    };
    setMarkedDate(marks);
    setSelected(date);
  };

  const onRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      const response = await fetch(
        `${process.env.URL}/consultation?date=${current}&type=${type}`,
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
      if (responseJson.ok) {
        setConsultation(responseJson.payload.consultations as [Consultation]);
      }
    } catch (err) {
      console.log(err);
    }
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DropDownPicker
        items={[
          { label: "Date", value: "date" },
          { label: "Week", value: "week" },
          { label: "Month", value: "month" },
        ]}
        defaultValue={type}
        containerStyle={{ height: 40 }}
        onChangeItem={(item) => {
          setType(item.value);
          fetchConsultations(selected, item.value);
          if (item.value == "date") {
            fetchMarks();
          }
        }}
      />
      {type === "date" ? (
        <Calendar
          current={current}
          minDate={"2020-05-10"}
          maxDate={Date()}
          onDayPress={(day) => {
            onDayChange(day.dateString);
          }}
          firstDay={1}
          monthFormat={"yyyy MM"}
          renderArrow={(direction) => (
            <MaterialCommunityIcons
              name={direction === "left" ? "chevron-left" : "chevron-right"}
              size={24}
              color={Colors.tintColor}
              style={{ padding: 5 }}
            />
          )}
          onPressArrowLeft={(subtractMonth) => {
            subtractMonth();
          }}
          onPressArrowRight={(addMonth) => addMonth()}
          enableSwipeMonths={true}
          markedDates={markedDates}
          theme={{
            todayTextColor: Colors.tintColor,
          }}
          style={{
            ...styles.bottomBorder,
            paddingBottom: 10,
          }}
        />
      ) : (
        <DateSelectHeader
          title={`${
            type === "week"
              ? moment(current).isoWeek()
              : type === "month" && moment(current).format("MM")
          } ${moment(current).year()}`}
          onLeftArrowPress={() => {
            const newDate = moment(current)
              .subtract(1, type === "week" ? "week" : "month")
              .format(dateFormat);
            setCurrent(newDate);
            onDayChange(newDate);
          }}
          onRightArrowPress={() => {
            const newDate = moment(current)
              .add(1, type === "week" ? "week" : "month")
              .format(dateFormat);
            setCurrent(newDate);
            onDayChange(newDate);
          }}
        />
      )}
      {consultations.length > 0 ? (
        <ConsultationsList
          consultations={consultations}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      ) : (
        <EmptyLoading
          loading={loading || markLoading}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
    </SafeAreaView>
  );
};

export default AuthConnector(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottomBorder: {
    borderBottomColor: Colors.Gray[100],
    borderBottomWidth: 1,
  },
});
