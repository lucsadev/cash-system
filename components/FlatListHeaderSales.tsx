import { View, Text, StyleSheet } from "react-native";
import { isTablet } from "../constants";

export const FlatListHeaderSales = () => (
  <View style={styles.header}>
    <Text style={styles.text}>Operación</Text>
    <Text style={styles.text}>Usuario</Text>
    <Text style={styles.amount}>Importe</Text>
    <Text style={styles.text}>Hora</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: isTablet ? 60 : 30,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d4d4d8",
    elevation: 3,
    shadowColor: "#000",
  },
  text: {
    width: isTablet ? 130 : 70,
    textAlign: "center",
    fontSize: isTablet ? 24 : 12,
  },
  amount: {
    width: isTablet ? 300 : 150,
    textAlign: "right",
    paddingRight: 20,
    fontSize: isTablet ? 24 : 12,
  },
});
