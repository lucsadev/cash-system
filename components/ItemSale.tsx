import { Alert, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { formatPrice } from "../lib/formatPrice";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { supabase } from "../supabase";
import { SalesType } from "../types/db";
import { typeOfPayment } from "../constants";

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

export const ItemSale = ({ item , role }: { item: SalesType, role: string }) => {
  return (
    <View style={styles.container}>
    <View style={{width: '18%', alignItems: 'center'}}>
      <Image            
        resizeMode="contain"
        source={{
          uri: typeOfPayment[item.typeOfPayment as keyof typeof typeOfPayment],
        }}       
        style={styles.image}
        />
        </View>
      <Text style={{width: '18%', textAlign: 'center'}}>{item.profiles?.username}</Text>
      <Text style={{width: '30%', textAlign: 'right'}}>{formatPrice(item.amount!)}</Text>
      <Text style={{width: '18%', textAlign: 'center'}}>
        {new Date(item.created_at as string).toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </Text>
      {role === "ADMIN" && (
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={{width: '18%', alignItems: 'center'}}>
          <Icon name="trash-can-outline" size={20} color='red' />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
/*     justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 5, */
  },
  image: {
    width: 30,
    height: 40,
  }
})
