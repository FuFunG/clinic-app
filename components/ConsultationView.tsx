import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../constants";
import { Consultation } from "../model/Consultations";

type Props = {
  consultation: Consultation;
};

interface TitleProps {
  title: string;
}

interface ContentProps extends TitleProps {
  name: string;
}

interface FollowUpProps extends TitleProps {
  isFollowUp: boolean;
}

interface FeeProps extends TitleProps {
  fee: number;
}

const Content = ({ title, name }: ContentProps) => (
  <View style={styles.contentContainer}>
    <Text style={styles.title}>{title}: </Text>
    <Text style={styles.content}>{name}</Text>
  </View>
);

const Fee = ({ title, fee }: FeeProps) => (
  <View style={styles.contentContainer}>
    <Text style={styles.title}>{title}: </Text>
    <Text style={styles.content}>${fee}</Text>
  </View>
);

const FollowUp = ({ title, isFollowUp }: FollowUpProps) => (
  <View style={styles.contentContainer}>
    <Text style={styles.title}>
      {title}:{" "}
      <MaterialCommunityIcons
        name={isFollowUp ? "check" : "cancel"}
        size={18}
        color={Colors.tintColor}
      />
    </Text>
  </View>
);

const ConsultationView = ({ consultation }: Props) => {
  const {
    doctor,
    patient,
    diagnosis,
    medication,
    consultationFee,
    followUp,
    date,
    time,
  } = consultation;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Content title={"Doctor"} name={doctor.name} />
          <Fee title={"Consultation Fee"} fee={consultationFee} />
        </View>
        <View style={styles.column}>
          <Content title={"Patient"} name={patient.name} />
          <FollowUp title={"Follow Up"} isFollowUp={followUp} />
        </View>
      </View>
      <View style={{ marginStart: 10 }}>
        <Content title={"Diagnosis"} name={diagnosis} />
        <Content title={"Medication"} name={medication} />
      </View>
      <Text style={styles.date}>
        {date} {time}
      </Text>
    </View>
  );
};

export default ConsultationView;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomColor: Colors.Gray[100],
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.Gray[800],
    paddingVertical: 3,
  },
  content: {
    color: Colors.Gray[800],
    fontSize: 16,
    paddingVertical: 3,
  },
  date: {
    textAlign: "right",
    color: Colors.Gray[500],
    marginTop: 10,
  },
});
