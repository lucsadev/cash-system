import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useAuthStore, useCashSystemStore } from "../../../store";
import { supabase } from "../../../supabase";
import { KEYS_Shopping, PaymentMethods } from "../../../constants";
import { globalStyles } from "../../../theme/globalStyles";

const {
  button,
  buttonContainer,
  pageContainer,
  text,
  displayText,
  displayContainer,
} = globalStyles;

export default function PaymentsToSuppliersScreen() {
  const [description, setDescription] = useState("Varios");
  const [amount, setAmount] = useState("");
  const userId = useAuthStore.use.profile()?.id;
  const cashAvailable = useCashSystemStore.use.cashAvailable();
  const dayId = useCashSystemStore.use.dayId();

  const toast = useToast();

  const handlePress = (value: string) => {
    if (value === "🗑️") return setAmount("");
    if (value === "." && amount.includes(".")) return;
    if (amount.includes(".") && amount.slice(amount.indexOf(".")).length > 2)
      return;

    amount.length < 12 && setAmount((prev) => (prev += value));
  };

  const handleSave = async (val: string) => {
    try {
      if (!amount || !description)
        return toast.show("La descripción y el importe son requeridos", {
          type: "warning",
        });
      const typeOfPayment =
        val === "💵" ? PaymentMethods.CASH : PaymentMethods.OTHERS;

      if (+amount > cashAvailable && typeOfPayment === PaymentMethods.CASH)
        return Alert.alert(
          "",
          "No hay suficiente efectivo en caja para realizar el pago",
          [{ text: "Aceptar" }]
        );
      const { error } = await supabase
        .from("purchases")
        .insert([{ amount, description, userId, day: dayId, typeOfPayment }]);
      if (error) throw error;

      setAmount("");

      toast.show("Operación Realizada con éxito", { type: "success" });
    } catch (error) {
      toast.show(`Operación no realizada, Error: ${error}`, { type: "danger" });
    }
  };

  return (
    <View style={pageContainer}>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            autoCapitalize="words"
            inputMode="text"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
        </View>
        <View style={[displayContainer, { width: "94%",marginVertical: 10 }]}>
          <Text style={displayText}>{amount}</Text>
        </View>
      </View>

      <View style={buttonContainer}>
        {KEYS_Shopping?.map((el) => (
          <Pressable
            key={el}
            style={({ pressed }) => [
              button,
              {
                elevation: pressed ? 0 : 5,
              },
            ]}
            onPress={() =>
              ["💵", "🪙"].includes(el) ? handleSave(el) : handlePress(el)
            }
          >
            <Text style={text}>{el}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    backgroundColor: "white",
    fontSize: 16,
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
