import { View, Text, StyleSheet } from "react-native";
import { useCashSystemStore } from "../../../store";
import { formatPrice } from "../../../lib";
import {
  CashWithdrawalsSummary,
  DifferencePurchaseSaleOfTheDay,
  SummaryOfTotals,
} from "../../../components";

export default function DailySummaryScreen() {
  const cashChange = useCashSystemStore.use.cashChange();
  const cashAvailable = useCashSystemStore.use.cashAvailable();

  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  viewCashChange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
