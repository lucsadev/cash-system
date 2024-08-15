import { FlatList, Text, View } from "react-native";
import { useAuthStore, useCashSystemStore } from "../../store";
import { globalStyles } from "../../theme/globalStyles";
import { FlatListHeaderSales, ItemSale } from "../../components";

export default function TabListSales() {
  const sales = useCashSystemStore.use.sales();
  const profile = useAuthStore.use.profile();

  return (
    <FlatList
      data={sales}
      renderItem={({ item }) => (
        <ItemSale item={item} role={profile?.role || ""} />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<FlatListHeaderSales />}
      //@ts-ignore
      ItemSeparatorComponent={<View style={globalStyles.divider} />}
    />
  );
}
