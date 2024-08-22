import { View, Text, StyleSheet } from "react-native";
import type { ProfileType } from "../../types/db";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { handleDelete } from "./events";
import { useCashSystemStore } from "../../store";

type Props = {
  item: ProfileType;
};

export function ItemUser({ item }: Props) {
  const users = useCashSystemStore.use.users();
  const setEditUser = useCashSystemStore.use.setEditUser();

  return (
    <View style={styles.container}>
      <Text style={{ width: "60%", textTransform: "capitalize" }}>
        {item?.username}
      </Text>
      <Text style={{ width: "20%", textAlign: "center" }}>
        {item?.role === "ADMIN" ? "AD" : "OP"}
      </Text>
      <View style={styles.actionContainer}>
        <Icon
          name="account-edit"
          size={24}
          color="teal"
          onPress={() => setEditUser(item)}
        />
        <Icon
          name="account-remove"
          size={24}
          color="red"
          onPress={() => handleDelete(item, users)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
