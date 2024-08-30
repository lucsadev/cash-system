import { ScrollView, StyleSheet, View } from "react-native";
import { useAuthStore, useCashSystemStore } from "../../../store";
import { PaymentsToSuppliersCard } from "../../../components";

export default function listPaymentsToSuppliers() {
  const purchases = useCashSystemStore.use.purchases();
  const user = useAuthStore.use.profile();

  return (
    <ScrollView>
    <View style={styles.container}>
      {purchases.map((purchase) => (
        <PaymentsToSuppliersCard
          key={purchase.id}
          payment={purchase}
          role={user?.role || ""}
        />
      ))}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});
