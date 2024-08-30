import { FlatList, Text, View } from "react-native";
import { useAuthStore, useCashSystemStore } from "../../store";
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
      ItemSeparatorComponent={
        <View style={{ width: "100%", height: 1, backgroundColor: "#ccc" }} />
      }
    />
  );
}
