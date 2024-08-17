import { ScrollView } from "react-native";
import { useAuthStore, useCashSystemStore } from "../../../store";
import { PaymentsToSuppliersCard } from "../../../components";

export default function listPaymentsToSuppliers() {
  const purchases = useCashSystemStore.use.purchases();
  const user = useAuthStore.use.profile();

  return (
    <ScrollView >
      {purchases.map((purchase) => (
        <PaymentsToSuppliersCard
          key={purchase.id}
          payment={purchase}
          role={user?.role || ""}
        />
      ))}
    </ScrollView>
  );
}
