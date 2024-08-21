import { View, Text, StyleSheet } from "react-native";
import { useCashSystemStore } from "../store";
import { total } from "../lib/totals";
import { formatPrice } from "../lib";
import { OperationDetail } from "../types/data";

type Props = {
  sales?: OperationDetail[] | null;
  purchases?: OperationDetail[] | null;
};

export function DifferencePurchaseSaleOfTheDay({
  sales = null,
  purchases = null,
}: Props) {
  const dataSales = sales || useCashSystemStore.use.sales();
  const dataPurchases = purchases || useCashSystemStore.use.purchases();

  const difference = total(dataSales) - total(dataPurchases);
  const color = difference < 0 ? "red" : "green";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Diferencia ( ventas y salidas )</Text>
      <Text style={[styles.text, { color }]}>{formatPrice(difference)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
