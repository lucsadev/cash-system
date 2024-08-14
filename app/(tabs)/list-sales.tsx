import { FlatList, Text, View } from "react-native";
import { useCashSystemStore } from "../../store";
import { globalStyles } from "../../theme/globalStyles";
import { FlatListHeaderSales, ItemSale } from "../../components";

export default function TabListSales() {
  const sales = useCashSystemStore.use.sales();
  return (
    <FlatList
      data={sales}
      renderItem={({ item }) => <ItemSale item={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<FlatListHeaderSales />}
      //@ts-ignore
      ItemSeparatorComponent={ <View style={globalStyles.divider} />}
    />
  );
}
