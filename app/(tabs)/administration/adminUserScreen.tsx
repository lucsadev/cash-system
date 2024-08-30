import { View, Text, StyleSheet } from "react-native";
import { UserInputForm, UsersList } from "../../../components";
import { isTablet } from "../../../constants";

export default function adminUserScreen() {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>Nuevo usuario</Text>
      <UserInputForm />
      <UsersList />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: isTablet ? "60%" : "94%",
    marginHorizontal: "auto",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});
