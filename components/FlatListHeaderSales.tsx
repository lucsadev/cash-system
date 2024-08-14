import { View, Text, StyleSheet } from "react-native";

export const FlatListHeaderSales = () => (
  <View style={styles.header}>
    <Text style={{ width: "18%", textAlign: "center" }}>Operación</Text>
    <Text style={{ width: "18%", textAlign: "center" }}>Usuario</Text>
    <Text style={{ width: "30%", textAlign: "center" }}>Importe</Text>
    <Text style={{ width: "18%", textAlign: "center" }}>Hora</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d4d4d8",
    elevation: 3,
    shadowColor: "#000",
  },
});
