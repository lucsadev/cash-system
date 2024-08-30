import { useNavigation } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { PaymentMethods, KEYS } from "../../constants";
import { useAuthStore, useCashSystemStore } from "../../store";
import { supabase } from "../../supabase";
import { styles } from "./styles";




export function SalesAmountPage() {
  const [amount, setAmount] = useState("");
  const userId = useAuthStore.use.profile()?.id;
  const CurrentPaymentMethods = useCashSystemStore.use.CurrentPaymentMethods();
  const dayId = useCashSystemStore.use.dayId();
  const isAuthenticated = useAuthStore.use.isAuthenticated();
  const profile = useAuthStore.use.profile();
  const navigation = useNavigation();
  const toast = useToast();

  const handlePress = (value: string) => {
    if (value === "🗑️") return setAmount("");
    if (value === "⌫") return setAmount((prev) => (prev = prev.slice(0, -1)));
    if (value === "." && amount.includes(".")) return;
    if (amount.includes(".") && amount.slice(amount.indexOf(".")).length > 2)
      return;

    amount.length < 12 && setAmount((prev) => (prev += value));
  };

  const handleSave = async () => {
    if (!userId || !amount || !dayId) return;
    try {
      if (CurrentPaymentMethods === PaymentMethods.CHANGE_IN_BOX) {
        const cashChange = Number(amount);
        const { error } = await supabase
          .from("movementsOfTheDay")
          .update({ cashChange })
          .eq("id", dayId);


        if (error) throw error;

        toast.show(`Cambio en caja $${amount}`, { type: "normal" });
        navigation.goBack();
        return;
      }


      const { error } = await supabase
        .from("sales")
        .insert([
          { userId, amount, typeOfPayment: CurrentPaymentMethods, day: dayId },
        ]);

      if (error) throw error;

      toast.show(`Venta de $${amount} agregada`, { type: "success" });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      toast.show(`Error: operación no realizada`, { type: "danger" });
    }
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{amount}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {KEYS.map((el) => (
          <Pressable
            key={el}
            style={({ pressed }) => [
              styles.button,
              {
                elevation: pressed ? 0 : 5,
              },
            ]}
            onPress={() => (el === "💾" ? handleSave() : handlePress(el))}
          >
            <Text style={styles.buttonText}>{el}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
