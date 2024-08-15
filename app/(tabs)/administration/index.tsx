import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { itemsMenuAdmin } from "../../../constants";
import { useAuthStore } from "../../../store";

export default function TabAdministration() {
  const profile = useAuthStore.use.profile();

  if (profile?.role !== "ADMIN")
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "bold",color: "red" }}>
          Sección restringida
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {itemsMenuAdmin.map((item) => {
        return (
          <Pressable
            key={item.name}
            onPress={() => {}}
            style={({ pressed }) => [
              styles.card,
              {
                elevation: pressed ? 1 : 3,
              },
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    width: "48%",
    height: 160,
    shadowColor: "#000",
    gap: 10,
  },
  image: {
    width: "70%",
    height: "70%",
  },
  text: {
    fontSize: 14,
  },
});
