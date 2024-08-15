import { KEYS, PaymentMethods } from "../constants";
import { useAuthStore } from "../store";
import { useCashSystemStore } from "../store/cashSystemStore";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { globalStyles } from "../theme/globalStyles";
import { supabase } from "../supabase";
import { useToast } from "react-native-toast-notifications";

export default function SalesAmountPage() {
  const [amount, setAmount] = useState("");
  const userId = useAuthStore.use.profile()?.id;
  const CurrentPaymentMethods = useCashSystemStore.use.CurrentPaymentMethods();
  const dayId = useCashSystemStore.use.dayId();
  const isAuthenticated = useAuthStore.use.isAuthenticated();
  const profile = useAuthStore.use.profile();
  const navigation = useNavigation();
  const toast = useToast();

  const {
    button,
    buttonContainer,
    displayText,
    displayContainer,
    pageContainer,
    text,
  } = globalStyles;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text>
          {`${
            CurrentPaymentMethods !== PaymentMethods.CHANGE_IN_BOX
              ? "Forma de pago:"
              : ""
          } ${CurrentPaymentMethods}`}
        </Text>
      ),
    });
  }, [CurrentPaymentMethods]);

  const handlePress = (value: string) => {
    if (value === "🗑️") return setAmount("");
    if (value === "⌫") return setAmount((prev) => (prev = prev.slice(0, -1)));
    if (value === "." && amount.includes(".")) return;
    if (amount.includes(".") && amount.slice(amount.indexOf(".")).length > 2)
      return;

    amount.length < 12 && setAmount((prev) => (prev += value));
  };

  const handleSave = async () => {
    try {
      if (CurrentPaymentMethods === PaymentMethods.CHANGE_IN_BOX) {
        const { error } = await supabase
          .from("movementsOfTheDay")
          .update({ cashChange: amount })
          .eq("id", dayId);

        if (error) throw error;

        toast.show(`Cambio en caja $${amount}`, { type: "normal" });
        navigation.goBack();
        return;
      }

      if (!userId && !amount && !dayId) return;

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
    <View style={pageContainer}>
      <View style={displayContainer}>
        <Text style={displayText}>{amount}</Text>
      </View>
      <View style={buttonContainer}>
        {KEYS.map((el) => (
          <Pressable
            key={el}
            style={({ pressed }) => [
              button,
              {
                elevation: pressed ? 0 : 5,
              },
            ]}
            onPress={() => (el === "💾" ? handleSave() : handlePress(el))}
          >
            <Text style={text}>{el}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
