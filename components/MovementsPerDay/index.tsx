import { View, Text, StyleSheet, ScrollView } from "react-native";
import { formatLongDate, formatShortDate } from "../../lib";
import { useCallback, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCashSystemStore } from "../../store";
import {
  DifferencePurchaseSaleOfTheDay,
  ScreenLoader,
  SelectDropdown,
  SummaryOfTotals,
} from "../../components";
import { useSummaryPerDay } from "../../hooks";
import { isTablet } from "../../constants";

export function MovementsPerDay() {
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
    <View style={styles.pageContainer}>
      <View style={styles.containerDate}>
        <Text
          style={styles.textDate}
          onPress={() => setDatePickerVisibility(true)}
        >
          {formatLongDate(day)}
        </Text>
        <Icon
          name="calendar"
          size={isTablet ? 40 : 30}
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
  pageContainer: {
    flex: 1,
    width: "94%",
    marginHorizontal: "auto",
    marginTop: 10,
  },
  containerSelects: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  containerDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 20,
  },
  textDate: {
    fontSize: isTablet ? 28 : 20,
    fontWeight: "bold",
  },
});
