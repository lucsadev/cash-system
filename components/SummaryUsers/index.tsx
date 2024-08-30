import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import type { IOperationDetail } from "../../types/data";
import { totals } from "../../lib/totals";
import { useCashSystemStore } from "../../store";
import { UserSummaryCard } from "./UserSummaryCard";

type DetailsSaleType = { amount: number; quantity: number };

export interface IOperationDetailByType {
  Crédito?: DetailsSaleType;
  "Cuenta DNI"?: DetailsSaleType;
  Débito?: DetailsSaleType;
  Efectivo?: DetailsSaleType;
  MODO?: DetailsSaleType;
  "Mercado Pago"?: DetailsSaleType;
  Transferencia?: DetailsSaleType;
}

type SummaryUsersType = {
  [key: string]: IOperationDetailByType;
};

type Props = {
  salesOfTheMonth: IOperationDetail[];
};

export function SummaryUsers({ salesOfTheMonth }: Props) {
  const [usersSummary, setUsersSummary] = useState<SummaryUsersType>();
  const users = useCashSystemStore.use.users();
  
  useEffect(() => {
    users.forEach((user) => {
      setUsersSummary((prev) => ({
        ...prev,
        [user.username as any]: totals(
          salesOfTheMonth.filter((el) => el.profiles?.username === user.username)
        ),
      }));
    });
  }, [salesOfTheMonth]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de ventas por usuario</Text>
      {!!usersSummary &&
        Object.entries(usersSummary).map(([key, value]) => (
          <UserSummaryCard key={key} user={key} summary={value} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, marginBottom: 50 },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textDecorationLine: "underline",
  },
});
