import { View, Text, StyleSheet } from "react-native";
import { useCashSystemStore } from "../../store";
import { SummaryType, total, totals } from "../../lib/totals";
import { formatPrice } from "../../lib";
import { styles } from "./styles";
import { isTablet } from "../../constants";

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
          <Text style={[styles.text,{ width: "35%"}]}>F.Pago</Text>
          <Text style={[styles.text,{ width: "18%"}]}>Cantidad</Text>
          <Text style={[styles.text,{ width: "47%"}]}>Importe</Text>
        </View>
        {Object.keys(ObjetTotals).map((key) => (
          <View key={key} style={styles.containerRow}>
            <Text style={[styles.text,{ width: "35%", textAlign: "left" }]}>{key}</Text>
            <Text style={[styles.text,{ width: "18%"}]}>
              {ObjetTotals[key].quantity}
            </Text>
            <Text
              style={{
                width: "47%",
                textAlign: "right",
                color: "#0d9488",
                fontWeight: "bold",
                fontSize: isTablet ? 20 : 14,
              }}
            >
              {formatPrice(ObjetTotals[key].amount)}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.containerRow}>
        <Text style={[styles.rowTotals, { width: "38%", textAlign: "left" }]}>
          Total
        </Text>
        <Text style={[styles.rowTotals, { width: "12%" }]}>
          {totalsSumary.length}
        </Text>
        <Text style={[styles.rowTotals, { width: "50%", textAlign: "right" }]}>
          {formatPrice(total(totalsSumary))}
        </Text>
      </View>
    </View>
  );
}
