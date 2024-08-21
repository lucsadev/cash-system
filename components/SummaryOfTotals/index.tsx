import { View, Text, StyleSheet } from "react-native";
import { useCashSystemStore } from "../../store";
import { SummaryType, total, totals } from "../../lib/totals";
import { formatPrice } from "../../lib";
import styles from "./styles";

type Props = {
  summary: string;
  title: string;
  dataSummary?: SummaryType | null;
};

type keySummary = "purchases" | "sales";

export function SummaryOfTotals({ summary, title, dataSummary = null }: Props) {
  const totalsSumary =
    dataSummary || useCashSystemStore.use[summary as keySummary]();
  const ObjetTotals = totals(totalsSumary);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.containerList}>
        <View style={styles.containerRowSubTitle}>
          <Text style={{ width: "25%", textAlign: "center" }}>F.Pago</Text>
          <Text style={{ width: "25%", textAlign: "center" }}>Cantidad</Text>
          <Text style={{ width: "50%", textAlign: "center" }}>Importe</Text>
        </View>
        {Object.keys(ObjetTotals).map((key) => (
          <View key={key} style={styles.containerRow}>
            <Text style={{ width: "25%", textAlign: "left" }}>{key}</Text>
            <Text style={{ width: "25%", textAlign: "center" }}>
              {ObjetTotals[key].quantity}
            </Text>
            <Text
              style={{
                width: "50%",
                textAlign: "right",
                color: "#0d9488",
                fontWeight: "bold",
              }}
            >
              {formatPrice(ObjetTotals[key].amount)}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.containerRow}>
        <Text style={[styles.rowTotals, { width: "30%", textAlign: "left" }]}>
          Total
        </Text>
        <Text style={[styles.rowTotals, { width: "15%" }]}>
          {totalsSumary.length}
        </Text>
        <Text style={[styles.rowTotals, { width: "55%", textAlign: "right" }]}>
          {formatPrice(total(totalsSumary))}
        </Text>
      </View>
    </View>
  );
}
