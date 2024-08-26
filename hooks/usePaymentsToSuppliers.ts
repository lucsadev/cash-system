import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useAuthStore, useCashSystemStore } from "../store";
import { supabase } from "../supabase";
import { QuickDescriptionType } from "../types/db";
import { deleteQuickDescription } from "../functions";
import { Alert, Keyboard } from "react-native";
import { PaymentMethods } from "../constants";


export function usePaymentsToSuppliers() {
  const [description, setDescription] = useState("Varios");
  const [amount, setAmount] = useState("");  
  const userId = useAuthStore.use.profile()?.id;
  const cashAvailable = useCashSystemStore.use.cashAvailable();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dayId = useCashSystemStore.use.dayId();
  const toast = useToast();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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

  const handleDeleteQuickDescription = async (
    quickDescription: QuickDescriptionType
  ) => {
    try {
      await deleteQuickDescription(quickDescription);
    } catch (error: any) {
      toast.show(`Operación no realizada, Error: ${error.message}`, {
        type: "danger",
      });
    }
  };
  return {
    description,
    amount,
    handleDeleteQuickDescription,
    handlePress,
    handleSave,
    isKeyboardVisible,
    setDescription,
  };
}
