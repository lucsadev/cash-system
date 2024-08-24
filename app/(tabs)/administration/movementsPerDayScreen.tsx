import { View, Text, StyleSheet, ScrollView } from "react-native";
import { formatLongDate, formatShortDate } from "../../../lib";
import { useCallback, useState } from "react";
import { globalStyles } from "../../../theme/globalStyles";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCashSystemStore } from "../../../store";
import {
  DifferencePurchaseSaleOfTheDay,
  ScreenLoader,
  SelectDropdown,
  SummaryOfTotals,
} from "../../../components";
import { useSummaryPerDay } from "../../../hooks";

export default function MovementsPerDayScreen() {
  const [day, setDay] = useState(new Date().toLocaleDateString());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userSelected, setUserSelected] = useState("Todos");
  const users = useCashSystemStore.use.users().map((user) => user.username);
  const { loading, sales, purchases } = useSummaryPerDay(formatShortDate(day));
  const dataUsers = [
    { label: "TODOS", value: "Todos" },
    ...users.map((user) => ({ label: user.toUpperCase(), value: user })),
  ];

  if (loading) return <ScreenLoader />;

  return (
    <View style={globalStyles.pageContainer}>
      <View style={styles.containerDate}>
        <Text style={styles.textDate}  onPress={() => setDatePickerVisibility(true)}>{formatLongDate(day)}</Text>
        <Icon
          name="calendar"
          size={30}
          color="#0f766e80"
          onPress={() => setDatePickerVisibility(true)}
        />
      </View>
      <View style={styles.containerSelects}>
        <Text style={styles.textDate}>Usuario</Text>
        <SelectDropdown
          data={dataUsers}
          setSelected={setUserSelected}
          selected={userSelected}
          style={{ width: 250 }}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date()}
        onConfirm={(date) => {
          setDatePickerVisibility(false);
          setDay(date.toLocaleDateString());
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <ScrollView>
        <SummaryOfTotals
          summary="sales"
          title="Total de ventas por forma de pago"
          dataSummary={
            userSelected !== "Todos"
              ? sales.filter((sale) => sale.profiles.username === userSelected)
              : sales
          }
        />
        {userSelected === "Todos" ? (
          <>
            <SummaryOfTotals
              summary="purchases"
              title="Total de pagos a proveedores"
              dataSummary={purchases}
            />
            <DifferencePurchaseSaleOfTheDay
              sales={sales}
              purchases={purchases}
            />
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSelects: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    marginBottom: 10,
  },
  containerDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 20,
  },
  textDate: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
