import { FlatList, StyleSheet, View } from "react-native";
import { useCashSystemStore } from "../../store";
import HeaderList from "./HeaderList";
import { globalStyles } from "../../theme/globalStyles";
import { ItemUser } from "./ItemUser";

export function UsersList() {
  const users = useCashSystemStore.use.users();

  return (
    <View style={styles.container}>
      <HeaderList />
      <FlatList
        data={users}
        renderItem={({ item }) => <ItemUser item={item} />}        
        //@ts-ignore
        ItemSeparatorComponent={<View style={globalStyles.divider} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 30,
  },
});
