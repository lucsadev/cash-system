import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useCashSystemStore } from "../store";
import { CashWithdrawalsType } from "../types/db";
import { Card } from "react-native-paper";
import { formatPrice } from "../lib";
import { DetailRow } from "./DetailRow";

export function CashWithdrawalsList() {
  const cashWithdrawals = useCashSystemStore.use.cashWithdrawals();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de retiros</Text>
      <ScrollView>
        {cashWithdrawals.map((item: CashWithdrawalsType) => (
          <View key={item.id} style={{ padding: 10 }}>
            <Card mode="elevated">
              <Card.Content>
                <DetailRow label="Descripción" value={item.description!} />
                <DetailRow label="Importe" value={formatPrice(item.amount!)} />
                <DetailRow label="Usuario" value={item.profiles?.username!} />
                <DetailRow
                  label="Hora"
                  value={new Date(item.created_at as string).toLocaleTimeString(
                    "es-AR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }
                  )}
                />
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    elevation: 3,
  },
});
