import { View, Text } from "react-native";
import { formatPrice } from "../../lib";
import { total } from "../../lib/totals";
import { useCashSystemStore } from "../../store";
import styles from "../SummaryOfTotals/styles";

export function CashWithdrawalsSummary() {
  const cashWithdrawals = useCashSystemStore.use.cashWithdrawals();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Retiros de Caja</Text>
      <View style={styles.containerList}>
        <View style={styles.containerRowSubTitle}>
          <Text style={{ width: "40%", textAlign: "center" }}>Descripción</Text>
          <Text style={{ width: "20%", textAlign: "center" }}>Hora</Text>
          <Text style={{ width: "40%", textAlign: "center" }}>Importe</Text>
        </View>
        {cashWithdrawals.map((el) => (
          <View key={el.id} style={styles.containerRow}>
            <Text style={{ width: "40%", textAlign: "left" }}>
              {el.description}
            </Text>
            <Text style={{ width: "20%", textAlign: "center" }}>
              {new Date(el.created_at as string).toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
            <Text
              style={{
                width: "40%",
                textAlign: "right",
                color: "#0d9488",
                fontWeight: "bold",
              }}
            >
              {formatPrice(el.amount!)}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.containerRow}>
      <Text style={[styles.rowTotals,{width:'40%',textAlign:'left'}]}>Total retirado</Text>
        <Text style={[styles.rowTotals,{width:'60%',textAlign:'right'}]}>{formatPrice(total(cashWithdrawals))}</Text>
      </View>
    </View>
  );
}
