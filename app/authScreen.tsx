import { StyleSheet, View } from "react-native";
import { UserInputForm } from "../components";
import { Text, TextInput } from "react-native-paper";


export default function SalesAmountPage() {
  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Iniciar sesión
      </Text>
      <UserInputForm isLogin/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8cada053",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
});
