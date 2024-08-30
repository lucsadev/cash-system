import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { itemsMenuAdmin } from "../../constants";
import { styles } from "./styles";

export function AdministrationMenu() {

  return (
    <View style={styles.container}>
      {itemsMenuAdmin.map((item) => {
        return (
          <Pressable
            key={item.name}
            onPress={() =>  router.navigate('/administration/' + item.page)}
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


