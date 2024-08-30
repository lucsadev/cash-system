import { View, Text, StyleSheet, Alert } from "react-native";
import { PurchasesType } from "../../types/db";
import { Card } from "react-native-paper";
import { formatPrice } from "../../lib";
import { isTablet, PaymentMethods } from "../../constants";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { supabase } from "../../supabase";
import { DetailRow } from "../DetailRow";

const handleDelete = (id: string) => {
  try {
    Alert.alert("Eliminar", "¿Seguro que desea eliminar el pago?", [
      {
        text: "No",
      },
      {
        text: "Si",
        onPress: async () => {
          const { error } = await supabase
            .from("purchases")
            .delete()
            .eq("id", id);
          if (error) throw new Error(error as any);
        },
      },
    ]);
  } catch (error: any) {
    Alert.alert("Error", error?.message || error, [{ text: "Aceptar" }]);
  }
};

type Props = {
  payment: PurchasesType;
  role: string;
};
export function PaymentsToSuppliersCard({ payment, role }: Props) {
  return (
    <View style={styles.container}>
      <Card mode="elevated">
        <Card.Content>
          <View>
            <DetailRow label="Descripción" value={payment.description!} />
            <DetailRow label="Importe" value={formatPrice(payment.amount!)} />
            <DetailRow
              label="Forma de pago"
              value={
                payment.typeOfPayment === PaymentMethods.CASH
                  ? "Efectivo"
                  : "Por medio Bancario"
              }
            />
            <DetailRow label="Usuario" value={payment.profiles?.username!} />
            <DetailRow
              label="Hora"
              value={new Date(payment.created_at as string).toLocaleTimeString(
                "es-AR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              )}
            />
          </View>
          {role === "ADMIN" && (
            <View style={styles.trash}>
              <Icon
                name="trash-can-outline"
                size={32}
                color="red"
                onPress={() => handleDelete(payment.id)}
              />
            </View>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 10,
    width: isTablet ? 390 : "100%",
  },
  trash: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
