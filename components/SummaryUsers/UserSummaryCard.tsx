import { View, Text, StyleSheet } from "react-native";
import React from "react";
import type { IOperationDetailByType } from "./index";
import { Card } from "react-native-paper";
import { formatPrice } from "../../lib";
import { DetailRow } from "../DetailRow";

type Props = {
  user: string;
  summary: IOperationDetailByType;
};

export function UserSummaryCard({ user, summary }: Props) {
  
  return (
    <Card mode="elevated" style={{ marginBottom: 10 }}>
      <Card.Title title={user} titleStyle={styles.title} />

      <Card.Content>
        {!!Object.entries(summary).length ? (
          <View style={styles.container}>
            <View style={styles.containerList}>
              {Object.entries(summary).map(([key, value]) => (
                <DetailRow key={key} label={key} value={value.amount} />
              ))}
            </View>
            <View style={{width: "40%"}}>
              <Text style={styles.subTitle}>Cantidad de ventas</Text>
              <Text style={[styles.totals, {color: "black"  }]}>{Object.values(summary).reduce((sum, value) => sum+=value.quantity, 0)}</Text>
              <Text style={styles.subTitle}>Total de ventas</Text>
              <Text style={[styles.totals, {color: "red"  }]}>{formatPrice(Object.values(summary).reduce((sum, value) => sum+=value.amount, 0))}</Text>
            </View>

          </View>
        ) : (
          <Text style={styles.noEntries}>No tuvo ventas este Mes</Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  containerList: {
    width: "60%",
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: "teal",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    textDecorationLine: "underline",
  },
  noEntries: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  subTitle: {
    fontSize: 13,
    color: "teal",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  totals: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  }
});
