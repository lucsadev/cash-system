import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useCashSystemStore } from "../../store";
import { formatPrice } from "../../lib";
import {
  CashWithdrawalsSummary,
  DifferencePurchaseSaleOfTheDay,
  SummaryOfTotals,
} from "../../components";
import { isTablet } from "../../constants";

export function DailySummary() {
  const cashChange = useCashSystemStore.use.cashChange();
  const cashAvailable = useCashSystemStore.use.cashAvailable();

  return (
      <ScrollView>
      <View style={styles.viewCashChange}>
        <Text style={styles.text}>Cambio en la caja:</Text>
        <Text style={[styles.text, { color: "red" }]}>
          {formatPrice(cashChange)}
        </Text>
      </View>
        <SummaryOfTotals
          summary="sales"
          title="Total de ventas por forma de pago"
        />
        <SummaryOfTotals
          summary="purchases"
          title="Total de pagos a proveedores"
        />
        <CashWithdrawalsSummary />
        <DifferencePurchaseSaleOfTheDay />
        <View style={styles.viewCashChange}>
          <Text style={styles.text}>Efectivo en la caja:</Text>
          <Text style={[styles.text, { color: "red" }]}>
            {formatPrice(cashAvailable)}
          </Text>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  viewCashChange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  text: {
    fontSize:isTablet ? 28 : 20,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
