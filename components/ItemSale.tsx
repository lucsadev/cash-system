import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { formatPrice } from "../lib/formatPrice";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { supabase } from "../supabase";
import { SalesType } from "../types/db";
import { isTablet, typeOfPayment } from "../constants";

const handleDelete = (sale: string) => {
  try {
    Alert.alert("Eliminar", "¿Seguro que desea eliminar la venta?", [
      {
        text: "No",
      },
      {
        text: "Si",
        onPress: async () => {
          const { error } = await supabase
            .from("sales")
            .delete()
            .eq("id", sale);
          if (error) throw new Error(error as any);
        },
      },
    ]);
  } catch (error: any) {
    Alert.alert("Error", error?.message || error, [{ text: "Aceptar" }]);
  }
};

export const ItemSale = ({ item, role }: { item: SalesType; role: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={{
            uri: typeOfPayment[
              item.typeOfPayment as keyof typeof typeOfPayment
            ],
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>{item.profiles?.username}</Text>
      <Text style={styles.amount}>{formatPrice(item.amount!)}</Text>
      <Text style={styles.text}>
        {new Date(item.created_at as string).toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </Text>
      {role === "ADMIN" && (
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={{ width: isTablet ? 130 : 70, alignItems: "center" }}
        >
          <Icon name="trash-can-outline" size={isTablet ? 32 : 20} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: { width: isTablet ? 130 : 70, alignItems: "center" },
  image: {
    width: isTablet ? 50 : 30,
    height: isTablet ? 60 : 40,
  },
  text: {
    width: isTablet ? 130 : 70,
    textAlign: "center",
    fontSize: isTablet ? 24 : 12,
  },
  amount: {
    width: isTablet ? 300 : 150,
    textAlign: "right",
    fontSize: isTablet ? 24 : 12,
  },
});
