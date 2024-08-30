import { StyleSheet, View } from "react-native";
import { UserInputForm } from "../components";
import { Text, TextInput } from "react-native-paper";
import { isTablet } from "../constants";

export default function SalesAmountPage() {
  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text variant="displaySmall" style={styles.title}>
          Iniciar sesión
        </Text>
        <UserInputForm isLogin />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8cada053",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  containerForm: {
    flex: 1,
    width: isTablet ? "60%" : "94%",
    justifyContent: "center",
  },
});
