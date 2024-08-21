import { View, ScrollView, StyleSheet } from "react-native";
import { globalStyles } from "../../../theme/globalStyles";
import {
  DifferencePurchaseSaleOfTheDay,
  ScreenLoader,
  SelectDropdown,
  SummaryOfTotals,
  SummaryUsers,
} from "../../../components";
import { months } from "../../../constants";
import { useState } from "react";
import { useMovementsPerMonth } from "../../../hooks";

const years = Array.from({ length: 30 }, (_, index) => index + 2024).map(
  (year) => ({ label: year.toString(), value: year.toString() })
);

export default function MonthlySummaryScreen() {
  const [monthsSelected, setMonthsSelected] = useState(
    months[new Date().getMonth()].value
  );
  const [yearsSelected, setYearsSelected] = useState(
    new Date().getFullYear().toString()
  );
  const { loading, purchasesOfTheMonth, salesOfTheMonth } =
    useMovementsPerMonth(`${monthsSelected}-${yearsSelected}`);

  if (loading) return <ScreenLoader />;
  
  return (
    <View style={[globalStyles.pageContainer, styles.container]}>
      <View style={styles.containerDate}>
        <SelectDropdown
          label="Mes"
          data={months}
          setSelected={setMonthsSelected}
          selected={monthsSelected}
          rightIcon="calendar-month-outline"
        />
        <SelectDropdown
          label="Año"
          data={years}
          setSelected={setYearsSelected}
          selected={yearsSelected}
          rightIcon="calendar-month-outline"
        />
      </View>
      <View style={styles.container}>
        <ScrollView bounces={false}>
          <SummaryOfTotals
            summary="sales"
            title="Total de ventas por forma de pago"
            dataSummary={salesOfTheMonth}
          />

          <SummaryOfTotals
            summary="purchases"
            title="Total de pagos a proveedor"
            dataSummary={purchasesOfTheMonth}
          />
          <DifferencePurchaseSaleOfTheDay
            sales={salesOfTheMonth}
            purchases={purchasesOfTheMonth}
          />
          <SummaryUsers salesOfTheMonth={salesOfTheMonth} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    elevation: 5,
  },
  containerDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
