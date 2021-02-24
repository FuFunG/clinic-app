import React from "react";
import { FlatList } from "react-native";
import { Consultation } from "../model/Consultations";
import ConsultationView from "./ConsultationView";

type Props = {
  consultations: [Consultation] | [];
  onRefresh?: () => void;
  refreshing?: boolean;
};

const ConsultationsList = ({ consultations, onRefresh, refreshing }: Props) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      data={consultations}
      renderItem={({ item }) => <ConsultationView consultation={item} />}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

export default ConsultationsList;
